import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "ss-cli",
  description: "Plugin-based CLI for development workflows",
  base: '/docs/',
  
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Plugins', link: '/plugins/' },
      { text: 'SDK', link: '/sdk/' },
      { text: 'GitHub', link: 'https://github.com/ssgohq/ss-cli' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Commands', link: '/guide/commands' },
            { text: 'Plugin Management', link: '/guide/plugins' },
            { text: 'GitHub Authentication', link: '/guide/github-auth' }
          ]
        }
      ],
      '/plugins/': [
        {
          text: 'Plugins',
          items: [
            { text: 'Management', link: '/plugins/management' }
          ]
        },
        {
          text: 'Official Plugins',
          items: [
            { text: 'Overview', link: '/plugins/' },
            { text: 'degit', link: '/plugins/degit' },
            { text: 'run', link: '/plugins/run' }
          ]
        }
      ],
      '/sdk/': [
        {
          text: 'Plugin SDK',
          items: [
            { text: 'Getting Started', link: '/sdk/' },
            { text: 'API Reference', link: '/sdk/api' }
          ]
        },
        {
          text: 'Packages',
          items: [
            { text: 'naming', link: '/sdk/naming' },
            { text: 'gen', link: '/sdk/gen' },
            { text: 'gomod', link: '/sdk/gomod' }
          ]
        }
      ]
    },

    outline: {
      level: [2, 3]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ssgohq/ss-cli' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 ssgohq'
    },

    search: {
      provider: 'local'
    }
  }
})
