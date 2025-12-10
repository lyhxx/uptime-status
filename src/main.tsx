import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 5分钟自动刷新
      refetchInterval: 5 * 60 * 1000,
      // 2分钟内数据视为新鲜，不重新请求
      staleTime: 2 * 60 * 1000,
      // 缓存保留10分钟
      gcTime: 10 * 60 * 1000,
      // 失败重试2次
      retry: 2,
      // 窗口聚焦时不自动刷新（避免切换标签页时重复请求）
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
