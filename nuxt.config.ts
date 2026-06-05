import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { themeOverrides, darkThemeOverrides } from './app/common/themes/theme-overrides'
import colors from "tailwindcss/colors";

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
  // naiveui: {

  //   themeConfig: {
  //     shared: {
  //       ...themeOverrides
  //     },
  //     light: {
  //       ...themeOverrides
  //     },
  //     dark: {
  //       ...darkThemeOverrides
  //     },
  //     // ...generateTailwindColorThemes(),
  //   },

  // },
  naiveui: {
    colorModePreference: 'light',
    themeConfig: {
      shared: {
        common: {
          primaryColor: '#00ad4c',
          errorColor: '#FF0055',
          warningColor: '#FF8000',
          borderRadius: '5px',
          borderRadiusSmall: '3px',
        },
        Card: {
          borderRadius: '5px',
        },
        Tag: {
          borderRadius: '4px',
        },
        Notification: {
          padding: '15px',
        },
      },
      light: {
        common: {
          bodyColor: '#EEE',
          borderColor: '#e4e7ec',
        },
      },
      dark: {
        
        common: {
          borderColor: '#1c2334',
          cardColor: '#0f172a',
          popoverColor: '#0f172a',
          modalColor: '#1c202c',
          bodyColor: '#283046',
        },
        
        DataTable: {
          thColor: '#1c202c',
          tdColor: '#1c2334',
          hoverColor: '#1c202c',
          tdColorHover: '#1c202c',
        },
        
      },
    },
  },
  // naiveui: {
  //   themeConfig: {
  //     ...generateTailwindColorThemes(),
  //   },
  // },
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