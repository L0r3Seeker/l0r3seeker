# Beyond the Horizon

L0r3Seeker 的个人作品网站。首页仍采用地平线照片，滚动后过渡到数字地球；页尾再次回到地平线。

## 运行

Node.js 20+，无需安装依赖或构建。

```sh
npm run dev
npm run check
```

静态发布目录为 `dist/`；Site 身份保留在 `.openai/hosting.json`。

## 当前界面

- 首页：六个主要区域。作品区是一个固定视口的时间线，每张卡片只展示项目概览。
- 项目按时间排列：MinecraftServer（2025.02 至今）、Minecraft / MythosClient 与 SoreinClient（2026.06.20 至今）、Variable（2026.07.21 至今）。
- 桌面滚轮一次最多推进一个项目，950ms 的手势保护抑制连续惯性。停留期间可以点击详情，不会自动播放下一项目或依次播放截图。浏览到边界后可离开作品区。时间线按钮也可选择项目。
- 项目主题依次使用服务器建筑摄影、IDEA 风格代码、工业解谜场景，采用淡变衔接。
- 详情弹窗包含完整介绍、所有截图、缩略图选择、前后切换、方向键和 Esc。MinecraftServer 包含五张用户截图及 mc.earthol.vip 地址复制按钮。
- `#/orbit` 是独立的 Daily Orbit 界面，不属于作品时间线。一个网格展示 19 个软件与平台图标，另一个区域展示三款游戏宣传图，两处均注明 and more。
- 游戏账号为 L0r3Seeker；好友代码始终显示 Hidden，无代码值，无展开入口。
- 全站默认英文。Menu 可切换简体中文，语言偏好仅保存在浏览器本地；个人介绍、项目介绍、按钮、详情与 Daily Orbit 均有中文内容。代码和品牌名保留原样。
- 减少动态效果模式下取消固定滚动，改为正常展示全部项目，详情入口仍可使用。

## 结构

- `dist/data/projects.js`：三项作品、日期、IP 与十一张项目截图。
- `dist/components/Projects.js`、`dist/animations/projectJourney.js`：时间线和按项目推进。
- `dist/components/ProjectDetail.js`：详情与手动图片浏览。
- `dist/data/orbit.js`、`dist/components/Orbit.js`：软件、游戏及独立视图导航。
- `dist/i18n.js`：语言、文案与本地偏好。
- `dist/components/CodeBackdrop.js`：原创装饰用 AutoCrystal.java 代码，不执行，也未声称来自真实源码。
- `dist/styles/work-orbit.css`：当前作品和 Daily Orbit 布局。

## 验证

`npm run check` 检查 JS 语法、导入、数据、静态资源、英文默认内容、三项目边界、运动限幅、语言映射和隐藏好友代码约束。

浏览器检查覆盖 1440×900、390×844 和 458×657，验证卡片与详情入口可见、快速滚轮不跳过多个项目、独立视图导航、Menu 双语切换、详情缩略图与图标/宣传图加载。未做真实手机硬件性能或 Minecraft 联机测试。页面没有显示虚构的服务器在线状态。

## 图像与图标来源

用户提供：地平线照片、四张 Variable 截图、两张客户端截图、五张服务器截图。

游戏宣传图来自 Steam 官方 CDN，对应商店：
- https://store.steampowered.com/app/2358720/
- https://store.steampowered.com/app/271590/
- https://store.steampowered.com/app/1551360/

图标：Simple Icons 16.36.0（CC0）、Lobe Icons 1.102.0（MIT）、Ant Design Icons 4.6.0（MIT），以及 Clash Verge Rev 官方项目图标。npm 下载包已按 registry 返回的 SHA-512 校验值验证，仅提取静态 SVG，不执行包代码。下载来源记录在 `dist/assets/icons/sources.json`。

- https://github.com/simple-icons/simple-icons
- https://github.com/lobehub/lobe-icons
- https://github.com/ant-design/ant-design-icons
- https://github.com/clash-verge-rev/clash-verge-rev

COBE 2.0.1（MIT）和 Manrope（SIL OFL）许可随附。历史 Three.js 文件和旧纹理保留，当前页面不加载。
