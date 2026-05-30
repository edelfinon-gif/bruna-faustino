import React, { useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
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
  Send,
  Droplets,
  MessageCircle,
  PackageOpen,
  Info
} from 'lucide-react';
import { api } from '@/lib/api-client';
import type { Product } from '@shared/types';
import { useFilterStore, checkIsFilterActive } from '@/store/useFilterStore';
export function HomePage() {
  const categoryId = useFilterStore((s) => s.categoryId);
  const maxPrice = useFilterStore((s) => s.maxPrice);
  const searchQuery = useFilterStore((s) => s.searchQuery);
  const selectedTags = useFilterStore((s) => s.selectedTags);
  const resetFilters = useFilterStore((s) => s.resetFilters);
  const hasActiveFilters = useFilterStore(checkIsFilterActive);
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  }, []);
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', categoryId],
    queryFn: () => api<Product[]>(`/api/products${categoryId !== 'all' ? `?categoryId=${categoryId}` : ''}`),
    staleTime: 1000 * 60 * 5,
  });
  const filteredProducts = useMemo(() => {
    const list = products ?? [];
    return list.filter(p => {
      const matchesPrice = p.price <= maxPrice;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => p.tags.includes(tag));
      return matchesPrice && matchesSearch && matchesTags;
    });
  }, [products, maxPrice, searchQuery, selectedTags]);
  const testimonials = [
    { name: "Ana Silva", text: "O melhor açaí que já comi na vida! A granola é divina e super crocante.", role: "Atleta Profissional" },
    { name: "Lucas Rocha", text: "Os smoothies são perfeitos para o pós-treino. Cremosos e nutritivos!", role: "Nutricionista" },
    { name: "Carla Mendes", text: "Entrega super rápida e o produto chega geladinho. Experiência nota 10!", role: "UX Designer" },
    { name: "Bruno Faustino", text: "Qualidade impecável. Dá pra sentir o frescor das frutas em cada colherada.", role: "Empresário" },
    { name: "Mariana Costa", text: "A taça proteica salvou meu lanche da tarde. Saborosa e mata a fome!", role: "Crossfitter" }
  ];
  const instaPosts = [
    { url: "https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=400&auto=format&fit=crop", likes: "1.2k", comments: "45" },
    { url: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=400&auto=format&fit=crop", likes: "892", comments: "32" },
    { url: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?q=80&w=400&auto=format&fit=crop", likes: "2.5k", comments: "128" },
    { url: "https://images.unsplash.com/photo-1577805947697-89e18249d767?q=80&w=400&auto=format&fit=crop", likes: "1.5k", comments: "67" },
    { url: "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?q=80&w=400&auto=format&fit=crop", likes: "654", comments: "21" },
    { url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400&auto=format&fit=crop", likes: "3.1k", comments: "204" }
  ];
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-16 md:py-24 lg:py-32 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Badge variant="outline" className="mb-4 border-purple-berry text-purple-berry font-semibold px-4 py-1 animate-pulse">
                Premium & Natural
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
                  className="btn-gradient text-lg h-14 px-8 rounded-full hover:scale-105 active:scale-95 transition-transform"
                  onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Ver Cardápio <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg h-14 px-8 rounded-full border-purple-berry text-purple-berry hover:bg-purple-berry/5 transition-all"
                  onClick={() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Nossa História
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Floating Decorative Elements */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-[15%] text-green-vibrant/20 hidden lg:block pointer-events-none"
        >
          <Leaf size={120} />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-[10%] text-purple-berry/10 hidden lg:block pointer-events-none"
        >
          <Droplets size={160} />
        </motion.div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-purple-berry/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-green-vibrant/10 rounded-full blur-3xl" />
      </section>
      {/* Benefits Section */}
      <section id="benefits" className="py-16 md:py-24 bg-muted/30 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { icon: Leaf, title: "100% Orgânico", desc: "Açaí colhido de forma sustentável e processado sem aditivos químicos." },
              { icon: Zap, title: "Energia Pura", desc: "Rico em antioxidantes e gorduras boas para manter seu foco o dia todo." },
              { icon: Heart, title: "Foco na Saúde", desc: "Opções personalizadas para dietas veganas, proteicas e zero açúcar." }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center space-y-4 p-8 rounded-3xl bg-background shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="h-16 w-16 rounded-2xl bg-green-vibrant/10 flex items-center justify-center text-green-vibrant group-hover:rotate-6 transition-transform">
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
      <section id="menu" className="py-16 md:py-24 lg:py-32 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Escolhas do Especialista</h2>
              <p className="text-muted-foreground">
                Explore nossa curadoria de superalimentos feitos para nutrir seu corpo com o melhor que a terra oferece.
              </p>
            </div>
            {hasActiveFilters && (
              <Button
                variant="link"
                onClick={resetFilters}
                className="text-purple-berry p-0 h-auto font-bold uppercase tracking-wider text-xs hover:no-underline"
              >
                Limpar filtros
              </Button>
            )}
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[4/5] rounded-2xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <Card className="overflow-hidden h-full group hover:shadow-2xl hover:shadow-purple-berry/10 transition-all duration-500 border-none bg-card shadow-lg flex flex-col">
                    <div className="aspect-[4/5] relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Badge className="absolute top-4 left-4 bg-white/95 text-purple-berry border-none backdrop-blur-sm font-bold shadow-sm">
                        {product.tags[0]?.toUpperCase() || 'PREMIUM'}
                      </Badge>
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center text-purple-berry shadow-lg cursor-help">
                                <Info size={16} />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs font-bold">{product.calories} kcal</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    <CardHeader className="p-5 pb-2 flex-1">
                      <CardTitle className="text-lg font-bold group-hover:text-purple-berry transition-colors">{product.name}</CardTitle>
                      <CardDescription className="line-clamp-2 text-xs leading-relaxed mt-2">
                        {product.description}
                      </CardDescription>
                    </CardHeader>
                    <div className="mt-auto p-5 pt-2 flex items-center justify-between border-t border-border/50">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground line-through opacity-50">R$ {(product.price * 1.2).toFixed(2)}</span>
                        <span className="text-xl font-black text-purple-berry">
                          R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <Button size="icon" className="rounded-full h-11 w-11 btn-gradient shadow-lg hover:scale-110 active:scale-90 transition-transform">
                        <ShoppingCart className="h-5 w-5" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center glass rounded-[2rem] border-dashed border-2 border-muted-foreground/20">
              <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mb-6">
                <FilterX className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Nada por aqui.</h3>
              <p className="text-muted-foreground mb-8 max-w-sm">
                Tente ajustar seus filtros para encontrar o que procura.
              </p>
              <Button onClick={resetFilters} className="btn-gradient px-8 rounded-full h-12">Resetar Filtros</Button>
            </div>
          )}
        </div>
      </section>
      {/* Premium Testimonials Swiper */}
      <section className="py-16 md:py-24 bg-purple-berry text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Experiência AçaiBloom</h2>
            <p className="text-purple-berry-foreground/80 max-w-xl mx-auto">
              Veja por que somos a escolha favorita de quem busca qualidade e sabor incomparável.
            </p>
          </div>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-16"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/10 h-64 flex flex-col">
                  <div className="flex gap-1 mb-4 text-orange-peach">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="italic mb-6 text-base flex-1 line-clamp-3">"{t.text}"</p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="h-10 w-10 rounded-full bg-orange-peach/20 flex items-center justify-center font-bold text-orange-peach border border-orange-peach/20">{t.name[0]}</div>
                    <div>
                      <p className="font-bold text-sm">{t.name}</p>
                      <p className="text-[10px] uppercase tracking-widest text-purple-berry-foreground/60">{t.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      {/* Instagram Feed Refined */}
      <section className="py-16 border-t overflow-hidden bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold flex items-center justify-center md:justify-start gap-2 text-foreground">
              <Instagram className="h-6 w-6 text-purple-berry" /> @acaibloom.oficial
            </h2>
            <p className="text-muted-foreground text-sm">Siga nossa jornada saudável no Instagram e use #AçaiBloom</p>
          </div>
          <Button variant="outline" className="rounded-full border-purple-berry text-purple-berry hover:bg-purple-berry hover:text-white transition-colors">Ver Perfil Completo</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {instaPosts.map((post, i) => (
            <div key={i} className="aspect-square relative group cursor-pointer overflow-hidden border border-border/50 shadow-sm">
              <img
                src={post.url}
                alt={`Instagram Post ${i}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center gap-4 text-white">
                <div className="flex items-center gap-1">
                  <Heart className="h-5 w-5 fill-white" />
                  <span className="text-sm font-bold">{post.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-5 w-5 fill-white" />
                  <span className="text-sm font-bold">{post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Newsletter */}
      <section className="py-16 md:py-24 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-vibrant/10 rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <h2 className="text-3xl md:text-5xl font-black text-purple-berry leading-tight">Ganhe 15% OFF na sua primeira compra!</h2>
              <p className="text-lg text-muted-foreground">Cadastre-se para receber novidades, receitas saudáveis e descontos exclusivos do Bloom Club.</p>
              <ul className="flex flex-wrap justify-center lg:justify-start gap-4">
                <li className="flex items-center gap-2 text-sm font-bold text-purple-berry"><CheckCircle2 className="h-4 w-4" /> Ofertas Semanais</li>
                <li className="flex items-center gap-2 text-sm font-bold text-purple-berry"><CheckCircle2 className="h-4 w-4" /> Novos Sabores</li>
                <li className="flex items-center gap-2 text-sm font-bold text-purple-berry"><CheckCircle2 className="h-4 w-4" /> Dicas Nutricionais</li>
              </ul>
            </div>
            <div className="w-full max-w-md bg-background p-2 rounded-full shadow-2xl flex items-center pr-2 border border-green-vibrant/30 focus-within:ring-2 focus-within:ring-green-vibrant/50 transition-all">
              <input
                placeholder="Seu melhor e-mail"
                className="border-none bg-transparent focus-visible:ring-0 text-base md:text-lg h-14 px-6 flex-1 outline-none text-foreground placeholder:text-muted-foreground"
              />
              <Button size="icon" className="h-12 w-12 rounded-full btn-gradient hover:rotate-12 transition-all">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/5511987654321"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 h-16 w-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.5)] cursor-pointer"
      >
        <MessageCircle size={32} className="fill-current" />
        <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/40" />
      </motion.a>
    </div>
  );
}