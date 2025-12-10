import type { AppConfig } from './index';

/**
 * 应用配置文件
 * 修改此文件后需要重新构建
 */
const config: AppConfig = {
  // ===== 基础配置 =====

  // 网站标题
  siteName: '服务状态监控面板',

  // 网站描述（用于 SEO）
  siteDescription: '基于 UptimeRobot 的服务状态监控面板',

  // UptimeRobot API Keys
  // 支持 Monitor-Specific 和 Read-Only API Key
  // 可以配置多个 key，会合并显示所有监控项
  apiKeys: ['ur3205001-05db75e224a0309f16fd982c'],

  // 自定义 API 代理地址（可选，用于解决跨域问题）
  // 留空则使用官方 API: https://api.uptimerobot.com/v2/getMonitors
  apiUrl: 'https://javai.cn/api/uptimerobot/v2/getMonitors',

  // ===== 显示配置 =====

  // 默认显示天数 (30, 60, 90)
  countDays: 30,

  // 是否显示站点链接
  showLink: true,

  // 默认主题 ('light' | 'dark' | 'system')
  defaultTheme: 'system',

  // 默认排序方式 ('name' | 'status' | 'uptime')
  defaultSort: 'name',

  // 默认状态筛选 ('all' | 'ok' | 'down')
  defaultFilter: 'all',

  // ===== 导航菜单 =====

  navi: [
    { text: 'GitHub', url: 'https://github.com/lyhxx/lyhxx.github.io' },
  ],
};

export default config;
