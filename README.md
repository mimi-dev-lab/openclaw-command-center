# 🎮 OpenClaw Command Center

OpenClaw 的一站式可视化管理后台 — 全面掌控你的 AI Agent 系统

![Dashboard](./docs/dashboard.png)

## ✨ 功能模块

| 模块 | 描述 |
|------|------|
| 📊 **Dashboard** | 系统概览、实时状态、健康度监控 |
| 📄 **Config** | 核心配置文件编辑器（AGENTS.md, SOUL.md, USER.md...） |
| 🧠 **Memory** | 记忆系统浏览、搜索、编辑 |
| 🎨 **Prompts** | 提示词模板管理（图片/文字/代码...） |
| ⚡ **Skills** | Skill 浏览、配置、安装 |
| 📁 **Projects** | 本地项目管理 |
| 📤 **Output** | 输出文件浏览（images/documents/web/data） |
| ⏰ **Cron** | 定时任务监控 |
| 💬 **Sessions** | 会话历史统计 |
| ⚙️ **Settings** | OpenClaw 系统配置 |

## 🛠️ 技术栈

- **前端**: React 18 + TypeScript
- **构建**: Vite 7
- **样式**: Tailwind CSS 4
- **UI 组件**: Radix UI + 自定义组件
- **图表**: Recharts
- **部署**: Cloudflare Pages

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 📦 项目结构

```
src/
├── components/
│   ├── layout/      # 布局组件（Sidebar, Layout）
│   └── ui/          # UI 组件（Card, Button, Badge...）
├── pages/           # 页面组件
├── hooks/           # 自定义 Hooks
├── lib/             # 工具函数
└── types/           # TypeScript 类型定义
```

## 🎨 设计系统

### 颜色

- **Background**: `#0a0a0f` - 深空背景
- **Surface**: `#12121a` - 卡片/面板
- **Accent**: `#6366f1` - 强调色（Indigo）
- **Success/Warning/Error**: 状态指示色

### 组件

- 所有组件使用 CSS 变量，支持主题切换
- 采用 Tailwind CSS 4 原生语法
- 遵循 Radix UI 无障碍标准

## 📡 数据源

当前版本使用 Mock 数据展示界面。未来计划：

- [ ] 集成 OpenClaw Gateway API
- [ ] 本地文件系统读取
- [ ] 实时 WebSocket 更新

## 🌐 部署

项目部署在 Cloudflare Pages：

```bash
# 通过 Wrangler 部署
npx wrangler pages deploy dist
```

## 📝 开发计划

- [x] Dashboard 模块
- [x] Config 编辑器
- [x] Memory 浏览器
- [x] Prompts 管理
- [x] Skills 管理
- [x] Projects 管理
- [x] Output 浏览
- [x] Cron 监控
- [x] Sessions 统计
- [x] Settings 配置
- [ ] 真实 API 集成
- [ ] 文件实时编辑
- [ ] 暗/亮主题切换

## 📄 License

MIT
