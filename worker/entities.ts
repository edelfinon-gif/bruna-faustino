import { IndexedEntity } from "./core-utils";
import type { Category, Product } from "@shared/types";
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from "@shared/mock-data";
export class CategoryEntity extends IndexedEntity<Category> {
  static readonly entityName = "category";
  static readonly indexName = "categories";
  static readonly initialState: Category = { id: "", name: "", slug: "" };
  static seedData = MOCK_CATEGORIES;
}
export class ProductEntity extends IndexedEntity<Product> {
  static readonly entityName = "product";
  static readonly indexName = "products";
  static readonly initialState: Product = {
    id: "",
    name: "",
    description: "",
    price: 0,
    categoryId: "",
    image: "",
    tags: [],
    calories: 0,
    isAvailable: true
  };
  static seedData = MOCK_PRODUCTS;
  static async listByFilters(env: any, categoryId?: string): Promise<Product[]> {
    const { items } = await this.list(env, null, 100);
    if (!categoryId || categoryId === 'all') return items;
    return items.filter(p => p.categoryId === categoryId);
  }
}