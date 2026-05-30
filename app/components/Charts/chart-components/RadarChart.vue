<script setup lang="ts">
import BaseChart from './BaseChart.vue'
import type { ChartData } from '~/models/ChartData'
interface Props {
  data: ChartData
  colorScheme?: string
  colors: string[]
  showLegend?: boolean
  legendPosition?: 'bottom' | 'right' | 'left'
  loading?: boolean,
  height?: number
}
const props = withDefaults(defineProps<Props>(), {
  showLegend: true,
  legendPosition: 'bottom',
  height: 250
})

</script>

<template>
    <BaseChart v-bind="$attrs" :data="data" :show-legend="showLegend" :loading="loading"
        :legend-position="legendPosition" type="radar" :height="height" :colors="colors" />
</template>
