import { faker } from '@faker-js/faker/locale/en'
import { registerMockHandler } from '../registry.ts'
import type { OrderList } from '../../../app/models/Order.ts'
import { OrderStatus } from '../../../app/models/Order.ts'
import { CreatePagedResponse, times, delay } from '../handler-utilities.ts'

let orders: OrderList[] | null = null

function getOrders() {
    if (!orders) {
        orders = times(10, () => ({
            id: faker.number.int().toString(),
            status: faker.helpers.enumValue(OrderStatus),
            address: {
                city: {
                    name: faker.location.city(),
                    provinceId: faker.number.int().toString(),
                    id: faker.number.int().toString(),
                },
                province: {
                    name: faker.location.city(),
                    id: faker.number.int().toString(),
                },
                id: faker.number.int().toString(),
                text: faker.location.streetAddress(),
            },
            itemsCount: faker.number.int({ min: 1, max: 25 }),
            createdDate: faker.date.recent(),
            customer: {
                id: faker.number.int().toString(),
                avatar: `/assets/images/user-avatar/${faker.number.int({ min: 1, max: 20 })}.png`,
                name: faker.person.fullName(),
            },
            totalPrice: faker.number.int({ min: 10, max: 2000 }),
        }))
    }
    return orders
}

registerMockHandler('GET', 'order', async (event: any) => {
    const items = getOrders();
    const response = CreatePagedResponse<OrderList>(event, items, 'customer')

    await delay(1500)
    return response
})

registerMockHandler('POST', 'order', async (event: any) => {
    const body = await readBody(event)
    const newOrder = {
        ...body,
        id: faker.number.int().toString(),
        createdDate: new Date(),
        status: OrderStatus.Submitted
    }
    getOrders()?.unshift(newOrder)
    return newOrder
})

registerMockHandler('GET', 'order/:id', async (event: any, params: any) => {
    const { id } = params
    const order = getOrders()?.find(o => o.id === id)

    if (!order) {
        throw createError({ statusCode: 404, message: 'Order not found' })
    }

    return order
})