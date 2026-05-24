import type { Customer } from "~/models/Customer"
import { useCustomerService } from "~/services/customer.service"
import type { PagedAndSortedRequest } from "~/models/PagedAndSortedRequest"

export const useCustomers = () => {
    const customerService = useCustomerService()
    const customers = useState<Customer[]>('customer-list', () => [])
    const customerItem = useState<Customer | undefined>('customer-item', () => undefined)
    const isLoading = useState<boolean>('customer-loading', () => false)
    const isSaving = useState<boolean>('customer-saving', () => false)

    async function getCustomers(options: PagedAndSortedRequest) {
        isLoading.value = true
        try {
            const response = await customerService.getList(options)
            customers.value = response.items
            options.pageCount = Math.ceil(response.totalCount! / options.pageSize!)
        } finally {
            isLoading.value = false
        }
    }


    function deleteCustomer(id: number) {

    }

    return {
        customers: readonly(customers),
        customerItem: readonly(customerItem),
        isLoading: readonly(isLoading),
        isSaving: readonly(isSaving),
        getCustomers,
        setCustomerItem: (customer: Customer) => {
            customerItem.value = customer
        },
        deleteCustomer,
    }
}