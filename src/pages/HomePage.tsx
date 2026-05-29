import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, ArrowRight, Zap, Heart, Leaf } from 'lucide-react';
const MOCK_PRODUCTS = [
  { id: '1', name: 'Bowl Tropical', description: 'Açaí premium com banana, granola e mel orgânico.', price: 'R$ 28,00', tag: 'Destaque', image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=400&auto=format&fit=crop' },
  { id: '2', name: 'Smoothie Berry', description: 'Mix de frutas vermelhas com base cremosa de açaí.', price: 'R$ 18,00', tag: 'Novo', image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=400&auto=format&fit=crop' },
  { id: '3', name: 'Super Protein', description: 'Bowl focado em pós-treino com whey e amendoim.', price: 'R$ 32,00', tag: 'Energia', image: 'https://images.unsplash.com/photo-1628557044797-f21a177c37ec?q=80&w=400&auto=format&fit=crop' },
  { id: '4', name: 'Açaí Tradicional', description: 'O clássico puro açaí amazônico batido na hora.', price: 'R$ 22,00', tag: 'Clássico', image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=400&auto=format&fit=crop' },
];
export function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-20 md:py-32 lg:py-40 border-b">
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
                <Button size="lg" className="btn-gradient text-lg h-14 px-8">
                  Ver Cardápio <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg h-14 px-8">
                  Sobre Nós
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Background Accents */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-purple-berry/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-green-vibrant/10 rounded-full blur-3xl" />
      </section>
      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-purple-berry/10 flex items-center justify-center">
                <Zap className="h-8 w-8 text-purple-berry" />
              </div>
              <h3 className="text-xl font-bold">Energia Real</h3>
              <p className="text-muted-foreground text-sm">Combustível natural para seu dia a dia.</p>
            </div>
            <div className="flex flex-col items-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-green-vibrant/10 flex items-center justify-center">
                <Leaf className="h-8 w-8 text-green-vibrant" />
              </div>
              <h3 className="text-xl font-bold">100% Orgânico</h3>
              <p className="text-muted-foreground text-sm">Produtos livres de conservantes e corantes.</p>
            </div>
            <div className="flex flex-col items-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-orange-peach/10 flex items-center justify-center">
                <Heart className="h-8 w-8 text-orange-peach" />
              </div>
              <h3 className="text-xl font-bold">Sabor & Saúde</h3>
              <p className="text-muted-foreground text-sm">Feito com amor e ingredientes premium.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Showcase Section */}
      <section className="py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossa Seleção Especial</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Descubra nossas criações exclusivas feitas com o melhor açaí da Amazônia.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {MOCK_PRODUCTS.map((product, idx) => (
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
                      {product.tag}
                    </Badge>
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription className="line-clamp-2 text-xs">{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-purple-berry">{product.price}</span>
                    <Button size="sm" variant="secondary" className="rounded-full h-10 w-10 p-0">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}