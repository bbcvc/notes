---
outline: deep
---

# 移动端相关

### 1. 移动端兼容适配

- ` <meta name="viewport" content="width=device-width, initial-scale=1.0">`
- rem, em, 百分比
- 框架的栅格布局
- media query 媒体查询
- 手淘团队的一套 flexible.js, 自动判断 dpr 进行整个布局视口的放缩

### 2. flexible 如何实现自动判断 dpr

判断机型, 找出样本机型去适配. 比如 iphone 以 6 为样本, 宽度 375px, dpr 是 2

### 3. 为什么以 iPhone6 为标准的设计稿的尺寸是以 750px 宽度来设计的呢？

iPhone6 的满屏宽度是 375px，而 iPhone6 采用的视网膜屏的物理像素是满屏宽度的 2 倍，也就是 dpr(设备像素比)为 2, 并且设计师所用的 PS 设计软件分辨率和像素关系是 1:1。所以为了做出的清晰的页面，设计师一般给出 750px 的设计图，我们再根据需求对元素的尺寸设计和压缩。

### 4. [如何处理异形屏 iphone X](https://blog.csdn.net/qq_42354773/article/details/81018615)

- `safe area`: 默认放置在安全区域以避免遮挡, 但会压缩
- 在 meta 中添加`viewport-fit=cover`: 告诉浏览器要讲整个页面渲染到浏览器中，不管设备是圆角与否，这个时候会造成页面的元素被圆角遮挡
- `padding: constant(env)`: 解决遮挡问题

### 5. 移动端首屏优化

- 采用服务器渲染 ssr
- 按需加载配合[webpack 分块打包](https://www.jb51.net/article/119160.htm), 通过 entry 和 commonChunkPlugin
- 很有必要将 script 标签 ➕ 异步
- 有轮播图 最好给个默认 另外要处理图片懒加载
- [打包线上也要注意去掉 map 文件](https://www.jianshu.com/p/bd202dca29ad)
- 组件, 路由懒加载
- webpack 的一切配置 肯定是必须的
- 压缩图片 [https://tinypng.com/](https://tinypng.com/)
- 建议还是用 webpack 的图片压缩插件
- 骨架屏
- Loading 页面

### 6. [PWA 全称 Progressive Web App，即渐进式 WEB 应用](https://segmentfault.com/a/1190000012353473?utm_source=tag-newest)

一个 PWA 应用首先是一个网页, 可以通过 Web 技术编写出一个网页应用. 随后添加上 App Manifest 和 Service Worker 来实现 PWA 的安装和离线等功能
解决了哪些问题？

- 可以添加至主屏幕，点击主屏幕图标可以实现启动动画以及隐藏地址栏
- 实现离线缓存功能，即使用户手机没有网络，依然可以使用一些离线功能
- 实现了消息推送
  它解决了上述提到的问题，这些特性将使得 Web 应用渐进式接近原生 App。

### 7. 离线包方案

现在 web 页面在移动端的地位越来越高，大部分主流 App 采用 native + webview 的 hybrid 模式，加载远程页面受限于网络，本地 webview 引擎，经常会出现渲染慢导致的白屏现象，体验很差，于是离线包方案应运而生。动态下载的离线包可以使得我们不需要走完整的 App 审核发布流程就完成了版本的更新

### 8. [自适应和响应式布局的区别](https://baijiahao.baidu.com/s?id=1627060039271152391&wfr=spider&for=pc)

1. 自适应布局通过检测视口分辨率，来判断当前访问的设备是：pc 端、平板、手机，从而请求服务层，返回不同的页面；响应式布局通过检测视口分辨率，针对不同客户端在客户端做代码处理，来展现不同的布局和内容。

2. 自适应布局需要开发多套界面，而响应式布局只需要开发一套界面就可以了。

3. 自适应对页面做的屏幕适配是在一定范围：比如 pc 端一般要大于 1024 像素，手机端要小于 768 像素。而响应式布局是一套页面全部适应。

4. 自适应布局如果屏幕太小会发生内容过于拥挤。而响应式布局正是为了解决这个问题而衍生出的概念，它可以自动识别屏幕宽度并做出相应调整的网页设计。

### 插件及工具相关

#### 1. [babel 和 polyfill](http://www.cnblogs.com/zhansu/p/8305081.html)

- `Babel`: Babel 是一个广泛使用的 ES6 转码器，可以将 ES6 代码转为 ES5 代码。注意：Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API

- `Polyfill`: Polyfill 的准确意思为，用于实现浏览器并不支持的原生 API 的代码。

#### 2. jpg, jpeg 和 png 区别

- jpg 是 jpeg 的缩写, 二者一致
- PNG 就是为取代 GIF 而生的, 无损压缩, 占用内存多
- jpg 牺牲图片质量, 有损, 占用内存小
- PNG 格式可编辑。如图片中有字体等，可利用 PS 再做更改。JPG 格式不可编辑

#### 3. [git rebase 和 merge 区别](https://www.jianshu.com/p/4079284dd970)

### 前端性能优化

1. 减少 HTTP 请求（合并 css、js，雪碧图/base64 图片）
2. 压缩（css、js、图片皆可压缩,使用 webpack uglify 和 svg）
3. 样式表放头部，脚本放底部
4. 使用 CDN（这部分，不少前端都不用考虑，负责发布的兄弟可能会负责搞好）
5. http 缓存
6. bosify 图片压缩: 根据具体情况修改图片后缀或格式 后端根据格式来判断存储原图还是缩略图
7. 懒加载, 预加载
8. 替代方案: 骨架屏, SSR
9. [webpack 优化](https://segmentfault.com/a/1190000015883378?utm_source=tag-newest)

### 原生通信

#### [JSBridge 通信原理, 有哪几种实现的方式？](https://blog.csdn.net/u014021258/article/details/81129702)

JsBridge 给 JavaScript 提供了调用 Native 功能，Native 也能够操控 JavaScript。这样前端部分就可以方便使用地理位置、摄像头以及登录支付等 Native 能力啦。JSBridge 构建 Native 和非 Native 间消息通信的通道，而且是 双向通信的通道。

- JS 向 Native 发送消息 : 调用相关功能、通知 Native 当前 JS 的相关状态等。
- Native 向 JS 发送消息 : 回溯调用结果、消息推送、通知 JS 当前 Native 的状态等。

::: tip
实现一个简单的 JSBridge，设计思路？
:::

