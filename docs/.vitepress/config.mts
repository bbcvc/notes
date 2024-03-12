import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "笔记",
  description: "前端,AI知识,react,vue,chatGPT知识分享",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '前端', link: '/front-end' },
      { text: 'AI', link: '/ai' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: '前端', link: '/front-end' },
          { text: 'AI', link: '/ai' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/bbcvc' }
    ]
  }
})
