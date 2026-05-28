import { faker } from '@faker-js/faker/locale/en'
import type { Review } from '../../../app/models/Review.ts'
import { CreatePagedResponse, times, delay } from '../handler-utilities.ts'
import { registerMockHandler } from '../registry.ts'

const reviews = times(65, createFakeReview)

registerMockHandler('GET', 'review', async (request: any) => {
  const response = CreatePagedResponse<Review>(request, reviews)
  await delay(1000)
  return response
})

function createFakeReview(): Review {
  return {
    id: faker.number.int().toString(),
    date: faker.date.past(),
    rate: faker.number.float({ min: 1, max: 5 }),
    product: {
      name: faker.commerce.productName(),
      id: faker.number.int().toString(),
    },
    comment: {
      id: faker.number.int().toString(),
      message: faker.commerce.productAdjective(),
    },
    customer: {
      id: faker.number.int().toString(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      address: [],
      mobile: faker.phone.number(),
      joinDate: faker.date.past(),
      birthDate: faker.date.birthdate(),
      email: faker.internet.email(),
      ordersCount: faker.number.int({ max: 50 }),
    },
  }
}

