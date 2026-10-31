# Beyond the Horizon

L0r3Seeker 的个人数字宇宙。当前版本包含六个区域、A/B 全局地球背景与《变量（Variable）》项目旅程。

## 运行

Node.js 20+，无需安装依赖或构建。

```sh
npm run dev
npm run check
```

预览：http://127.0.0.1:4173 。发布目录 `dist/`，Site 标识保留在 `.openai/hosting.json`。

## 内容与结构

- `dist/data/projects.js`：《变量》的原文旁白、2026.07.21 至今的开发时间、四张用户提供的原型截图。增加项目即可扩展单项目旅程；没有虚构开发里程碑。
- `dist/components/Projects.js`：每个视口聚焦一个项目，截图为主、旁白为辅；下方是带分支与时间戳的横向曲线。
- `dist/animations/projectJourney.js`：原生滚动进度推动曲线与画面，支持截图按钮、触屏与减少动态效果，不接管滚轮。
- `dist/components/ProjectDetail.js`：`#/projects/variable` 与 `#/projects/variable/image/1` 等刷新安全路由；大图查看支持前后切换、方向键、Esc 与焦点恢复。
- `dist/components/GlobalUniverse.js`：A 真实纹理地球、B COBE 点阵地球；按需加载并保存选择。动画暂停、页面隐藏暂停、像素密度限制与静态背景备用。
- `dist/animations/motionMath.js`：纯函数管理平滑与幅度边界；页尾使用独立的固定构图地平线，位移限制在 0 到 -8px，不放大完整球体。
- `dist/data/siteConfig.js`：站点资料与社交链接。YouTube 暂时跳转官网，X / GitHub / Email 使用用户提供的地址。介绍、能力等未提供的个人资料仍明确标为占位。
- `dist/styles/globals.css`：基础设计系统；`universe-journey.css`：全局背景与本轮项目旅程样式。

手机保持画面完整。窄屏旁白限制显示行数，短屏优先展示图片与曲线，完整原文可从“完整旁白与画面”打开。

## 检查

`npm run check` 检查脚本语法、相对导入、资源、项目数据与 hosting manifest，并模拟突然跳转、确认地平线范围、无过冲和画廊边界。浏览器检查不等同于真实移动设备性能测试。

## 资源与许可

- 项目截图：用户提供的四张《变量》Godot 原型截图，仅编码为 WebP，保留原始构图。
- 地平线摄影：NASA / ISS064-E-005209。https://www.nasa.gov/image-article/earths-limb-or-horizon/
- A：Three.js 0.187.0（MIT）。原 npm 包使用官方完整性校验值校验；生成的预压缩 ES module 保存为 `dist/assets/vendor/three/three.bundle.js`，LICENSE 随附。https://github.com/mrdoob/three.js
- 地球参考纹理：Three.js 官方 `examples/textures/planets/earth_atmos_2048.jpg`；夜景纹理来自 three-globe 官方 `example/img/earth-night.jpg`。光照是艺术化渲染，不是实时天文模拟。
- B：COBE 2.0.1（MIT），模块与 LICENSE 随附。https://github.com/shuding/cobe
- Manrope：SIL Open Font License 1.1，附于 `dist/assets/fonts/OFL.txt`。