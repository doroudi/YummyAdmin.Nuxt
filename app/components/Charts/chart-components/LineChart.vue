<script setup lang="ts">
import type { ChartData, SimpleChartSeries } from '~/models/ChartData'

interface Props {
  data?: ChartData | SimpleChartSeries | null
  colors?: string[]
  colorScheme?: string
  height?: number | string
  error?: any
  options?: any
  showLegend?: boolean
  loading?: boolean
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
  data: null,
})
</script>

<template>
  <BaseChart v-bind="$attrs" type="line" :height="22" :data="data" :colors="colors" />
</template>

<style lang="scss" scoped></style>
