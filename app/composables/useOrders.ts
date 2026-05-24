import { OrderStatus, type Order, type OrderList } from '~/models/Order'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import { useOrderService } from '~/services/order.service'

export function useOrders() {
  const orderService = useOrderService()
  const orders = ref<OrderList[]>([])
  const isLoading = ref(false)
  const isSaving = ref(false)

  async function getOrders(options: PagedAndSortedRequest) {
    isLoading.value = true
    try {
      const response = await orderService.getOrderList(options)
      orders.value = response.items
      options.pageCount = Math.ceil(response.totalCount! / options.pageSize!)
    } finally {
      isLoading.value = false
    }
  }

  async function getRecentOrders(pageSize = 5) {
    isLoading.value = true
    try {
      const response = await orderService.getOrderList({
        page: 1,
        pageSize,
      })
      orders.value = response.items
    } finally {
      isLoading.value = false
    }
  }

  async function getOrderDetail(order: Order) {
    return await orderService.getOrder(order.id)
  }

  async function deleteItem(id: number) {
    const itemIndex = orders.value.findIndex((x: any) => x.id === id)
    if (itemIndex) orders.value.splice(itemIndex, 1)
  }

  function getStatusColor(status: OrderStatus) {
    switch (status) {
      case OrderStatus.Submitted:
        return 'info'
      case OrderStatus.Processing:
        return 'success'
      case OrderStatus.ReadyToSend:
        return 'warning'
      case OrderStatus.Sent:
        return 'success'
      case OrderStatus.Delivered:
        return 'success'
    }
  }

  return {
    orders,
    getOrders,
    getOrderDetail,
    isSaving,
    isLoading,
    getRecentOrders,
    deleteItem,
    getStatusColor
  }
  
}
