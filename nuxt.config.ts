import { defineNuxtModule } from 'nuxt/kit'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { yummyAdminThemeConfig } from './app/common/themes/theme-overrides'

/**
 * Client-side pre-bundling fix for Naive UI's dev startup cost.
 *
 * Naive UI ships as ~780 loose ES modules (`naive-ui/es/**`, and `es/components.mjs`
 * alone re-exports 100 of them). Nuxt turns every `build.transpile` entry into Vite's
 * `optimizeDeps.exclude` for the client, which switches dependency pre-bundling *off*
 * for that package on the browser side. Because `@bg-dev/nuxt-naiveui` pushes
 * `naive-ui` into `build.transpile` during development, the first render had to
 * transform and download all of those modules individually instead of loading a single
 * esbuild-pre-bundled chunk — that is what made the first render take minutes. Once
 * Vite had cached the whole graph, later renders were fast.
 *
 * The exclusion cannot simply be dropped from `build.transpile`, because Nuxt derives
 * `ssr.noExternal` for the server from the same list, and on the server Naive UI must
 * stay Vite-transformed: its ESM entry points import named exports from the
 * CommonJS-only `vueuc`, which Node cannot interop on its own.
 *
 * So this module removes the exclusion for the client only. The server keeps the
 * original behaviour, and so does the production build.
 */
const naiveUiClientPrebundle = defineNuxtModule({
  meta: { name: 'naive-ui-client-prebundle' },
  setup(_options, nuxt) {
    // `vite:extendConfig` is the per-environment hook: it is called with the browser
    // config and with the server config separately.
    nuxt.hook('vite:extendConfig', (config, environment) => {
      if (!environment?.isClient || !Array.isArray(config.optimizeDeps?.exclude)) {
        return
      }

      const preBundled = new Set([
        'naive-ui',
        'vueuc',
        '@css-render/vue3-ssr',
        '@iconify/vue'
      ])

      config.optimizeDeps.exclude = config.optimizeDeps.exclude.filter(
        (entry) => typeof entry !== 'string' || !preBundled.has(entry)
      )
    })
  }
})

export default defineNuxtConfig({
  modules:
    [
      '@nuxt/eslint',
      '@nuxt/icon',
      '@nuxt/image',
      '@nuxt/scripts',
      '@bg-dev/nuxt-naiveui',
      naiveUiClientPrebundle,
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
      // The vendored uipkge chart primitives are imported explicitly (see
      // app/components/ui/charts/index.ts). `pathPrefix: false` registers every
      // component under its bare basename, so leaving them in the scan would
      // shadow the app's own wrappers in `components/Charts/chart-components`,
      // which share names like `AreaChart` and `BarChart`.
      ignore: ['ui/charts/**'],
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
    transpile: ['vueuc', 'naive-ui', 'echarts', 'vue-echarts', '@iconify/vue']
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
    optimizeDeps: {
      // Nuxt's client entry is virtual, so Vite's dependency scanner cannot discover
      // what the app imports. Listing these explicitly makes esbuild pre-bundle them
      // while the dev server boots, instead of optimizing them lazily during the first
      // page render (which also forces a full page reload).
      include: [
        'naive-ui',
        'naive-ui/es/components',
        'naive-ui/es/_internal/scrollbar/styles/rtl',
        'naive-ui/es/alert/styles',
        'naive-ui/es/button/styles',
        'naive-ui/es/dialog/styles',
        'naive-ui/es/drawer/styles',
        'naive-ui/es/input/styles',
        'naive-ui/es/message/styles',
        'naive-ui/es/table/styles',
        'naive-ui/es/tag/styles',
        '@iconify/vue'
      ]
    },
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