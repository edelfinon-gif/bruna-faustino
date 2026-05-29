import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { 
  ShoppingCart, 
  ArrowRight, 
  Zap, 
  Heart, 
  Leaf, 
  FilterX, 
  Star, 
  CheckCircle2, 
  Instagram,
  Send
} from 'lucide-react';
import { api } from '@/lib/api-client';
import type { Product } from '@shared/types';
import { useFilterStore } from '@/store/useFilterStore';
import { useShallow } from 'zustand/react/shallow';
export function HomePage() {
  // Zustand selectors - Primitives only per law
  const categoryId = useFilterStore((s) => s.categoryId);
  const maxPrice = useFilterStore((s) => s.maxPrice);
  const searchQuery = useFilterStore((s) => s.searchQuery);
  const selectedTags = useFilterStore(useShallow((s) => s.selectedTags));
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
                <Button 
                  size="lg" 
                  className="btn-gradient text-lg h-14 px-8 rounded-full" 
                  onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Ver Cardápio <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg h-14 px-8 rounded-full border-purple-berry text-purple-berry hover:bg-purple-berry/5">
                  Nossa História
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-purple-berry/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-green-vibrant/10 rounded-full blur-3xl" />
      </section>
      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { icon: Leaf, title: "100% Orgânico", desc: "Açaí colhido de forma sustentável e processado sem aditivos químicos." },
              { icon: Zap, title: "Energia Pura", desc: "Rico em antioxidantes e gorduras boas para manter seu foco o dia todo." },
              { icon: Heart, title: "Foco na Saúde", desc: "Opções personalizadas para dietas veganas, proteicas e zero açúcar." }
            ].map((benefit, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-background shadow-sm"
              >
                <div className="h-16 w-16 rounded-2xl bg-green-vibrant/10 flex items-center justify-center text-green-vibrant">
                  <benefit.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Product Showcase */}
      <section id="menu" className="py-16 md:py-24 lg:py-32 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Escolhas do Especialista</h2>
              <p className="text-muted-foreground">
                Explore nossa curadoria de superalimentos feitos para nutrir seu corpo.
              </p>
            </div>
            {(categoryId !== 'all' || selectedTags.length > 0 || searchQuery) && (
              <Button variant="link" onClick={resetFilters} className="text-purple-berry p-0 h-auto font-semibold">
                Limpar todos os filtros
              </Button>
            )}
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-square rounded-2xl" />
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
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <Card className="overflow-hidden h-full group hover:shadow-2xl transition-all duration-500 border-none bg-card shadow-lg flex flex-col">
                    <div className="aspect-[4/5] relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Badge className="absolute top-4 left-4 bg-white/95 text-purple-berry border-none backdrop-blur-sm font-bold shadow-sm">
                        {product.tags[0]?.toUpperCase() || 'NOVO'}
                      </Badge>
                    </div>
                    <CardHeader className="p-5 pb-2">
                      <div className="flex justify-between items-start mb-1">
                        <CardTitle className="text-lg font-bold group-hover:text-purple-berry transition-colors">{product.name}</CardTitle>
                      </div>
                      <CardDescription className="line-clamp-2 text-xs leading-relaxed">
                        {product.description}
                      </CardDescription>
                    </CardHeader>
                    <div className="mt-auto p-5 pt-2 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground line-through opacity-50">R$ {(product.price * 1.2).toFixed(2)}</span>
                        <span className="text-xl font-black text-purple-berry">
                          R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <Button size="icon" className="rounded-full h-11 w-11 btn-gradient shadow-lg">
                        <ShoppingCart className="h-5 w-5" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center glass rounded-3xl">
              <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mb-6">
                <FilterX className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Ops! Nada por aqui.</h3>
              <p className="text-muted-foreground mb-8 max-w-sm">
                Não encontramos produtos que correspondam à sua busca. Que tal tentar uma categoria diferente?
              </p>
              <Button onClick={resetFilters} className="btn-gradient px-8 rounded-full">Resetar Filtros</Button>
            </div>
          )}
        </div>
      </section>
      {/* Testimonials - Static Grid for phase stability */}
      <section className="py-16 md:py-24 bg-purple-berry text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Quem provou, amou</h2>
            <p className="text-purple-berry-foreground/80 max-w-xl mx-auto">
              Veja por que a AçaiBloom é a escolha favorita de quem busca qualidade e sabor.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Ana Silva", text: "O melhor açaí que já comi na vida! A granola é divina.", role: "Atleta" },
              { name: "Lucas Rocha", text: "Os smoothies são perfeitos para o pós-treino. Recomendo muito!", role: "Nutricionista" },
              { name: "Carla Mendes", text: "Entrega super rápida e o produto chega geladinho. Nota 10!", role: "Designer" }
            ].map((t, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                <div className="flex gap-1 mb-4 text-orange-peach">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="italic mb-6 text-lg">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-orange-peach/20 flex items-center justify-center font-bold text-orange-peach">{t.name[0]}</div>
                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-xs text-purple-berry-foreground/60">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Newsletter */}
      <section className="py-16 md:py-24 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-vibrant/10 rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-black text-purple-berry leading-tight">Ganhe 15% OFF na sua primeira compra!</h2>
              <p className="text-lg text-muted-foreground">Cadastre-se para receber novidades, receitas saudáveis e descontos exclusivos.</p>
              <ul className="flex flex-wrap justify-center md:justify-start gap-4">
                <li className="flex items-center gap-2 text-sm font-bold text-purple-berry"><CheckCircle2 className="h-4 w-4" /> Ofertas Semanais</li>
                <li className="flex items-center gap-2 text-sm font-bold text-purple-berry"><CheckCircle2 className="h-4 w-4" /> Novos Sabores</li>
                <li className="flex items-center gap-2 text-sm font-bold text-purple-berry"><CheckCircle2 className="h-4 w-4" /> Dicas Nutricionais</li>
              </ul>
            </div>
            <div className="w-full max-w-md bg-background p-2 rounded-full shadow-xl flex items-center pr-2 border">
              <Input 
                placeholder="Seu melhor e-mail" 
                className="border-none bg-transparent focus-visible:ring-0 text-lg h-14 px-6 flex-1"
              />
              <Button size="icon" className="h-12 w-12 rounded-full btn-gradient">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Instagram Feed Placeholder */}
      <section className="py-16 border-t overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center md:text-left flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center justify-center md:justify-start gap-2">
              <Instagram className="h-6 w-6" /> @acaibloom.oficial
            </h2>
            <p className="text-muted-foreground text-sm">Siga nossa jornada saudável no Instagram</p>
          </div>
          <Button variant="outline" className="rounded-full border-purple-berry text-purple-berry">Ver Perfil</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="aspect-square bg-muted relative group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-purple-berry/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                <Instagram className="text-white h-8 w-8" />
              </div>
              <div className="w-full h-full bg-muted-foreground/10 animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}