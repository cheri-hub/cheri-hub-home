export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  frontend_url?: string;
  api_url?: string;
  docs_url?: string;
  health_endpoint?: string;
  status: 'active' | 'coming_soon' | 'maintenance';
  version?: string;
  tags?: string[];
}

export interface ServicesConfig {
  services: Service[];
  meta: {
    title: string;
    description: string;
    version: string;
  };
}

export type HealthStatus = 'online' | 'offline' | 'checking' | 'unknown';

export interface ServiceHealth {
  serviceId: string;
  status: HealthStatus;
  responseTime?: number;
  lastChecked?: Date;
  error?: string;
}
