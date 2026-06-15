import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { yummyAdminThemeConfig } from './app/common/themes/theme-overrides'

export default defineNuxtConfig({
  modules:
    [
      '@nuxt/eslint',
      '@nuxt/icon',
      '@nuxt/image',
      '@nuxt/scripts',
      '@bg-dev/nuxt-naiveui',
      '@nuxtjs/i18n',
      '@nuxt/fonts',
      '@vercel/speed-insights',
      '@nuxt/hints',
      '@vercel/analytics',
      '@pinia/nuxt',
      'pinia-plugin-persistedstate/nuxt'
    ],
  devServer: {
    port: 4000
  },
  piniaPluginPersistedstate: {
    storage: 'cookies',
    cookieOptions: {
      sameSite: 'lax',
    },
    debug: true,
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  runtimeConfig: {
    public: {
      apiMock: false,
      appUrl: process.env.NUXT_PUBLIC_APP_URL || 'http://localhost:4000'
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
        fallbacks: ['Sans Serif', 'Segoe UI', 'Arial'],
      },
      {
        name: 'Quicksand',
        provider: 'google',
        display: 'swap',
        weight: [400, 700],
        style: 'normal',
        fallbacks: ['Sans Serif', 'Segoe UI', 'Arial'],
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
    transpile: ['vueuc', 'naive-ui', 'apexcharts', 'vue3-apexcharts', '@iconify/vue']
  },
  naiveui: {
    colorModePreference: 'light',
    themeConfig: yummyAdminThemeConfig.themeConfig,
  },
  app: {
    pageTransition: { name: 'page', mode: 'in-out' },
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
    },
    experimental: {
      websocket: true
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