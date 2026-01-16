import { useState, useEffect } from 'react';
import { Header, Footer, ServiceCard } from '@/components';
import { useTheme, useHealthCheck } from '@/hooks';
import { loadServicesConfig } from '@/services';
import { Service, ServicesConfig } from '@/types';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [config, setConfig] = useState<ServicesConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const services = config?.services || [];
  const { getHealthStatus, getResponseTime, refreshHealth } = useHealthCheck(services);

  useEffect(() => {
    async function loadConfig() {
      try {
        setLoading(true);
        const data = await loadServicesConfig();
        setConfig(data);
      } catch (err) {
        setError('Falha ao carregar configuração de serviços');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadConfig();
  }, []);

  // Separate services by status
  const activeServices = services.filter(s => s.status === 'active');
  const otherServices = services.filter(s => s.status !== 'active');

  return (
    <div className="min-h-screen flex flex-col bg-dark-50 dark:bg-dark-950 transition-colors duration-300">
      <Header 
        theme={theme} 
        onThemeToggle={toggleTheme} 
        onRefresh={refreshHealth}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-primary-200 dark:border-primary-800 border-t-primary-600 rounded-full animate-spin" />
              <p className="text-dark-600 dark:text-dark-400">Carregando serviços...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center py-20">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md text-center">
              <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">Erro</h3>
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Active Services */}
            {activeServices.length > 0 && (
              <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-2xl font-bold text-dark-900 dark:text-white">
                    Serviços Ativos
                  </h2>
                  <span className="px-2 py-0.5 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                    {activeServices.length}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeServices.map((service, index) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      healthStatus={getHealthStatus(service.id)}
                      responseTime={getResponseTime(service.id)}
                      index={index}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Coming Soon / Maintenance Services */}
            {otherServices.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-2xl font-bold text-dark-900 dark:text-white">
                    Em Desenvolvimento
                  </h2>
                  <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
                    {otherServices.length}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherServices.map((service, index) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      healthStatus="unknown"
                      index={activeServices.length + index}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Empty state */}
            {services.length === 0 && (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-dark-100 dark:bg-dark-800 rounded-full mb-6">
                  <span className="text-4xl">📭</span>
                </div>
                <h3 className="text-xl font-semibold text-dark-900 dark:text-white mb-2">
                  Nenhum serviço configurado
                </h3>
                <p className="text-dark-600 dark:text-dark-400 max-w-md mx-auto">
                  Configure seus serviços no arquivo <code className="px-2 py-0.5 bg-dark-100 dark:bg-dark-800 rounded text-sm">services.json</code> para começar.
                </p>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
