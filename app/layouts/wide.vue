<script setup lang="ts">
import DefaultLayout from './default.vue'

defineOptions({
  name: 'WideLayout'
})
</script>

<template>
  <DefaultLayout :is-fluid="true" full-screen>
    <slot />  
  </DefaultLayout>

</template>
