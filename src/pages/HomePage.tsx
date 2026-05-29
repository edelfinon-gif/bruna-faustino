import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ShoppingCart, ArrowRight, Zap, Heart, Leaf, FilterX } from 'lucide-react';
import { api } from '@/lib/api-client';
import type { Product } from '@shared/types';
import { useFilterStore } from '@/store/useFilterStore';
export function HomePage() {
  const categoryId = useFilterStore((s) => s.categoryId);
  const maxPrice = useFilterStore((s) => s.maxPrice);
  const searchQuery = useFilterStore((s) => s.searchQuery);
  const selectedTags = useFilterStore((s) => s.selectedTags);
  const resetFilters = useFilterStore((s) => s.resetFilters);
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', categoryId],
    queryFn: () => api<Product[]>(`/api/products${categoryId !== 'all' ? `?categoryId=${categoryId}` : ''}`),
  });
  const filteredProducts = products?.filter(p => {
    const matchesPrice = p.price <= maxPrice;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => p.tags.includes(tag));
    return matchesPrice && matchesSearch && matchesTags;
  });
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-16 md:py-24 lg:py-32 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="outline" className="mb-4 border-purple-berry text-purple-berry font-semibold px-4 py-1">
                Natural & Saudável
              </Badge>
              <h1 className="text-display mb-6">
                Desperte sua energia com o <span className="text-gradient">Néctar da Natureza</span>
              </h1>
              <p className="text-body mb-8 max-w-2xl">
                AçaiBloom oferece as melhores taças de açaí, smoothies e lanches nutritivos
                cuidadosamente preparados para elevar seu bem-estar e vitalidade.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="btn-gradient text-lg h-14 px-8" onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}>
                  Ver Cardápio <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg h-14 px-8">
                  Sobre Nós
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-purple-berry/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-green-vibrant/10 rounded-full blur-3xl" />
      </section>
      {/* Showcase Section */}
      <section id="menu" className="py-16 md:py-24 lg:py-32 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossa Seleção Especial</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
              Descubra nossas criações exclusivas feitas com o melhor açaí da Amazônia.
            </p>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-square rounded-xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredProducts && filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Card className="overflow-hidden h-full group hover:shadow-xl transition-all duration-300 border-none bg-card shadow-md">
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                      <Badge className="absolute top-3 left-3 bg-white/90 text-black border-none backdrop-blur-sm">
                        {product.tags[0] || 'Novo'}
                      </Badge>
                    </div>
                    <CardHeader className="p-4 pb-0">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription className="line-clamp-2 text-xs h-8">
                        {product.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-4 flex items-center justify-between">
                      <span className="text-xl font-bold text-purple-berry">
                        R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                      <Button size="sm" variant="secondary" className="rounded-full h-10 w-10 p-0">
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                <FilterX className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">Nenhum produto encontrado</h3>
              <p className="text-muted-foreground mb-6 max-w-xs">
                Não encontramos itens com os filtros selecionados. Tente ajustar sua busca ou categoria.
              </p>
              <Button onClick={resetFilters} variant="outline">Limpar Filtros</Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}