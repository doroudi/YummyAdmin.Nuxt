<script setup lang="ts">
interface Props {
  data: any
  colorScheme?: string
  colors: string[]
  height: number | string
  loading?: boolean
  color: string
  showLegend?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  colors: () => [
    'var(--primary-color)',
    'var(--primary-color-shade1)',
    'var(--primary-color-shade2)',
    'var(--primary-color-shade3)',
  ],
  height: 400,
  loading: false,
})
</script>

<template>
  <BaseChart v-bind="$attrs" type="bar" :loading="loading" :height="height" :data="data" :colors="colors"
    :show-legend="showLegend" />
</template>
