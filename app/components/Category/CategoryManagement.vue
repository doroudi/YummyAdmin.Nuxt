<script setup lang='ts'>
import { type DataTableColumns, NButton } from 'naive-ui/es/components'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import { useCategories } from '~/composables/useCategories'
const { deleteCategory, getCategories, isLoading, categories } = useCategories()
const { renderDeleteActionButton, renderActionButton } = useRender()
const layoutStore = useLayoutStore()
const { dialogPlacement } = storeToRefs(layoutStore)
const collapsed = ref(useWindowSize().width.value < 600)

onMounted(getItems)

const columns: DataTableColumns<RowData> = [
  {
    title: $t('category.name'),
    key: 'name',
    fixed: 'left',
  },
  {
    title: $t('category.productsCount'),
    key: 'productsCount',
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
const { options } = useOptions()
const showAddDialog = ref(false)

function handleDeleteItem(row: RowData) {
  deleteCategory(row.id)
  useNotification().success({ title: $t('common.deletedMessage') })
}

function rowKey(row: RowData) {
  return row.id
}
function getItems() {
  getCategories(options.value)
}

function handlePageChange(page: number) {
  options.value.page = page
  getItems()
}

function handleSorterChange() {
  getItems()
}

function handleFiltersChange() {
  getItems()
}

function createCategory() {
  showAddDialog.value = true
}
</script>

<template>
  <n-layout has-sider sider-placement="right">
    <n-layout-content>
      <div class="px-3">
        <n-space justify="space-between" class="mb-3">
          <SearchInput v-model="options.query" @search="getItems" />
          <NButton type="primary" @click="createCategory">
            <template #icon>
              <Icon name="fluent:add-20-regular" />
            </template>
            {{ $t('common.new') }}
          </NButton>
        </n-space>
        <SkeletonTable v-if="isLoading" :columns="columns" />
        <n-data-table v-else remote :columns="columns" :data="categories" :pagination="options" :row-key="rowKey"
          @update:sorter="handleSorterChange" @update:filters="handleFiltersChange" @update:page="handlePageChange" />
      </div>
    </n-layout-content>
    <n-layout-sider bordered collapse-mode="width" :collapsed-width="0" :width="300" :collapsed="collapsed"
      @collapse="collapsed = true" @expand="collapsed = false">
      <CategoryStatics />
    </n-layout-sider>

    <n-drawer v-model:show="showAddDialog" :width="380" :placement="dialogPlacement">
      <n-drawer-content class="rtl" closable :title="$t('categories.create.title')">
        <CreateCategory @close="showAddDialog = false" />
      </n-drawer-content>
    </n-drawer>
  </n-layout>
</template>

<style scoped lang='scss'></style>
