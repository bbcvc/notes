import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "笔记",
  description: "前端,AI知识,react,vue,chatGPT知识分享",
  themeConfig: {
    logo: 'https://public-imgs-bucket.s3.bitiful.net/avatar.jpg',
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local'
    },
    lastUpdated: {
      text: '最后更新时间'
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '前端', link: '/front-end/css', activeMatch: `^/front-end/` },
      { text: 'AI', link: '/ai/' }
    ],

    sidebar: {
      '/front-end/': [
        {
          text: '基础',
          items: [
            {
              text: 'CSS',
              link: '/front-end/css'
            },
            {
              text: 'javaScript',
              link: '/front-end/js'
            },
            {
              text: '浏览器网络相关',
              link: '/front-end/browser'
            }
          ]
        },
        {
          text: '框架',
          items: [
            {
              text: 'Vue2.x',
              link: '/front-end/vue2'
            },
            {
              text: 'React',
              link: '/front-end/react'
            }
          ]
        },
        {
          text: '其他',
          items: [
            {
              text: '移动端',
              link: '/front-end/mobile'
            },
            {
              text: 'node',
              link: '/front-end/node'
            }
          ]
        }
      ],
      '/ai/': [
        {
          text: '名次释义'
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/bbcvc' }
    ]
  },
  head: [
    ['link', {rel: 'icon', type: 'image/svg+xml', href: '/logo-mini.svg'}]
  ]
})
