<script setup lang="ts">
import { type DataTableColumns, NText } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import SkeletonTable from '~/components/shared/SkeletonTable.vue'
import { useAnalyticsDashboard } from '~/composables/useAnalyticsDashboard'

const { isLoadingVisits, visitsStatData } = useAnalyticsDashboard()
const columns: DataTableColumns<RowData> = [
    {
        title: 'Name',
        key: 'name',
        render(row) {
            return h(
                NText,
                {},
                {
                    default: () => row.name,
                },
            )
        },
    },

    {
        title: 'Count',
        key: 'count',
    },
]
</script>

<template>
    <div>
        <SkeletonTable v-if="isLoadingVisits" :columns="columns" />
        <n-data-table v-else-if="visitsStatData?.sources" remote :bordered="false" :columns="columns"
            :data="visitsStatData?.sources" :scroll-x="500" />
    </div>
</template>
