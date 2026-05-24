<script lang="ts" setup>
const route = useRoute()
if (route.query.lang) {
  const lang = route.query.lang as string
  const layout = useLayout()
  if (['en','fa','zh'].includes(lang))
    layout.changeLanguage(lang)
}

if (route.query.theme) {
  const theme = route.query.theme as string
  const layout = useLayout()
  layout.setDarkTheme(theme === 'dark')
}

useRouter().replace('/dashboard/ecommerce')
</script>

<template>
  Here we go!
</template>