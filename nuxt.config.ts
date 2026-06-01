import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export default defineNuxtConfig({
  modules:
  [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    'nuxtjs-naive-ui',
    '@nuxtjs/i18n',
    '@nuxt/fonts',
    '@vercel/speed-insights',
    'nuxt-booster',
  ],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  runtimeConfig: {
    public: {
      apiMock: false
    }
  },
  icon: {
    mode: 'css',
    cssLayer: 'base'
  },
  fonts: {
    provider: 'google',
    families: [
      {
        name: 'Inter', 
        provider: 'google',
        display: 'swap',
        weight: [400, 700],
        style: 'normal',
        fallbacks: ['Sans Serif','Segoe UI', 'Arial'],
      },
      {
        name: 'Quicksand', 
        provider: 'google',
        display: 'swap',
        weight: [400, 700],
        style: 'normal',
        fallbacks: ['Sans Serif','Segoe UI', 'Arial'],
      }
    ]
  },
  compatibilityDate: '2025-01-15',
  devtools: {
    enabled: true,
    timeline: {
      enabled: false,
    },
  },
  css: ['~/assets/css/main.scss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    transpile: ['vueuc', 'naive-ui', 'apexcharts', 'vue3-apexcharts', '@iconify/vue', 'nuxt-booster',]
  },
  app: {
    pageTransition: { name: 'page', mode: 'in-out' },
  },
  booster: {

    detection: {
      performance: true,
      browserSupport: true
    },

    performanceMetrics: {
      device: {
        hardwareConcurrency: { min: 2, max: 48 },
        deviceMemory: { min: 2 }
      },
      timing: {
        fcp: 800,
        dcl: 1200
      }
    },
  },
  vite: {
    plugins: [
      AutoImport({
        imports: [
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar'
            ]
          },
          // '@vueuse/head',
          '@vueuse/core'
        ]
      }),
      Components({
        resolvers: [NaiveUiResolver()]
      })
    ],
    build: {
      target: 'es2022'
    }
  },
  nitro: {
    esbuild: {
      options: {
        target: 'es2022'
      }
    }
  },
  i18n: {
    locales: [
      { code: 'en', language: 'en-US', file: 'en.yml' },
      { code: 'fa', language: 'fa-IR', file: 'fa.yml', dir: 'rtl' },
      { code: 'zh', language: 'zh-CN', file: 'zh.yml' }
    ],
    langDir: '../app/locales',
    defaultLocale: 'en',
  },
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

})