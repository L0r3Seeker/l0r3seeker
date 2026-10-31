# Beyond the Horizon

L0r3Seeker 的 Personal Digital Universe，第一阶段。

## 本地运行

需要 Node.js 20+。不需要安装依赖或构建。

```sh
npm run dev
npm run check
```

打开 http://127.0.0.1:4173 。发布目录为 `dist/`。

## 维护入口

- `dist/data/siteConfig.js`：站点文案、导航、身份占位、能力分类、联系入口。
- `dist/data/projects.js`：3 个明确标注的项目占位与探索条目。保持 `id` 稳定。
- `dist/components/`：六个区域、导航、页脚、项目详情分别独立。
- `dist/animations/`：首屏滚动过渡、进入动画、微交互，均提供清理函数。
- `dist/styles/globals.css`：颜色、字体、间距、断点与减少动态效果规范。
- `dist/assets/images/earth-horizon.webp`：桌面摄影；`earth-horizon-mobile.webp`：移动端版本。图片加载失败时保留渐变备用。
- `dist/components/ProjectDetail.js`：刷新安全的 `#/projects/:id` 路由入口，后续可替换为真实详情。

采用浏览器原生 ES modules，避免为第一阶段引入依赖。IntersectionObserver 触发进入效果；首屏通过 passive scroll + requestAnimationFrame 更新 transform/opacity，尺寸仅在布局变化时读取。手机降低变换幅度；`prefers-reduced-motion` 移除持续背景动画与滚动镜头。

## 内容边界

身份、地域、项目、探索条目与能力分类均为占位，未声称真实经历、成果或熟练度。GitHub、Bilibili、X、Email 是不可点击的展示占位，收到真实地址后再改为链接。项目详情仅说明占位状态。

## 资源

地球摄影：NASA / ISS064-E-005209，2020-11-20。
来源：https://www.nasa.gov/image-article/earths-limb-or-horizon/
原图：https://images-assets.nasa.gov/image/iss064e005209/iss064e005209~orig.jpg
仅缩放并编码为 WebP。

字体：Manrope，SIL Open Font License 1.1，随项目附带许可证。装饰性项目封面为本站 CSS/SVG 原创占位。
