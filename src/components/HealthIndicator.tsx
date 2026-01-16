import { HealthStatus } from '@/types';

interface HealthIndicatorProps {
  status: HealthStatus;
  responseTime?: number;
  showLabel?: boolean;
}

export function HealthIndicator({ status, responseTime, showLabel = true }: HealthIndicatorProps) {
  const config = {
    online: {
      color: 'bg-green-500',
      ring: 'ring-green-500/30',
      text: 'text-green-600 dark:text-green-400',
      label: 'Online',
      animate: true,
    },
    offline: {
      color: 'bg-red-500',
      ring: 'ring-red-500/30',
      text: 'text-red-600 dark:text-red-400',
      label: 'Offline',
      animate: false,
    },
    checking: {
      color: 'bg-yellow-500',
      ring: 'ring-yellow-500/30',
      text: 'text-yellow-600 dark:text-yellow-400',
      label: 'Verificando...',
      animate: true,
    },
    unknown: {
      color: 'bg-gray-400',
      ring: 'ring-gray-400/30',
      text: 'text-gray-500 dark:text-gray-400',
      label: 'Desconhecido',
      animate: false,
    },
  };

  const { color, text, label, animate } = config[status];

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <span
          className={`block w-2.5 h-2.5 ${color} rounded-full ${
            animate ? 'animate-pulse' : ''
          }`}
        />
        <span
          className={`absolute inset-0 w-2.5 h-2.5 ${color} rounded-full ${
            animate ? 'animate-ping opacity-75' : 'opacity-0'
          }`}
        />
      </div>
      
      {showLabel && (
        <span className={`text-sm font-medium ${text}`}>
          {label}
          {status === 'online' && responseTime !== undefined && (
            <span className="ml-1 text-xs opacity-70">({responseTime}ms)</span>
          )}
        </span>
      )}
    </div>
  );
}
