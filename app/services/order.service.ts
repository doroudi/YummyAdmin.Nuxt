import type { Order, OrderList } from '~/models/Order'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import type { PaginatedList } from '~/models/PagedListResult'
import { useGenericService } from './generic.service'

export const useOrderService = () => {
  const base = useGenericService<Order, string>('order')

  async function getOrderList(
    options: PagedAndSortedRequest,
  ): Promise<PaginatedList<OrderList>> {
    const response = await useApi('order').getPaginated<OrderList>('', options)
    return response
  }

  async function getOrder(id: string): Promise<Order> {
    const response = await useApi('order').get<Order>(id)
    return response
  }

  async function deleteOrder(id: string): Promise<boolean> {
    return await useApi('order').delete<boolean>(id)
  }

  return {
    ...base,
    getOrderList,
    getOrder,
    deleteOrder,
  }
}