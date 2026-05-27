import { faker } from '@faker-js/faker/locale/en'
import type { Profile, ProfileSettings } from '../../../app/models/Profile.ts'
import { registerMockHandler } from '../registry.ts'

registerMockHandler('GET', 'profile/user-profile', () => {
  const response = createFakeProfile()
  return response
})

registerMockHandler('GET', 'profile/user-settings', () => {
  const response: ProfileSettings = {
    notifications: [
      { type: 'newOrder', email: true, push: false, sms: false },
      { type: 'newRegister', email: false, push: false, sms: false },
      { type: 'newMessage', email: true, push: false, sms: false },
      { type: 'outOfStock', email: true, push: true, sms: true },
    ],
  }

  return response
})

function createFakeProfile(): Profile {
  return {
    id: 1,
    username: faker.internet.username(),
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    role: 'Administrator',
    avatar: `/assets/images/user-avatar/${faker.number.int({
      min: 1,
      max: 20,
    })}.png`,
    phone: faker.phone.number({ style: 'national' }),
    socials: [
      { name: 'facebook', url: faker.internet.url() },
      { name: 'telegram', url: faker.internet.url() },
      { name: 'instagram', url: faker.internet.url() },
      { name: 'x', url: faker.internet.url() },
    ],
    bio: faker.lorem.paragraph(),
    location: faker.location.city(),
    address: {
      country: faker.location.country(),
      city: faker.location.city(),
      postalCode: faker.location.zipCode(),
    },
  }
}
