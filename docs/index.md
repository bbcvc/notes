---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 笔记
  text: 前端⚡️AI知识分享
  tagline: 为学日益，为道日损。
  actions:
    - theme: brand
      text: 前端知识点
      link: /front-end/css
    - theme: alt
      text: AI 知识分享
      link: /ai/
  image:
    src: ./banner.webp
    alt: bbcvc

features:
  - title: 前端
    details: 整理当下前端的知识宝典，for前端工程师
  - title: Artificial Intelligence(AI)
    details: 如何使用好AI，是面向未来的能力
  - title: 更多...
    details: 感兴趣请访问我的博客👉[网络日志](https://www.cl96.top/)
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
