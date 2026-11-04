# Beyond the Horizon

L0r3Seeker 的个人作品网站。地平线照片是首页封面，随滚动淡变到数字地球，结尾再次回到地平线。Daily Orbit 是同一页面内的第 06 区。

## 运行与检查

Node.js 20+，无需安装依赖：

```sh
npm run dev
npm run check
```

静态源目录为 `dist/`。本地首页为 http://127.0.0.1:4173/ 。全站默认英文，Menu 可切换中文并保存本地偏好。旧的 `#/orbit` 启动链接回到地平线，正常 Orbit 导航使用 `#orbit`。

## 当前内容

- 七个主要区域：地平线、介绍、作品、探索、视野与技术服务、日常轨道、联系。
- 作品顺序：Variable、Client（MythosClient / SoreinClient）、Earthol.vip、MinecraftServer。
- 日期分别保留为 2026.07.21 至今、2026.06.20 至今、网页项目标签、2025.02 至今。Earthol 未提供开发日期，不编造。
- 桌面滚轮一次最多推进一个项目，950ms 手势保护抑制惯性连跳。每个项目停留展示概览与可点击的详情入口；概览不会依次播放截图。时间线按钮也可选择作品。到达边界后允许离开作品区。
- 详情使用手动缩略图、前后切换、方向键与 Esc。服务器地址 mc.earthol.vip 可以复制；Earthol 有外部网页链接。
- 第 05 区以围墙和地平线的隐喻表达能力不应受环境限制，下接网站、游戏原型、Minecraft 开发、工具自动化四类技术服务卡片；邮件入口使用用户提供的邮箱。
- Daily Orbit 的软件网格展示 19 个应用图标，三款游戏同组分区展示官方宣传图、介绍和商店链接；两组都标明 and more。账号 L0r3Seeker，好友代码始终显示 Hidden，无代码值与展开入口。
- 页底微型名言条收录六位现代人物的短句。每次点击刷新随机选择另一条，作者链接指向原始出处，中文为本站译文。没有自动刷新或外部 API 依赖。来源见 `docs/quote-sources.md`。
- 系统减少动态效果模式下，作品改为普通文档流，全部详情入口仍可用。

## GitHub Pages

源码仓库：https://github.com/L0r3Seeker/l0r3seeker

正式域名：https://l0r3seeker.vip/ 。GitHub Pages 为本仓库单独绑定此域名，发布根目录带有 CNAME。之前继承账号旧域名的配置已纠正，不改动账号主页仓库。

发布分支为 `gh-pages`，源码在 `main`。默认构建面向独立域名根路径：

```sh
npm run build:pages
```

脚本将 `dist` 复制到忽略的 `_site/`，资源使用根路径 `/assets/`，Open Graph 地址为正式域名。将生成内容提交到 `gh-pages` 分支根目录，保留 CNAME 文件。不要再使用 `/l0r3seeker/` 作为本网站的发布前缀。

域名可访问还需要 DNS 指向 GitHub Pages，并等待 HTTPS 证书就绪。DNS 生效状态属于外部配置，不能以构建成功代替确认。

历史 Sites 身份保留在 `.openai/hosting.json`；当前 GitHub 发布不改变旧 chatgpt.site 的托管状态。

## 验证与素材

`npm run check` 覆盖 JS 语法、导入、四项目顺序与边界、七区结构、资源、运动限幅、英文默认内容、中英文映射、固定隐藏好友代码及名言随机算法。浏览器验证页面导航、详情、刷新和响应式布局；未进行真实手机硬件性能或 Minecraft 联机测试，没有虚构服务器在线状态。

用户提供地平线照片、四张 Variable 截图、两张客户端截图、五张服务器截图。Earthol 封面从用户公开仓库 https://github.com/L0r3Seeker/Earth-online-site 当前源码本地渲染截取；访问 live domain 在本次环境超时，未据此断言网站线上故障。

游戏图来自 Steam 官方 CDN：

- https://store.steampowered.com/app/2358720/
- https://store.steampowered.com/app/271590/
- https://store.steampowered.com/app/1551360/

图标为 Simple Icons 16.36.0（CC0）、Lobe Icons 1.102.0（MIT）、Ant Design Icons 4.6.0（MIT）及 Clash Verge Rev 官方图标，下载来源记录在 `dist/assets/icons/sources.json`，包已校验 SHA-512，仅提取静态 SVG。COBE 2.0.1（MIT）与 Manrope（SIL OFL）许可随附。装饰用 AutoCrystal.java 为原创展示代码，不执行，也未声称是真实客户端源码。历史 Three.js 和旧纹理保留但当前不加载。
