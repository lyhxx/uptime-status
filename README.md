# 服务状态监控面板

中文 | [English](./README_EN.md)

基于 UptimeRobot API 的现代化服务状态监控面板。

演示地址：[EdgeOne Pages 部署](https://pages.edgeone.ai/)

![预览图](docs/images/preview.png)

## 快速部署

[![Deploy to EdgeOne](https://pages.edgeone.ai/button.svg)](https://pages.edgeone.ai/new?template=https://github.com/lyhxx/uptime-status)

点击上方按钮一键部署到 EdgeOne Pages，部署时需要配置：
- `VITE_UPTIME_API_KEYS`: 你的 UptimeRobot API Key（必填）
- 其他环境变量可选，使用默认值即可

## 特性

- 🚀 **现代技术栈** - Vite + React 18 + TypeScript + TailwindCSS
- 📊 **数据可视化** - 可用率趋势图、响应时间图表（动态 Y 轴范围、主题适配 Tooltip）
- 🔔 **实时通知** - 浏览器通知（可开关）、页面标题状态提示
- 🌓 **主题切换** - 支持深色/浅色/跟随系统
- 📱 **响应式设计** - 完美适配移动端
- 🔍 **搜索筛选** - 按名称搜索、状态筛选（含暂停）、多种排序
- 📅 **时间范围** - 支持 30/60/90 天切换
- 📋 **故障历史** - 展示最近故障事件列表及原因（响应式布局）
- 🖼️ **嵌入模式** - 支持 iframe 嵌入其他页面
- 📲 **PWA 支持** - 可添加到桌面
- 🔤 **字体自适应** - 自动适配各平台最佳中文字体（苹方/微软雅黑等）
- 📈 **访问统计** - 集成不蒜子统计
- ♿ **无障碍支持** - 键盘导航、屏幕阅读器支持、跳过链接
- 🔄 **智能刷新** - 显示最后更新时间、loading 状态、自动重试

## 快速开始

### EdgeOne Pages 部署（推荐）

#### 方式一：一键部署

1. 点击上方 "Deploy to EdgeOne" 按钮
2. 登录/注册 EdgeOne 账号
3. 配置环境变量：
   - `VITE_UPTIME_API_KEYS`: 填入你的 UptimeRobot API Key（[获取地址](https://uptimerobot.com/dashboard#mySettings)）
   - 其他变量使用默认值即可
4. 点击部署，等待构建完成
5. 访问分配的域名即可使用

#### 方式二：从 GitHub 导入

1. 访问 [EdgeOne Pages](https://pages.edgeone.ai/)
2. 连接你的 GitHub 账号
3. 选择本仓库
4. 配置构建设置：
   - 构建命令: `npm run build`
   - 输出目录: `dist`
5. 配置环境变量（同上）
6. 开始部署

#### EdgeOne 边缘函数（API 代理）

EdgeOne 部署后自动启用边缘函数 API 代理，无需额外配置：
- 代理路径: `https://your-domain.com/api/uptimerobot/v2/getMonitors`
- 自动解决跨域问题
- 国内访问速度更快

如需使用代理，在部署时设置环境变量：
```
VITE_API_PROXY_URL=/api/uptimerobot/v2/getMonitors
```

### 本地开发

```bash
# 安装依赖
npm install

# 复制环境变量配置文件
cp .env.example .env

# 编辑 .env 文件，填入你的 API Key
# VITE_UPTIME_API_KEYS=your-api-key

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 获取 API Key

1. 注册 [UptimeRobot](https://uptimerobot.com/) 账号
2. 添加需要监控的网站/服务
3. 进入 **My Settings** 页面
4. 找到 **API Settings** 部分
5. 点击 **Create Read-only API Key** 创建只读 API Key
6. 复制生成的 Key（以 `ur` 开头）

> 注意：请使用 Read-only API Key，不要使用 Main API Key，避免泄露后被恶意操作。

## 环境变量配置

EdgeOne Pages 部署时通过环境变量配置，本地开发可创建 `.env` 文件：

```bash
# 复制示例文件
cp .env.example .env

# 编辑 .env 文件，填入你的配置
```

**环境变量说明**：

| 变量名 | 说明 | 必填 | 示例 |
|--------|------|------|------|
| `VITE_UPTIME_API_KEYS` | UptimeRobot API Keys，多个用逗号分隔 | 是 | `ur123...,ur456...` |
| `VITE_API_PROXY_URL` | API 代理地址 | 否 | `/api/uptimerobot/v2/getMonitors` |
| `VITE_SITE_NAME` | 网站名称 | 否 | `服务状态监控` |
| `VITE_SITE_DESCRIPTION` | 网站描述 | 否 | `实时监控服务状态` |

## 配置说明

### 环境变量配置（推荐）

EdgeOne Pages 部署时通过环境变量配置，无需修改代码：

```bash
# .env 文件示例（本地开发用）
VITE_UPTIME_API_KEYS=your-api-key-1,your-api-key-2
VITE_API_PROXY_URL=/api/uptimerobot/v2/getMonitors
VITE_SITE_NAME=服务状态监控面板
VITE_SITE_DESCRIPTION=实时监控服务运行状态
```

### 应用配置 (src/config/config.ts)

本地开发时可直接修改此文件，生产环境建议使用环境变量：

```typescript
const config: AppConfig = {
  // 网站标题（支持环境变量 VITE_SITE_NAME）
  siteName: '服务状态监控面板',

  // 网站描述（支持环境变量 VITE_SITE_DESCRIPTION）
  siteDescription: '实时监控服务运行状态，查看历史可用性数据',

  // 网站关键词（用于 SEO）
  siteKeywords: '服务监控,状态页面,UptimeRobot,可用性监控',

  // UptimeRobot API Keys（支持环境变量 VITE_UPTIME_API_KEYS）
  apiKeys: ['your-api-key'],

  // API 代理地址（支持环境变量 VITE_API_PROXY_URL）
  apiUrl: '',

  // 默认显示天数 (30, 60, 90)
  countDays: 30,

  // 是否显示站点链接
  showLink: true,

  // 默认主题 ('light' | 'dark' | 'system')
  defaultTheme: 'system',

  // 默认排序方式 ('name' | 'status' | 'uptime')
  defaultSort: 'name',

  // 默认状态筛选 ('all' | 'ok' | 'down' | 'paused')
  defaultFilter: 'all',

  // 自动刷新间隔（秒）
  refetchInterval: 300,

  // 数据新鲜时间（秒）
  staleTime: 120,

  // 缓存保留时间（秒）
  cacheTime: 600,
};
```

## 嵌入模式

在 URL 后添加 `?embed=1` 参数可启用精简嵌入模式：

```html
<iframe src="https://your-domain.com/?embed=1" width="100%" height="600"></iframe>
```

## API 代理

由于浏览器跨域限制，直接调用 UptimeRobot API 会失败，需要通过代理转发请求。

### EdgeOne 边缘函数（推荐）

EdgeOne Pages 部署时自动包含边缘函数代理，无需额外配置：

1. 部署到 EdgeOne Pages 后，边缘函数自动生效
2. 设置环境变量 `VITE_API_PROXY_URL` 为 `/api/uptimerobot/v2/getMonitors`
3. 边缘函数代码位于 `edgeone/functions/api/uptimerobot/[[path]].js`

**优势**：
- ✅ 无需额外服务器
- ✅ 自动处理 CORS
- ✅ 边缘节点加速
- ✅ 与静态资源同域名

### Nginx 代理

如果使用自己的服务器：

```nginx
# UptimeRobot API 代理
location /api/uptimerobot/ {
  proxy_pass https://api.uptimerobot.com/;
  proxy_ssl_server_name on;

  # 隐藏上游返回的 CORS header
  proxy_hide_header Access-Control-Allow-Origin;
  proxy_hide_header Access-Control-Allow-Methods;
  proxy_hide_header Access-Control-Allow-Headers;

  # 重新添加
  add_header Access-Control-Allow-Origin * always;
  add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS' always;
  add_header Access-Control-Allow-Headers 'Content-Type' always;

  if ($request_method = 'OPTIONS') {
    return 204;
  }
}
```

### Cloudflare Worker

如果使用 Cloudflare：

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 Workers & Pages → Create Worker
3. 将 `worker/uptimerobot-proxy.js` 的内容粘贴进去
4. 部署后获得 Worker URL（如 `https://your-worker.workers.dev`）
5. 设置环境变量 `VITE_API_PROXY_URL` 为 `https://your-worker.workers.dev/v2/getMonitors`

## 技术栈

- [Vite](https://vitejs.dev/) - 构建工具
- [React 18](https://react.dev/) - UI 框架
- [TypeScript](https://www.typescriptlang.org/) - 类型安全
- [TailwindCSS](https://tailwindcss.com/) - 样式框架
- [TanStack Query](https://tanstack.com/query) - 数据请求
- [Zustand](https://zustand-demo.pmnd.rs/) - 状态管理
- [Recharts](https://recharts.org/) - 图表库

## 自定义域名

EdgeOne Pages 支持绑定自定义域名：

1. 在 EdgeOne 控制台绑定你的域名
2. 配置 DNS 解析（CNAME 或 A 记录）
3. 域名生效后即可访问

## 常见问题

**Q: 页面显示"获取数据失败"？**

A: 通常是跨域问题，需要配置 API 代理。参考上方 API 代理部分。

**Q: 数据不更新？**

A: 默认 5 分钟刷新一次，可在配置文件中调整 `refetchInterval`。UptimeRobot 免费版本身也是 5 分钟检测一次。

**Q: 如何监控多个账号的服务？**

A: 在 `apiKeys` 数组中添加多个 API Key，数据会自动合并显示。

**Q: 如何隐藏某些监控项？**

A: 在 UptimeRobot 后台为特定监控项创建 Monitor-Specific API Key，只会返回该监控项的数据。

**Q: 如何关闭浏览器通知？**

A: 点击工具栏的通知图标即可切换开关状态，设置会自动保存。

**Q: 页面显示"请配置 API Key"？**

A: EdgeOne Pages 部署时需要在环境变量中配置 `VITE_UPTIME_API_KEYS`。本地开发时可在 `src/config/config.ts` 中配置。

**Q: EdgeOne Pages 部署失败？**

A: 检查环境变量是否正确配置，特别是 `VITE_UPTIME_API_KEYS` 必须填写有效的 API Key。

**Q: API 代理不工作？**

A: 确保环境变量 `VITE_API_PROXY_URL` 设置为 `/api/uptimerobot/v2/getMonitors`，EdgeOne 会自动使用边缘函数代理。

## License

MIT
