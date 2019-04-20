module.exports = {
  head: [
    ['meta', { name: 'og:url', content: 'https://github.com/skanehira/gorilla' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: 'ゴリラの技術ブログ' }],
    ['meta', { name: 'og:description', content: 'ゴリラの技術ブログ' }],
    ['meta', { name: 'og:image', content: '/og.png' }],
    ['link', {
      rel: 'stylesheet',
      href: 'https://use.fontawesome.com/releases/v5.6.1/css/all.css',
      crossorigin: 'anonymous'
    }]
  ],
  title: "ゴリラのつまみ食い",
  description: " ",// 説明非表示
  dest: 'docs/',
  themeConfig: {
    nav: [
      {
        text:"Menu",
        items: [
          { text: 'Twitter', link: 'https://twitter.com/gorilla0513' },
          { text: 'GitHub', link: 'https://github.com/skanehira' },
          { text: 'Qiita', link: 'https://qiita.com/gorilla0513' }
        ]
      }
    ],
    sidebar: 'auto',
    sidebarDepth: 2,
    displayAllHeaders: true
  },
  markdown: {
    lineNumbers: true,
    linkify: true,
    config: md => {
      md.use(require('markdown-it-abbr')),
        md.use(require('markdown-it-footnote')),
        md.use(require('markdown-it-mark')),
        md.use(require('markdown-it-task-lists')),
        md.use(require('markdown-it-fontawesome'))
    }
  },
}
