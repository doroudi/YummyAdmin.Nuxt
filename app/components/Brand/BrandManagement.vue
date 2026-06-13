<script setup lang='ts'>
import { type DataTableColumns, NButton, NIcon } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import { useBrands } from '~/composables/useBrands'

const layoutStore = useLayoutStore()
const { dialogPlacement } = storeToRefs(layoutStore)
const { getBrands, deleteBrand, brands, isLoading } = useBrands()
const { renderActionButton, renderDeleteActionButton } = useRender()

const columns: DataTableColumns<RowData> = [
  {
    title: $t('brands.name'),
    key: 'name',
    fixed: 'left',
  },
  {
    title: $t('brands.shortName'),
    key: 'url',
  },
  {
    title: $t('common.actions'),
    key: 'actions',
    width: 110,
    render: (row) => [
      renderActionButton('fluent:edit-32-regular', () => { }),
      renderDeleteActionButton($t('common.deleteConfirm'), () =>
        handleDeleteItem(row),
      ),
    ],
  },
]

onMounted(getItems)
function getItems() {
  getBrands(options.value)
}

const { options } = useOptions()
const showAddDialog = ref(false)

function handleDeleteItem(row: RowData) {
  deleteBrand(row.id)
  getItems()
  useNotification().success({ title: `Brand ${row.name} was deleted!` })
}

function rowKey(row: RowData) {
  return row.id
}

function handlePageChange(page: number) {
  options.value.page = page
  getItems()
}

function createBrand() {
  showAddDialog.value = true
}
</script>

<template>
  <n-layout>
    <n-layout-content>
      <n-space justify="space-between" class="mb-3">
        <SearchInput v-model="options.query" @search="getItems" />
        <NButton type="primary" @click="createBrand">
          <template #icon>
            <Icon name="fluent:add-20-regular" />
          </template>
          {{ $t('common.new') }}
        </NButton>
      </n-space>

      <SkeletonTable v-if="isLoading" :columns="columns" />
      <n-data-table v-else remote :columns="columns" :data="brands" :pagination="options" :row-key="rowKey"
         @update:filters="getItems" @update:page="handlePageChange" />
    </n-layout-content>

    <n-drawer v-model:show="showAddDialog" :width="380" :placement="dialogPlacement">
      <n-drawer-content closable title="Create Brand">
        <CreateBrand @close="showAddDialog = false" />
      </n-drawer-content>
    </n-drawer>
  </n-layout>
</template>
