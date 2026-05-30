import type { Customer } from '~/models/Customer'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import type { PaginatedList } from '~/models/PagedListResult'
import { useGenericService } from './generic.service'

export const useCustomerService = () => {
  const base = useGenericService<Customer, string>('customer')
  const api = useApi('customer')

  async function getList(
    options: PagedAndSortedRequest,
  ): Promise<PaginatedList<Customer>> {
    const response = await api.getPaginated<Customer>('', options)
    return response
  }

  return {
    ...base,
    getList,
  }
}
