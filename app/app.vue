<script setup lang="ts">
import rtlStyles from "~/common/themes/rtl-styles"
const { colorModePreference } = useNaiveColorMode()

const layoutStore = useLayoutStore()
const { isRtl, isDark, themeColor } = storeToRefs(layoutStore)
const { makeLighter } = useColorsUtility()

/** Fixed 5th series colour, so multi-series charts stay distinguishable. */
const ACCENT_CHART_COLOR = '#ff7300'

useHead({
  meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "en-US",
    class: [ isRtl.value ? 'rtl' : 'ltr' ].join(' ')
  },
});

const title = "Yummy Admin Nuxt - Nuxt 4 Starter Template with Naive UI and Tailwind CSS";
const description = ".";

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: "https://github.com/doroudi/YummyAdmin/blob/main/docs/banner-dark.png?raw=true",
  twitterImage: "https://github.com/doroudi/YummyAdmin/blob/main/docs/banner-dark.png?raw=true",
  twitterCard: "summary_large_image",
});

watch(
  () => isDark.value,
  (newValue) => {
    if (import.meta.client) {
      colorModePreference.set(newValue ? "dark" : "light")
    }
  },
  { immediate: true }
)

watch(
  () => themeColor.value, (newValue: string) => {
    setThemeColor(newValue)
  },
  { immediate: true },
)

function setThemeColor(newValue: string) {
  if (newValue === '')
    return

  const shade1 = makeLighter(newValue, 0.8)
  const shade2 = makeLighter(newValue, 0.7)
  const shade3 = makeLighter(newValue, 0.7)

  if (import.meta.client) {
    document.documentElement.style.setProperty('--primary-color', newValue)
    document.documentElement.style.setProperty('--primary-color-shade1', shade1)
    document.documentElement.style.setProperty('--primary-color-shade2', shade2)
    document.documentElement.style.setProperty('--primary-color-shade3', shade3)

    // ECharts-based charts (vendored uipkge primitives) read --chart-1..5.
    // They cannot use var(--primary-color) directly: the canvas renderer needs
    // a resolved colour string.
    document.documentElement.style.setProperty('--chart-1', newValue)
    document.documentElement.style.setProperty('--chart-2', shade1)
    document.documentElement.style.setProperty('--chart-3', shade2)
    document.documentElement.style.setProperty('--chart-4', shade3)
    document.documentElement.style.setProperty('--chart-5', ACCENT_CHART_COLOR)
  }
}

const notificationPlacement = computed(() => isRtl ? 'bottom-left' : 'bottom-right')
</script>

<template>
  <NaiveConfig :rtl="isRtl ? rtlStyles : []" preflight-style-disabled inline-theme-disabled>
      <NuxtLoadingIndicator />
      <NMessageProvider :placement="notificationPlacement">
        <NNotificationProvider :placement="notificationPlacement">
          <NModalProvider>
            <NDialogProvider>
              <NuxtRouteAnnouncer />
              <NuxtLayout>
                <NuxtPage />
              </NuxtLayout>
            </NDialogProvider>
          </NModalProvider>
        </NNotificationProvider>
      </NMessageProvider>
  </NaiveConfig>
</template>
