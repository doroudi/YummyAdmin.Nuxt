import { faker } from '@faker-js/faker/locale/en'
import { CreatePagedResponse, times, delay } from '../handler-utilities.ts'
import type { Color, ColorCreateModel } from '../../../app/models/Color.ts'
import { registerMockHandler } from '../registry.ts'

const colors = times(15, createFakeColor)

registerMockHandler('GET', 'color', async (request) => {
  const response = CreatePagedResponse<Color>(request, colors)
  await delay(1000)
  return response
})

registerMockHandler('POST', 'color', async (request) => {
  const newItem = (await request.json()) as ColorCreateModel
  const color: Color = {
    id: faker.number.int({ max: 2000 }).toString(),
    name: newItem.name,
    color: newItem.color,
  }
  colors.unshift(color)
  return color
})

registerMockHandler('DELETE', 'color/:id', ({ params }) => {
  const { id } = params
  const itemIndex = colors.findIndex((x) => x.id === id)
  colors.splice(itemIndex, 1)
  return true
})

function createFakeColor(): Color {
  const colors = [
    'Red',
    'Green',
    'Blue',
    'Orange',
    'Lime',
    'Cyan',
    'Purple',
    'Gold',
    'Grey',
    'Black',
    'White',
    'Pink',
    'AliceBlue',
    'Lavender',
    'Yellow',
    'Bisque',
    'Azure',
    'Coral',
    'Brown',
    'Crimson',
    'DarkGoldenRod',
    'DarkGreen',
    'DarkGrey',
    'DarkKhaki',
    'DarkSlateBlue',
    'DarkSeaGreen',
    'DodgerBlue',
    'ForestGreen',
    'FireBrick',
    'FloralWhite',
    'Gainsboro',
    'GreenYellow',
    'HotPink',
    'LightCoral',
    'Fuchsia',
    'indigo',
    'tan',
    'turquoise',
    'teal',
    'silver',
  ]
  const color = faker.helpers.arrayElement(colors)
  return {
    id: faker.number.int().toString(),
    name: color,
    color,
  }
}
