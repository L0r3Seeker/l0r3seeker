# Beyond the Horizon

L0r3Seeker 的个人作品网站。当前包含六个区域，以及 Variable 和 Minecraft 两项作品。

## 运行

Node.js 20+，无需安装依赖或构建。

```sh
npm run dev
npm run check
```

预览地址：http://127.0.0.1:4173 。静态发布目录 `dist/`，Site 标识保留在 `.openai/hosting.json`。

## 页面与交互

- 首页使用用户提供的地球地平线照片；滚动时平滑淡入 COBE 点阵地球。无需选择方案，界面只有动画暂停按钮。页尾回到同一地平线，位移限制在 0 到 -8px。
- 作品区保持正常文档流，没有固定视口或强制阅读距离。Variable / Minecraft 按钮直接切换作品，每次展示一个项目。
- 桌面侧边曲线仅在悬停时接收滚轮，以平滑切换当前项目截图；首尾自动放行页面滚动。其他区域始终正常滚动。支持键盘方向键和显式截图按钮，手机使用按钮浏览。
- Variable 保留用户提供的中文原文、2026.07.21 至今的开发时间和四张原型截图。
- Minecraft 展示 MythosClient 与 SoreinClient 以及两张用户截图；未推测截图与客户端的逐一对应关系，也未编造开发日期。
- Minecraft 背景包含原创的 AutoCrystal.java 展示片段、语法高亮、文件树、标签和状态栏。它是页面装饰，不执行，也不是从真实项目导出的源码。
- 大图详情支持前后切换、方向键、Esc 和焦点恢复。路由如 `#/projects/minecraft/image/2` 可以直接访问和刷新。
- UI 采用英文，介绍正文保留中文。审核、占位和临时方案文案已移除。
- YouTube 暂时跳转官网，X / GitHub / Email 使用用户提供的地址。

## 文件

- `dist/data/projects.js`：作品与截图数据。
- `dist/components/Projects.js`、`CodeBackdrop.js`：作品布局和代码背景。
- `dist/animations/projectJourney.js`：项目选择、局部滚轮、截图过渡。
- `dist/components/GlobalUniverse.js`：照片到数字地球的全局场景。
- `dist/animations/motionMath.js`：渐变、阻尼和运动幅度边界。
- `dist/styles/globals.css`：基础样式；`universe-journey.css`：当前场景和作品样式。

页面支持减少动态效果、隐藏标签页暂停和像素密度限制。历史 Three.js 文件和旧纹理保留在源码中，当前页面不加载它们。

## 检查与资源

`npm run check` 检查模块语法、导入、资源、项目数据、英文 UI、审核文案清理、hosting manifest，以及地平线运动边界和曲线首尾放行。桌面与手机尺寸浏览器检查不等同于真实移动设备性能测试。

- 地平线照片及六张项目截图：用户提供，转换 WebP，保留构图。
- COBE 2.0.1（MIT），模块与 LICENSE 随附：https://github.com/shuding/cobe
- 历史 Three.js 资源（MIT），许可随附；当前不加载。
- Manrope：SIL Open Font License 1.1，附于 `dist/assets/fonts/OFL.txt`。
