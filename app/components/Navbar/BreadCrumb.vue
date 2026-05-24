<script lang="ts" setup>
const route = useRoute()
</script>

<template>
  <n-breadcrumb class="hidden md:block">
    <n-breadcrumb-item>
      <NuxtLink to="/">
        {{ $t('home') }}
      </NuxtLink>
    </n-breadcrumb-item>
    <n-breadcrumb-item v-for="item in route.meta.breadcrumb" :key="item">
      <!-- {{ $t(`menu.${item}`) }} -->
        {{ item }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>
