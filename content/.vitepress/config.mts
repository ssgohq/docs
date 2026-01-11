import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "ss-cli",
  description: "Plugin-based CLI for development workflows",
  base: '/docs/',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide' },
      { text: 'SDK', link: '/sdk' },
      { text: 'GitHub', link: 'https://github.com/ssgohq/ss-cli' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide' },
          { text: 'Commands', link: '/commands' },
          { text: 'Plugin Management', link: '/plugin-management' },
          { text: 'GitHub Authentication', link: '/github-auth' }
        ]
      },
      {
        text: 'Official Plugins',
        items: [
          { text: 'Overview', link: '/plugins/' },
          { text: 'degit', link: '/plugins/degit' },
          { text: 'run', link: '/plugins/run' }
        ]
      },
      {
        text: 'Plugin SDK',
        items: [
          { text: 'Building Plugins', link: '/sdk' },
          { text: 'API Reference', link: '/api' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ssgohq/ss-cli' }
    ]
  }
})
