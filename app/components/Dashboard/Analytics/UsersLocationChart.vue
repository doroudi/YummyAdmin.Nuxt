<script setup lang="ts">
import 'vue3-map-chart/dist/style.css'
import { MapChart } from 'vue3-map-chart'
import type { MapData } from 'vue3-map-chart/types/types.js'
import type { LocationChartSeries } from '~/models/ChartData'
import { useDashboard } from '~/composables/useDashboard'

const { usersLocationData, isLoading, getLocationStat } = useDashboard()

const locationData = computed(() => {
  if (!usersLocationData.value) return {}
  return arrayToKeyValue(usersLocationData.value!)
})

onMounted(() => {
  getLocationStat()
})

function arrayToKeyValue(arr: LocationChartSeries[]) {
  return arr.reduce((acc, item) => {
    acc[item.key] = item.value
    return acc
  }, {} as MapData)
}
</script>

<template>
  <Card class="p-2" :title="$t('dashboard.locationChart.title')">
    <MapChart
      v-if="!isLoading" :data="locationData" 
      base-color="var(--primary-color)"
      height="450"
      @map-item-click="onMapItemClick"
    />
  </Card>
</template>

<style lang="scss" scoped>

</style>
