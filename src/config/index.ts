export interface NavItem {
  text: string;
  url: string;
}

export interface AppConfig {
  siteName: string;
  siteDescription: string;
  apiKeys: string[];
  apiUrl?: string;
  countDays: number;
  showLink: boolean;
  defaultTheme: 'light' | 'dark' | 'system';
  defaultSort: 'name' | 'status' | 'uptime';
  defaultFilter: 'all' | 'ok' | 'down';
  navi: NavItem[];
}

// 直接导入配置，不再异步加载
import config from './config';

export function getConfig(): AppConfig {
  return config;
}
