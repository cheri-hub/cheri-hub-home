import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  onRefresh: () => void;
}

export function Header({ theme, onThemeToggle, onRefresh }: HeaderProps) {
  return (
    <header className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 dark:from-dark-900 dark:via-dark-800 dark:to-primary-900/30" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-400/10 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <span className="text-4xl">🍒</span>
            </div>
            
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Cherihub
              </h1>
              <p className="text-primary-100 dark:text-primary-300 text-sm sm:text-base mt-1">
                Central de Serviços e APIs
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={onRefresh}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-colors duration-200"
              aria-label="Atualizar status"
              title="Atualizar status dos serviços"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
            
            <ThemeToggle theme={theme} onToggle={onThemeToggle} />
          </div>
        </div>
        
        <p className="mt-6 text-lg text-primary-100 dark:text-dark-300 max-w-2xl">
          Bem-vindo ao portal central de serviços. Acesse nossas APIs e aplicações 
          de forma rápida e segura.
        </p>
        
        {/* Stats */}
        <div className="mt-8 flex flex-wrap gap-6">
          <div className="flex items-center gap-2 text-white/80">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm">Sistema Operacional</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-sm">SSL Ativo</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
            <span className="text-sm">Docker Containers</span>
          </div>
        </div>
      </div>
    </header>
  );
}
