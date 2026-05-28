<script setup lang="ts">
import { useCategories } from '~/composables/useCategories'
const { getCategoryStats, isLoadingStats, categoryStats } = useCategories()

getCategoryStats()
</script>

<template>
  <div>
    <h2 class="card-title px-2 pb-4">
      {{ $t('categories.stat') }}
    </h2>

    <SummaryStatCard class="w-full" v-if="!isLoadingStats" :data="categoryStats.summaryStats" :loading="isLoadingStats"
      :title="$t('categories.stat')" icon="fluent:data-trending-16-regular" />

    <h2 class="card-title px-2 py-4">
      {{ $t('categories.topCategories') }}
    </h2>

    <DonutChart v-if="categoryStats.productsByCategoryStat" :height="300" :loading="isLoadingStats"
      :data="categoryStats.productsByCategoryStat" show-legend />
  </div>
</template>

<style lang="scss" scoped>
.card-title {
  font-size: 1rem;
}
</style>
