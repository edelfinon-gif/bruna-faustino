export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export interface Category {
  id: string;
  name: string;
  slug: string;
}
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  image: string;
  tags: string[]; // e.g., 'vegano', 'proteico', 'sem-açúcar'
  calories: number;
  isAvailable: boolean;
}