# 服务状态监控面板

基于 UptimeRobot API 的现代化服务状态监控面板。

## 特性

- 🚀 **现代技术栈** - Vite + React 18 + TypeScript + TailwindCSS
- 📊 **数据可视化** - 可用率趋势图、响应时间图表
- 🔔 **实时通知** - 浏览器通知、页面标题状态提示
- 🌓 **主题切换** - 支持深色/浅色/跟随系统
- 📱 **响应式设计** - 完美适配移动端
- 🔍 **搜索筛选** - 按名称搜索、状态筛选、多种排序
- 📅 **时间范围** - 支持 30/60/90 天切换
- 📋 **故障历史** - 展示最近故障事件列表
- 🖼️ **嵌入模式** - 支持 iframe 嵌入其他页面
- 📲 **PWA 支持** - 可添加到桌面

## 快速开始

### 部署

1. 克隆项目
2. 修改 `src/config/config.ts` 配置文件
3. 运行 `npm run build`
4. 将 `dist` 目录部署到任意静态服务器

### 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 配置说明

编辑 `src/config/config.ts` 文件：

```typescript
const config: AppConfig = {
  // 网站标题
  siteName: '服务状态监控面板',

  // UptimeRobot API Keys
  // 支持 Monitor-Specific 和 Read-Only API Key
  apiKeys: ['your-api-key'],

  // 自定义 API 代理地址（可选）
  apiUrl: '',

  // 默认显示天数 (30, 60, 90)
  countDays: 90,

  // 是否显示站点链接
  showLink: true,

  // 默认主题 ('light' | 'dark' | 'system')
  defaultTheme: 'system',

  // 默认排序方式 ('name' | 'status' | 'uptime')
  defaultSort: 'name',

  // 默认状态筛选 ('all' | 'ok' | 'down')
  defaultFilter: 'all',

  // 导航栏菜单
  navi: [
    { text: '首页', url: 'https://example.com/' },
    { text: 'GitHub', url: 'https://github.com/xxx' },
  ],
};
```

## 嵌入模式

在 URL 后添加 `?embed=1` 参数可启用精简嵌入模式：

```html
<iframe src="https://status.example.com/?embed=1" width="100%" height="600"></iframe>
```

## API 代理

如需自建 API 代理解决跨域问题，参考以下 Nginx 配置：

```nginx
server {
  listen 80;
  server_name cors.status.example.com;
  
  location / {
    proxy_ssl_server_name on;
    proxy_pass https://api.uptimerobot.com/;
    proxy_hide_header Access-Control-Allow-Origin;
    add_header Access-Control-Allow-Origin * always;
  }
}
```

## 技术栈

- [Vite](https://vitejs.dev/) - 构建工具
- [React 18](https://react.dev/) - UI 框架
- [TypeScript](https://www.typescriptlang.org/) - 类型安全
- [TailwindCSS](https://tailwindcss.com/) - 样式框架
- [TanStack Query](https://tanstack.com/query) - 数据请求
- [Zustand](https://zustand-demo.pmnd.rs/) - 状态管理
- [Recharts](https://recharts.org/) - 图表库
- [Day.js](https://day.js.org/) - 日期处理

## License

MIT
