import { faker } from '@faker-js/faker/locale/en'
import type { Brand, BrandCreateModel } from '../../../app/models/Brand.ts'
import { CreatePagedResponse, times, delay } from '../handler-utilities.ts'
import { registerMockHandler } from '../registry.ts'
const brands = times(17, createFakeBrand)

registerMockHandler('GET', 'brand', async (request: any) => {
  const response = CreatePagedResponse<Brand>(request, brands)
  await delay(1500)
  return response
})

registerMockHandler('POST', 'brand', async (request: any) => {
  const newItem = (await request.json()) as BrandCreateModel
  const brand: Brand = {
    id: faker.number.int({ max: 2000 }).toString(),
    name: newItem.name,
    url: newItem.url,
    image: newItem.image!,
  }
  brands.push(brand)
  return brand
})

registerMockHandler('DELETE', 'brand/:id', (request: any, params: any) => {
  const { id } = params
  const itemIndex = brands.findIndex((x) => x.id === id)
  brands.splice(itemIndex, 1)
  return true
})

function createFakeBrand(): Brand {
  const name = faker.company.name()
  return {
    id: faker.number.int().toString(),
    name,
    image: '',
    url: toKebabCase(name),
  }
}

function toKebabCase(str: string) {
  return str
    .replaceAll(' ', '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
}

