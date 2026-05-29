import { Category, Product } from './types';
export const MOCK_CATEGORIES: Category[] = [
  { id: 'cat1', name: 'Taças de Açaí', slug: 'tacas' },
  { id: 'cat2', name: 'Smoothies', slug: 'smoothies' },
  { id: 'cat3', name: 'Lanches Fit', slug: 'lanches' },
  { id: 'cat4', name: 'Bebidas Energéticas', slug: 'bebidas' },
];
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Açaí Bowl Premium',
    description: 'Açaí orgânico batido com banana, servido com granola artesanal e mel silvestre.',
    price: 28.50,
    categoryId: 'cat1',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=600&auto=format&fit=crop',
    tags: ['vegano', 'clássico'],
    calories: 450,
    isAvailable: true
  },
  {
    id: 'p2',
    name: 'Smoothie Roxão',
    description: 'Bebida cremosa de açaí, morango e leite de amêndoas.',
    price: 18.00,
    categoryId: 'cat2',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=600&auto=format&fit=crop',
    tags: ['proteico', 'vegano'],
    calories: 280,
    isAvailable: true
  },
  {
    id: 'p3',
    name: 'Tapioca de Frango & Ricota',
    description: 'Massa leve com recheio proteico de frango desfiado e ricota temperada.',
    price: 22.00,
    categoryId: 'cat3',
    image: 'https://images.unsplash.com/photo-1628557044797-f21a177c37ec?q=80&w=600&auto=format&fit=crop',
    tags: ['proteico', 'sem-glúten'],
    calories: 320,
    isAvailable: true
  },
  {
    id: 'p4',
    name: 'Suco Verde Bloom',
    description: 'Mix detox de couve, maçã, gengibre e limão.',
    price: 14.50,
    categoryId: 'cat4',
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?q=80&w=600&auto=format&fit=crop',
    tags: ['detox', 'vegano'],
    calories: 90,
    isAvailable: true
  },
  {
    id: 'p5',
    name: 'Bowl Proteico',
    description: 'Açaí batido com Whey Protein isolado, pasta de amendoim e nibs de cacau.',
    price: 34.00,
    categoryId: 'cat1',
    image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?q=80&w=600&auto=format&fit=crop',
    tags: ['proteico', 'zero-açúcar'],
    calories: 580,
    isAvailable: true
  },
];