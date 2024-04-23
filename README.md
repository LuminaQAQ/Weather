## 一. 项目介绍

技术栈: Vue3 + Scss + js

接口次数不足时, 会返回伪数据

网页预览: [网址](https://luminaqaq.github.io/Weather/#/home)

---

## 二. 功能列表

- [x] 城市搜索
- [x] 城市天气
- [x] 实时天气
- [x] 每日天气预报
- [x] 逐小时天气预报
- [x] 分钟级降雨
- [x] 天气灾害预警
- [x] 天气指数(生活指数)
- [x] 空气质量
- [ ] 代码优化

---

## 三. 项目使用

```sh
npm install
npm run dev
npm run build
```

---

## 四. 目录结构

```tree
├─.gitignore
├─.vscode
│ └─extensions.json
├─deploy.bat
├─index.html
├─jsconfig.json
├─package-lock.json
├─package.json
├─public
│ └─favicon.ico
├─README.md
├─src
│ ├─App.vue
│ ├─assets
│ │ └─style
│ │   ├─icon.scss
│ │   ├─icon_weather.css
│ │   ├─index.scss
│ │   ├─mobile.scss
│ │   └─weawow_20240130.ttf
│ ├─components
│ │ ├─CenterBar.vue
│ │ ├─FooterBar.vue
│ │ ├─HeaderBar.vue
│ │ ├─LoadingStatus.vue
│ │ ├─SgInfoCard.vue
│ │ ├─SgSearchResItem.vue
│ │ ├─SgWarningInfoItem.vue
│ │ ├─SgWeatherCard.vue
│ │ ├─SgWeatherIndexItem.vue
│ │ └─SunriseSunset.vue
│ ├─main.js
│ ├─router
│ │ └─index.js
│ ├─stores
│ │ ├─AQIStore.js
│ │ ├─daysChartStore.js
│ │ ├─hourlyStore.js
│ │ ├─location.js
│ │ └─minutelyStore.js
│ ├─utils
│ │ ├─axios.js
│ │ ├─date.js
│ │ ├─handleImgFile.js
│ │ └─richPicOpt.js
│ └─views
│   ├─ExploerView.vue
│   └─HomeView.vue
└─vite.config.js
```
