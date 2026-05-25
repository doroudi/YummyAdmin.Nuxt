<script setup lang="ts">
import { useLayout } from "./composables/useLayout";
import { darkTheme, lightTheme } from "naive-ui";
import { themeOverrides, darkThemeOverrides } from "./common/themes/theme-overrides";
import rtlStyles from "~/common/themes/rtl-styles";

const { isDark, isRtl } = useLayout()
const activeTheme = computed(() => {
  return isDark.value ? darkTheme : lightTheme;
});

const activeThemeOverrides = computed(() => {
  return isDark.value ? darkThemeOverrides : themeOverrides;
});

watch(
  () => isDark.value,
  (newValue) => {
    useHead({
      htmlAttrs: {
        class: newValue ? 'dark' : 'light'
      }
    })
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
  },

});

const title = "Yummy Admin Nuxt - Nuxt 3 Starter Template with Naive UI and Tailwind CSS";
const description = ".";

//TODO: update
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: "https://ui.nuxt.com/assets/templates/nuxt/starter-light.png",
  twitterImage: "https://ui.nuxt.com/assets/templates/nuxt/starter-light.png",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <NConfigProvider :preflight-style-disabled="true" :theme="activeTheme" :theme-overrides="activeThemeOverrides"
    :rtl="isRtl ? rtlStyles : []" inline-theme-disabled>
    <NuxtLoadingIndicator />
    <NMessageProvider>
      <NNotificationProvider>
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
  </NConfigProvider>
</template>
