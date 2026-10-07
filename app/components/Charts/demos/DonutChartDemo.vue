<script lang="ts" setup>
import type { SimpleChartSeries } from '~/models/ChartData'

// Demo data - swap for a service call the way the other chart demos do.
function buildData(): SimpleChartSeries[] {
  return [
    { name: 'Desktop', value: 4321 },
    { name: 'Mobile', value: 5001 },
    { name: 'Tablet', value: 1112 },
    { name: 'Unknown', value: 880 },
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
        <h3 class="title text-lg">🍩 Donut Chart Demo</h3>
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
      <DonutChart :data="data" :loading="isLoading" :height="300" />
    </div>
  </Card>
</template>
