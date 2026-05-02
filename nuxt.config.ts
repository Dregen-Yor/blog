import { seoData } from './app/data'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-09-30',

  modules: [
    'nuxt-llms',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    'nuxt-og-image',
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@formkit/auto-animate',
    '@stefanobartoletti/nuxt-social-share',
  ],

  llms: {
    domain: seoData.mySite,
    title: seoData.title,
    description: seoData.description,
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width,initial-scale=1',
      title: seoData.title,
      titleTemplate: `%s - ${seoData.title}`,
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  sitemap: {
    sources: [seoData.mySite],
  },

  site: {
    url: seoData.mySite,
    name: "Gengxin Sun's Blog",
  },

  typescript: {
    strict: true,
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/rss.xml'],
    },
  },

  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'light',
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'dracula',
          },
          langs: [
            'python',
            'javascript',
            'typescript',
            'vue',
            'html',
            'css',
            'scss',
            'json',
            'yaml',
            'markdown',
            'bash',
            'shell',
            'sql',
            'go',
            'rust',
            'java',
            'cpp',
            'c',
            'ruby',
            'php',
            'swift',
            'kotlin',
            'dart',
            'lua',
            'r',
            'latex',
            'dockerfile',
            'graphql',
            'xml',
            'toml',
          ],
        },
        remarkPlugins: {
          'remark-math': {},
        },
        rehypePlugins: {
          'rehype-katex': {
            output: 'mathml',
          },
        },
      },
    },
    experimental: {
      nativeSqlite: true,
    },
  },
})
