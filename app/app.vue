<script setup lang="ts">
import { darkTheme, lightTheme } from "naive-ui";
import { themeOverrides, darkThemeOverrides } from "./common/themes/theme-overrides";
import rtlStyles from "~/common/themes/rtl-styles";

const { isDark, isRtl, themeColor } = useLayout()
const customTheme = ref({ ...themeOverrides })
const customDarkTheme = ref({ ...darkThemeOverrides })
const { makeLighter } = useColorsUtility()
const activeTheme = computed(() => {
  return isDark.value ? darkTheme : lightTheme;
});

const activeThemeOverrides = computed(() => {
  return isDark.value ? customDarkTheme.value : customTheme.value;
});

watch(
  () => isDark.value,
  (newValue) => {
    if (import.meta.client) {
      const newTheme = newValue ? 'dark' : 'light'

      const htmlElement = document.documentElement
      htmlElement.classList.remove(newValue ? 'light' : 'dark')
      htmlElement.classList.add(newTheme)
    }
  },
  { immediate: true }
)

useHead({
  meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "en-US",
    class: isDark.value ? 'dark' : 'light'
  },
});

const title = "Yummy Admin Nuxt - Nuxt 3 Starter Template with Naive UI and Tailwind CSS";
const description = ".";

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: "github.com/doroudi/YummyAdmin/blob/main/docs/banner-dark.png?raw=true",
  twitterImage: "github.com/doroudi/YummyAdmin/blob/main/docs/banner-dark.png?raw=true",
  twitterCard: "summary_large_image",
});

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
  }

  if (!customTheme.value.common || !customDarkTheme.value.common)
    return

  customTheme.value.common.primaryColor = newValue
  customTheme.value.common.primaryColorHover = shade1
  customTheme.value.common.primaryColorPressed = shade2
  customTheme.value.common.primaryColorSuppl = shade3

  customDarkTheme.value.common.primaryColor = newValue
  customDarkTheme.value.common.primaryColorHover = shade1
  customDarkTheme.value.common.primaryColorPressed = shade2
  customDarkTheme.value.common.primaryColorSuppl = shade3
}

const notificationPlacement = computed(() => isRtl ? 'bottom-left' : 'bottom-right')
</script>

<template>
  <NaiveConfig :rtl="isRtl ? rtlStyles : []" preflight-style-disabled inline-theme-disabled>
    <!-- <naive-config :theme="activeTheme" :theme-overrides="activeThemeOverrides"> -->
    <!-- <NConfigProvider :preflight-style-disabled="true" :theme="activeTheme" :theme-overrides="activeThemeOverrides"
      :rtl="isRtl ? rtlStyles : []" inline-theme-disabled> -->
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
      <!-- <NGlobalStyle /> -->
    <!-- </NConfigProvider> -->
    <!-- </naive-config> -->
  </NaiveConfig>
</template>
