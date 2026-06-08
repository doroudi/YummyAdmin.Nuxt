<script setup lang="ts">
import { type DataTableColumns, NText } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import SkeletonTable from '~/components/shared/SkeletonTable.vue'
import { useAnalyticsDashboard } from '~/composables/useAnalyticsDashboard'
const { isLoadingVisits, visitsStatData, getVisitsStat } = useAnalyticsDashboard()

onMounted(getVisitsStat)

const columns: DataTableColumns<RowData> = [
    {
        title: 'Url',
        key: 'url',
        render(row) {
            return h(
                NText,
                {},
                {
                    default: () => row.url,
                },
            )
        },
    },

    {
        title: 'Count',
        key: 'count',
        // render: (row) => renderPrice(row.price, t('currencySign')),
    },
]
</script>

<template>
    <div>
        <SkeletonTable v-if="isLoadingVisits" :columns="columns" />
        <n-data-table v-else-if="visitsStatData?.pages" remote :bordered="false" :columns="columns" :data="visitsStatData?.pages" :scroll-x="500" />
    </div>
</template>
