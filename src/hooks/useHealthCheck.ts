import { useState, useEffect, useCallback } from 'react';
import { Service, ServiceHealth, HealthStatus } from '@/types';

const CHECK_INTERVAL = 30000; // 30 seconds

export function useHealthCheck(services: Service[]) {
  const [healthStatus, setHealthStatus] = useState<Record<string, ServiceHealth>>({});

  const checkHealth = useCallback(async (service: Service): Promise<ServiceHealth> => {
    if (!service.health_endpoint || service.status !== 'active') {
      return {
        serviceId: service.id,
        status: service.status === 'active' ? 'unknown' : 'unknown',
        lastChecked: new Date(),
      };
    }

    const startTime = performance.now();
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(service.health_endpoint, {
        method: 'GET',
        signal: controller.signal,
        mode: 'cors',
      });

      clearTimeout(timeoutId);
      const responseTime = Math.round(performance.now() - startTime);

      return {
        serviceId: service.id,
        status: response.ok ? 'online' : 'offline',
        responseTime,
        lastChecked: new Date(),
      };
    } catch (error) {
      return {
        serviceId: service.id,
        status: 'offline',
        lastChecked: new Date(),
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }, []);

  const checkAllServices = useCallback(async () => {
    const activeServices = services.filter(s => s.status === 'active' && s.health_endpoint);
    
    // Set all to checking
    setHealthStatus(prev => {
      const newStatus = { ...prev };
      activeServices.forEach(service => {
        newStatus[service.id] = {
          ...newStatus[service.id],
          serviceId: service.id,
          status: 'checking',
        };
      });
      return newStatus;
    });

    // Check all services in parallel
    const results = await Promise.all(activeServices.map(checkHealth));
    
    setHealthStatus(prev => {
      const newStatus = { ...prev };
      results.forEach(result => {
        newStatus[result.serviceId] = result;
      });
      return newStatus;
    });
  }, [services, checkHealth]);

  useEffect(() => {
    checkAllServices();
    const interval = setInterval(checkAllServices, CHECK_INTERVAL);
    return () => clearInterval(interval);
  }, [checkAllServices]);

  const getHealthStatus = useCallback((serviceId: string): HealthStatus => {
    return healthStatus[serviceId]?.status || 'unknown';
  }, [healthStatus]);

  const getResponseTime = useCallback((serviceId: string): number | undefined => {
    return healthStatus[serviceId]?.responseTime;
  }, [healthStatus]);

  return {
    healthStatus,
    getHealthStatus,
    getResponseTime,
    refreshHealth: checkAllServices,
  };
}
