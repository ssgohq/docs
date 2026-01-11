import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "ss-cli",
  description: "Plugin-based CLI for development workflows",
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
          { text: 'Commands', link: '/commands' }
        ]
      },
      {
        text: 'Plugins',
        items: [
          { text: 'Official Plugins', link: '/plugins' },
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
