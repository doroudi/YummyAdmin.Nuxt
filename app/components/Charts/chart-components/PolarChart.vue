<script setup lang="ts">
import type { SimpleChartSeries } from '~/models/ChartData'

interface Props {
  data: SimpleChartSeries
  loading?: boolean
  height?: number | string
  colorScheme?: string
  colors: string[]
  showLegend?: boolean
  legendPosition?: 'bottom' | 'right' | 'left'
}

const props = withDefaults(defineProps<Props>(), {
  showLegend: true,
  legendPosition: 'bottom',
})
</script>

<template>
    <BaseChart type="polarArea" :data="data" :show-legend="showLegend" :loading="loading"
        :legend-position="legendPosition" :height="height" :colors="colors" />
</template>
