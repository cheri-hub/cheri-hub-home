import { Service, HealthStatus } from '@/types';
import { HealthIndicator } from './HealthIndicator';

interface ServiceCardProps {
  service: Service;
  healthStatus: HealthStatus;
  responseTime?: number;
  index: number;
}

export function ServiceCard({ service, healthStatus, responseTime, index }: ServiceCardProps) {
  const isActive = service.status === 'active';
  const isComingSoon = service.status === 'coming_soon';
  const isMaintenance = service.status === 'maintenance';

  return (
    <div
      className={`
        group relative overflow-hidden rounded-2xl 
        bg-white dark:bg-dark-800 
        border border-dark-200 dark:border-dark-700
        shadow-sm hover:shadow-xl
        transition-all duration-300 ease-out
        hover:-translate-y-1
        animate-slide-up
        ${!isActive ? 'opacity-75' : ''}
      `}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Status banner for non-active services */}
      {isComingSoon && (
        <div className="absolute top-4 right-4 px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full border border-blue-500/20">
          Em Breve
        </div>
      )}
      {isMaintenance && (
        <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-xs font-medium rounded-full border border-yellow-500/20">
          Manutenção
        </div>
      )}

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-500/0 group-hover:from-primary-500/5 group-hover:to-transparent transition-all duration-300" />

      <div className="relative p-6">
        {/* Icon and Health Status */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center justify-center w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-xl text-3xl">
            {service.icon}
          </div>
          
          {isActive && (
            <HealthIndicator 
              status={healthStatus} 
              responseTime={responseTime}
            />
          )}
        </div>

        {/* Title and Description */}
        <h3 className="text-xl font-semibold text-dark-900 dark:text-white mb-2">
          {service.name}
        </h3>
        
        <p className="text-dark-600 dark:text-dark-400 text-sm leading-relaxed mb-4 min-h-[40px]">
          {service.description}
        </p>

        {/* Tags */}
        {service.tags && service.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium bg-dark-100 dark:bg-dark-700 text-dark-600 dark:text-dark-300 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Version */}
        {service.version && (
          <div className="text-xs text-dark-500 dark:text-dark-500 mb-4">
            Versão {service.version}
          </div>
        )}

        {/* Action Buttons */}
        {isActive && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-dark-100 dark:border-dark-700">
            {service.frontend_url && (
              <a
                href={service.frontend_url}
                className="flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Acessar
              </a>
            )}
            
            {service.docs_url && (
              <a
                href={service.docs_url}
                className="flex items-center gap-1.5 px-4 py-2 bg-dark-100 dark:bg-dark-700 hover:bg-dark-200 dark:hover:bg-dark-600 text-dark-700 dark:text-dark-200 text-sm font-medium rounded-lg transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                API Docs
              </a>
            )}
            
            {service.api_url && (
              <a
                href={service.api_url}
                className="flex items-center gap-1.5 px-4 py-2 text-dark-600 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                API
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
