import { defineConfig } from 'vitepress'
import apiLang from './api-lang.json'

export default defineConfig({
  title: "ss-cli",
  description: "Plugin-based CLI for development workflows",
  base: '/docs/',

  markdown: {
    languages: [apiLang as any]
  },
  
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
            { text: 'GitHub Authentication', link: '/guide/github-auth' }
          ]
        }
      ],
      '/plugins/api/': [
        {
          text: 'API Plugin',
          items: [
            { text: 'Overview', link: '/plugins/api/' },
            { text: 'API Syntax', link: '/plugins/api/syntax' },
            { text: 'Type Definitions', link: '/plugins/api/types' },
            { text: 'Service Definitions', link: '/plugins/api/services' },
            { text: 'CLI Reference', link: '/plugins/api/cli' }
          ]
        }
      ],
      '/plugins/rpc/': [
        {
          text: 'RPC Plugin',
          items: [
            { text: 'Overview', link: '/plugins/rpc/' },
            { text: 'Proto Format', link: '/plugins/rpc/proto' },
            { text: 'Configuration', link: '/plugins/rpc/config' },
            { text: 'CLI Reference', link: '/plugins/rpc/cli' }
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
            { text: 'api', link: '/plugins/api/' },
            { text: 'rpc', link: '/plugins/rpc/' },
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
