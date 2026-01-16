import { Service, ServicesConfig } from '@/types';

const DEFAULT_CONFIG: ServicesConfig = {
  meta: {
    title: 'Cherihub',
    description: 'Central de Serviços e APIs',
    version: '1.0.0',
  },
  services: [],
};

export async function loadServicesConfig(): Promise<ServicesConfig> {
  try {
    // Try to load from external JSON file
    const response = await fetch('/services.json');
    if (response.ok) {
      const data = await response.json();
      return data as ServicesConfig;
    }
  } catch (error) {
    console.warn('Failed to load services.json, using default config');
  }

  // Try to load from environment variable
  const envServices = import.meta.env.VITE_SERVICES_CONFIG;
  if (envServices) {
    try {
      return JSON.parse(envServices) as ServicesConfig;
    } catch (error) {
      console.warn('Failed to parse VITE_SERVICES_CONFIG');
    }
  }

  return DEFAULT_CONFIG;
}

export function getActiveServices(services: Service[]): Service[] {
  return services.filter(s => s.status === 'active');
}

export function getComingSoonServices(services: Service[]): Service[] {
  return services.filter(s => s.status === 'coming_soon');
}

export function getMaintenanceServices(services: Service[]): Service[] {
  return services.filter(s => s.status === 'maintenance');
}
