import { useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { StatsOverview } from './components/StatsOverview';
import { Toolbar } from './components/Toolbar';
import { MonitorList } from './components/MonitorList';
import { IncidentList } from './components/IncidentList';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useMonitors } from './hooks/useMonitors';
import { useNotification } from './hooks/useNotification';
import { useTheme } from './hooks/useTheme';
import { useAppStore } from './store';
import { getConfig } from './config';

function App() {
  useTheme();

  const config = getConfig();
  const embedMode = useAppStore((s) => s.embedMode);
  const setEmbedMode = useAppStore((s) => s.setEmbedMode);

  // 初始化：设置页面标题、描述、检查嵌入模式
  useEffect(() => {
    document.title = config.siteName;

    // 设置 meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', config.siteDescription);
    }

    const params = new URLSearchParams(window.location.search);
    if (params.get('embed') === '1') {
      setEmbedMode(true);
    }
  }, [config.siteName, config.siteDescription, setEmbedMode]);

  const {
    monitors,
    allMonitors,
    isLoading,
    isError,
    error,
    stats,
    incidents,
    refetch,
  } = useMonitors();

  // 状态变化通知
  useNotification(allMonitors);

  const showLink = config.showLink;

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="card p-8 max-w-md text-center">
          <p className="text-4xl mb-4">😢</p>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            加载失败
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            {error instanceof Error ? error.message : '无法获取监控数据'}
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className={`min-h-screen ${embedMode ? 'p-4' : ''}`}>
        <Header />
        
        <main className={`max-w-6xl mx-auto px-4 ${embedMode ? '' : 'pt-6'} pb-8`}>
          {!embedMode && (
            <>
              <StatsOverview {...stats} isLoading={isLoading} />
              <Toolbar onRefresh={refetch} />
            </>
          )}
          
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MonitorList 
                monitors={monitors} 
                isLoading={isLoading}
                showLink={showLink}
              />
            </div>
            
            {!embedMode && (
              <div>
                <IncidentList incidents={incidents} isLoading={isLoading} />
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
