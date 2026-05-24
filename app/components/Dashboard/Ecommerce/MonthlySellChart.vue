<script setup lang="ts">
import { useDashboard } from '~/composables/useDashboard';

const { monthlySellStat, isLoadingMonthlyStat, getMonthlySellStat } = useDashboard()
const colors = ['var(--primary-color)', 'var(--primary-color-shade1)']
onMounted(getMonthlySellStat)
</script>

<template>
  <div class="p-2">
    <Card stretch-height title-size="normal" :title="'📈 ' + $t('dashboard.monthlySell')">
      <div class="pt-5">
        <BarChart :loading="isLoadingMonthlyStat" :height="300" :data="monthlySellStat" :colors="colors" />
      </div>
    </Card>
  </div>
</template>