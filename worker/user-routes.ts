import { Hono } from "hono";
import type { Env } from './core-utils';
import { CategoryEntity, ProductEntity } from "./entities";
import { ok, notFound } from './core-utils';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // CATEGORIES
  app.get('/api/categories', async (c) => {
    try {
      await CategoryEntity.ensureSeed(c.env);
      const result = await CategoryEntity.list(c.env);
      return ok(c, result.items);
    } catch (error) {
      console.error('[API CATEGORIES] Error:', error);
      return ok(c, []); // Fallback to empty instead of 500
    }
  });
  // PRODUCTS
  app.get('/api/products', async (c) => {
    try {
      await ProductEntity.ensureSeed(c.env);
      const categoryId = c.req.query('categoryId');
      const products = await ProductEntity.listByFilters(c.env, categoryId);
      return ok(c, products);
    } catch (error) {
      console.error('[API PRODUCTS] Error:', error);
      return ok(c, []); // Fallback to empty instead of 500
    }
  });
  app.get('/api/products/:id', async (c) => {
    const id = c.req.param('id');
    const product = new ProductEntity(c.env, id);
    if (!await product.exists()) return notFound(c, 'Product not found');
    return ok(c, await product.getState());
  });
}