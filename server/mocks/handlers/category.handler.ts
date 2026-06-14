import { faker } from "@faker-js/faker/locale/en";
import type {
  Category,
  CategoryCreateModel,
} from "../../../app/models/Category.ts";
import {
  CreateListResponse,
  CreatePagedResponse,
  times,
  delay,
} from "../handler-utilities.ts";
import { registerMockHandler } from '../registry'

const categories = times(20, createFakeCategory);
registerMockHandler("GET", "category", async (request: any) => {
  const response = CreatePagedResponse<Category>(request, categories);
  await delay(800);
  return response
});

registerMockHandler("GET", "category/all", async (request: any) => {
  const response = CreateListResponse<Category>(request, categories);
  await delay(500);
  return response
});

registerMockHandler("GET", "category/stats", () => {
  const response = {
    summaryStats: {
      count: categories.length,
    },
    productsByCategoryStat: categories
      .sort((a, b) => b.productsCount - a.productsCount)
      .slice(0, 5)
      .map((cat) => ({
        name: cat.name,
        value: cat.productsCount,
      })),
  };
  return response
});

registerMockHandler("POST", "category", async (request: any) => {
  const newItem = (await request.json()) as CategoryCreateModel;
  const category: Category = {
    id: faker.number.int({ max: 2000 }),
    name: newItem.name,
    productsCount: 0,
    children: [],
  };
  categories.unshift(category);
  return category
});

registerMockHandler("DELETE", "category/:id", (request: any, params: any) => {
  const { id } = params ?? "1";
  const itemIndex = categories.findIndex(
    (x) => x.id === Number.parseInt(id?.toString() ?? "1", 10),
  );
  categories.splice(itemIndex, 1);
  return true
});

function createFakeCategory(): Category {
  return {
    id: faker.number.int(),
    name: faker.commerce.productAdjective(),
    productsCount: faker.number.int({ min: 1, max: 130 }),
    children: [
      {
        id: faker.number.int(),
        name: faker.commerce.productAdjective(),
        productsCount: faker.number.int({ min: 1, max: 130 }),
      },
      {
        id: faker.number.int(),
        name: faker.commerce.productAdjective(),
        productsCount: faker.number.int({ min: 1, max: 130 }),
        children: [
          {
            id: faker.number.int(),
            name: faker.commerce.productAdjective(),
            productsCount: faker.number.int({ min: 1, max: 130 }),
          },
        ],
      },
    ],
  };
}
