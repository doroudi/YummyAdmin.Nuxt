<script lang="ts" setup>
import type { SimpleChartSeries } from '~/models/ChartData'

// Demo data - swap for a service call the way the other chart demos do.
function buildData(): SimpleChartSeries[] {
  return [
    { name: 'Email', value: 60 },
    { name: 'Google', value: 120 },
    { name: 'Apple', value: 10 },
    { name: 'Direct', value: 45 },
  ]
}

const data = ref<SimpleChartSeries[]>(buildData())
const isLoading = ref(false)

function reload() {
  isLoading.value = true
  data.value = buildData()
  isLoading.value = false
}
</script>

<template>
  <Card stretch-height title-size="normal">
    <template #title>
      <header class="flex w-full flex-row justify-between items-center pb-5">
        <h3 class="title text-lg">🥧 Pie Chart Demo</h3>
        <n-tooltip placement="top" trigger="hover">
          <template #trigger>
            <n-button quaternary circle>
              <Icon name="fluent:arrow-counterclockwise-32-filled" @click="reload" />
            </n-button>
          </template>
          {{ $t('common.refresh') }}
        </n-tooltip>
      </header>
    </template>
    <div class="pt-2">
      <PieChart :data="data" :loading="isLoading" :height="300" legend-position="right" />
    </div>
  </Card>
</template>
