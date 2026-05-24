<script setup lang="ts">
interface Props {
  data: any[]
  colorScheme?: string
  colors?: string[]
  showLegend?: boolean
  legendPosition?: 'bottom' | 'right' | 'left'
  loading?: boolean
  height?: number | string
}
const props = withDefaults(defineProps<Props>(), {
  showLegend: true,
  legendPosition: 'bottom',
  loading: false,
  height: 250
})
</script>

<template>
  <BaseChart type="donut" v-bind="$attrs" :data="data" :show-legend="showLegend" :loading="loading"
    :legend-position="legendPosition" :height="height" :color-scheme="colorScheme" :colors="colors" />
</template>
