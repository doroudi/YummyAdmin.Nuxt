<script setup lang="ts">
import { useAnalyticsDashboard } from '~/composables/useAnalyticsDashboard';

const { getGenderStat, usersGenderData } = useAnalyticsDashboard()
onMounted(getGenderStat)
</script>

<template>
  <Card class="p-2" :title="$t('dashboard.genderChart.title')">
    <PolarChart show-legend legend-position="right" height="250" :colors="['#2986cc', '#c90076', '#CCC',]"
      :data="usersGenderData" />
  </Card>
</template>