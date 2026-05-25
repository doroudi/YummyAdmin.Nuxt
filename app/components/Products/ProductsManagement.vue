<script setup lang='ts'>
import { ProductStatus } from '~/models/Product'
import { useProducts } from '~/composables/useProducts'
import YummyDataTable from '../shared/YummyDataTable.vue'
import { NSwitch, type DataTableColumns, type DataTableRowKey, type DataTableSortState } from 'naive-ui'
import type { FilterOptionValue, RowData } from 'naive-ui/es/data-table/src/interface'
const { enumToFilter } = useFilter()
const { getProducts, deleteProduct, deleteMultipleProducts, isLoading, products } = useProducts()

const router = useRouter()
const { renderDeleteActionButton } = useRender()
const { options, bindOptionsToDataTable, filterApplied, resetFilters } = useOptions()
const { renderPrice, renderRate, renderTag, renderProductImage, renderText, renderIcon } = useRender()

const columns: DataTableColumns<RowData> = [
  {
    type: 'selection',
    fixed: 'left',
  },
  {
    title: $t('products.name'),
    key: 'name',
    render: (row) => renderProductImage(row.image, row.name),
  },
  {
    title: $t('products.category'),
    key: 'category',
    render: (row) => renderText(row.category.name)
    
  },
  {
    title: $t('products.rate'),
    key: 'rate',
    sorter: true,
    render: (row) => renderRate(row.rate)
  },
  {
    title: $t('common.price'),
    key: 'price',
    sorter: true,
    render: (row) => renderPrice(row.price, $t('currencySign')),
  },
  {
    title: $t('common.status'),
    key: 'status',
    filter: true,
    filterOptionValues: [],
    filterOptions: enumToFilter(ProductStatus, 'ProductStatus'),
    render: (row) =>
      renderTag(
        row.status,
        getStatusColor(row.status),
        ProductStatus,
        'ProductStatus',
      ),
  },
  {
    title: $t('products.stoke'),
    key: 'stock',
    render: (row) => h(NSwitch, { value: row.stock, size: 'small' }, {}),
  },
  {
    title: $t('common.actions'),
    key: 'actions',
    width: 110,
    render: (row) => [
      renderDeleteActionButton($t('common.deleteConfirm'), () =>
        handleDeleteItem(row),
      ),
    ],
  },
]

onMounted(() => {
  bindOptionsToDataTable(columns)
  getItems()
})

const show = ref(false)
function getStatusColor(status: ProductStatus) {
  switch (status) {
    case ProductStatus.Draft:
      return 'info'
    case ProductStatus.Active:
      return 'success'
    case ProductStatus.NotActive:
      return 'warning'
  }
}

async function handleDeleteItem(row: RowData) {
  await deleteProduct(row.id)
  useNotification().success({ title: $t('products.deleteMessage') })
}

function rowKey(row: RowData) {
  return row.id
}
function getItems() {
  getProducts(options.value)
}

const checkedRows = ref<DataTableRowKey[]>([])
async function handleDeleteSelected() {
  await deleteMultipleProducts(checkedRows.value.map((id) => id.toString()))
  useNotification().success({ title: $t('products.deleteMessage') })

  checkedRows.value = []
}

function handleSorterChange(sorter: DataTableSortState) {
  options.value.sortBy = sorter.columnKey.toString()

  // if (sorter.order === 'descend')
  //   options.value.sortDesc = 'true'

  bindOptionsToDataTable(columns)
  getItems()
}

function handleFiltersChange(filterValues: FilterOptionValue[] | null) {
  options.value = { ...options.value, ...filterValues }
  bindOptionsToDataTable(columns)
  getItems()
}

function resetFilter() {
  resetFilters()
  bindOptionsToDataTable(columns)
  getItems()
}

function fetchProducts(options: any) {
  getProducts(options)
}

</script>

<template>
  <n-layout>
    <n-layout-content>
      <div class="px-3">
        <YummyDataTable reload-on-mount :columns="columns" :rows="products" :row-key="(row: any) => row.id"
          :data="products" :loading="isLoading" :fetch="(opt: any) => fetchProducts(opt)"
          v-model:checkedRowKeys="checkedRows">
          <template #toolbar="{ filterApplied, resetFilters }">
            <!-- <n-button :disabled="!filterApplied" @click="resetFilters()">Reset</n-button>
            <n-button :disabled="!checkedRows.length" @click="deleteSelected()">Delete</n-button> -->

            <NSpace justify="space-between" class="mb-3">
              <div>
                <SearchInput v-model="options.query" @search="getItems" />
                <NButton v-if="filterApplied" @click="resetFilters()" secondary type="primary" class="ms-2">
                  <template #icon>
                    <Icon name="fluent:filter-dismiss-24-regular" />
                  </template>
                  {{ $t('common.clearFilter') }}
                </NButton>
              </div>
              <div>
                <DeleteSelectedItems v-if="checkedRows.length" @delete="handleDeleteSelected" />

                <NButton type="primary" @click="router.push('/Products/Create')">
                  <template #icon>
                    <Icon name="fluent:add-24-filled" />
                  </template>
                  {{ $t('common.new') }}
                </NButton>
              </div>
            </NSpace>
          </template>

          <template #empty>
            No products found.
          </template>
        </YummyDataTable>
      </div>
    </n-layout-content>
  </n-layout>
</template>

