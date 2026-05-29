import { Hono } from "hono";
import type { Env } from './core-utils';
import { CategoryEntity, ProductEntity } from "./entities";
import { ok, bad, notFound } from './core-utils';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // CATEGORIES
  app.get('/api/categories', async (c) => {
    await CategoryEntity.ensureSeed(c.env);
    const result = await CategoryEntity.list(c.env);
    return ok(c, result.items);
  });
  // PRODUCTS
  app.get('/api/products', async (c) => {
    await ProductEntity.ensureSeed(c.env);
    const categoryId = c.req.query('categoryId');
    const products = await ProductEntity.listByFilters(c.env, categoryId);
    return ok(c, products);
  });
  app.get('/api/products/:id', async (c) => {
    const product = new ProductEntity(c.env, c.req.param('id'));
    if (!await product.exists()) return notFound(c, 'Product not found');
    return ok(c, await product.getState());
  });
}