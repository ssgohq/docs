import { defineConfig } from 'vitepress'
import apiLang from './api-lang.json'

export default defineConfig({
  title: "ssgo",
  description: "Go microservice code generation toolkit",
  base: '/docs/',

  markdown: {
    languages: [apiLang as any]
  },

  themeConfig: {
    nav: [
      { text: 'Getting Started', link: '/getting-started/' },
      { text: 'Commands', link: '/commands/' },
      { text: 'API Spec', link: '/api-spec/' },
      { text: 'RPC Spec', link: '/rpc-spec/' },
      { text: 'GitHub', link: 'https://github.com/ssgohq/ssgo' }
    ],

    sidebar: {
      '/getting-started/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/getting-started/' },
            { text: 'Configuration', link: '/getting-started/configuration' }
          ]
        }
      ],
      '/commands/': [
        {
          text: 'Commands',
          items: [
            { text: 'Overview', link: '/commands/' },
            { text: 'API Commands', link: '/commands/api' },
            { text: 'RPC Commands', link: '/commands/rpc' },
            { text: 'Database Commands', link: '/commands/db' },
            { text: 'Run Command', link: '/commands/run' }
          ]
        }
      ],
      '/api-spec/': [
        {
          text: 'API Specification',
          items: [
            { text: 'Overview', link: '/api-spec/' },
            { text: 'Syntax', link: '/api-spec/syntax' },
            { text: 'Type Definitions', link: '/api-spec/types' },
            { text: 'Service Definitions', link: '/api-spec/services' }
          ]
        }
      ],
      '/rpc-spec/': [
        {
          text: 'RPC Specification',
          items: [
            { text: 'Overview', link: '/rpc-spec/' },
            { text: 'Proto Format', link: '/rpc-spec/proto' },
            { text: 'Configuration', link: '/rpc-spec/config' }
          ]
        }
      ],
      '/reference/': [
        {
          text: 'Reference',
          items: [
            { text: 'goten-core', link: '/reference/goten-core' },
            { text: 'GitHub Authentication', link: '/reference/github-auth' }
          ]
        }
      ]
    },

    outline: {
      level: [2, 3]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ssgohq/ssgo' }
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
