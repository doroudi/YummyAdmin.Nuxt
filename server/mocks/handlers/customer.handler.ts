import { faker } from '@faker-js/faker/locale/en'
import type { Customer, CustomerCreateModel } from '../../../app/models/Customer.ts'
import { CreatePagedResponse, times } from '../handler-utilities.ts'
import { registerMockHandler } from '../registry.ts'

const customers = times(65, createFakeCustomer)

registerMockHandler('GET', 'customer', (request: any) => {
  const response = CreatePagedResponse<Customer>(
    request,
    customers,
    'firstName',
  )
  return response
})

registerMockHandler('POST', 'customer', async (request: any) => {
  const newItem = (await request.json()) as CustomerCreateModel
  const customer: CustomerCreateModel = {
    id: faker.number.int({ max: 2000 }).toString(),
    firstName: newItem.firstName,
    lastName: newItem.lastName,
    address: [],
    mobile: newItem.mobile,
    joinDate: new Date(),
    birthDate: newItem.birthDate,
    email: newItem.email,
  }
  customers.push(customer)
  return customer
})

registerMockHandler('DELETE', 'customer/:id', (event: any, params: any) => {
  const { id } = params
  const itemIndex = customers.findIndex((x) => x.id === id)
  customers.splice(itemIndex, 1)
  return true
})

function createFakeCustomer(): Customer {
  return {
    id: faker.number.int().toString(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: [],
    mobile: faker.phone.number({ style: 'international' }),
    joinDate: faker.date.past(),
    birthDate: faker.date.birthdate(),
    email: faker.internet.email(),
    avatar: `/assets/images/user-avatar/${faker.number.int({
      min: 1,
      max: 20,
    })}.png`,
    emailConfirmed: faker.datatype.boolean({ probability: 0.8 }),
    phoneConfirmed: faker.datatype.boolean({ probability: 0.8 }),
    points: faker.number.int({ min: 0, max: 250 }),
    ordersCount: faker.number.int({ max: 14 }),
    userGroup: 'General',
    walletBalance: faker.number.int({ max: 150000 }),
  }
}