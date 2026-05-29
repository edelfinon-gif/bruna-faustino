import React, { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RotateCcw, X } from "lucide-react";
import { api } from '@/lib/api-client';
import type { Category } from '@shared/types';
import { useFilterStore, checkIsFilterActive, DEFAULT_MAX_PRICE } from '@/store/useFilterStore';
export function ProductFilterSheet() {
  const categoryId = useFilterStore((s) => s.categoryId);
  const maxPrice = useFilterStore((s) => s.maxPrice);
  const searchQuery = useFilterStore((s) => s.searchQuery);
  const selectedTags = useFilterStore((s) => s.selectedTags);
  const setCategoryId = useFilterStore((s) => s.setCategoryId);
  const setMaxPrice = useFilterStore((s) => s.setMaxPrice);
  const setSearchQuery = useFilterStore((s) => s.setSearchQuery);
  const toggleTag = useFilterStore((s) => s.toggleTag);
  const resetFilters = useFilterStore((s) => s.resetFilters);
  const hasActiveFilters = useFilterStore(checkIsFilterActive);
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api<Category[]>('/api/categories'),
    staleTime: 1000 * 60 * 10,
  });
  const availableTags = ['vegano', 'proteico', 'zero-açúcar', 'sem-glúten', 'detox'];
  const handlePriceChange = useCallback((val: number[]) => {
    setMaxPrice(val[0]);
  }, [setMaxPrice]);
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 pb-2 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground">Refinar Busca</h3>
          <AnimatePresence>
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="h-8 px-2 text-xs text-purple-berry hover:bg-purple-berry/5 font-bold"
                >
                  <RotateCcw className="h-3 w-3 mr-1" /> Limpar
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar no cardápio..."
            className="pl-10 h-12 bg-muted/40 border-none focus-visible:ring-2 focus-visible:ring-purple-berry/30 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-6">
        <Accordion type="multiple" defaultValue={["categories", "price", "attributes"]} className="w-full">
          <AccordionItem value="categories" className="border-b border-border/40 py-2">
            <AccordionTrigger className="text-sm font-bold uppercase tracking-wider text-muted-foreground hover:no-underline">
              Categorias
            </AccordionTrigger>
            <AccordionContent>
              <RadioGroup value={categoryId} onValueChange={setCategoryId} className="pt-2 space-y-4">
                <div className="flex items-center space-x-3 cursor-pointer group">
                  <RadioGroupItem value="all" id="cat-all" className="border-purple-berry text-purple-berry" />
                  <Label htmlFor="cat-all" className="text-sm font-medium group-hover:text-purple-berry transition-colors cursor-pointer">
                    Todas
                  </Label>
                </div>
                {categories?.map((cat) => (
                  <div key={cat.id} className="flex items-center space-x-3 cursor-pointer group">
                    <RadioGroupItem value={cat.id} id={`cat-${cat.id}`} className="border-purple-berry text-purple-berry" />
                    <Label htmlFor={`cat-${cat.id}`} className="text-sm font-medium group-hover:text-purple-berry transition-colors cursor-pointer">
                      {cat.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="price" className="border-b border-border/40 py-2">
            <AccordionTrigger className="text-sm font-bold uppercase tracking-wider text-muted-foreground hover:no-underline">
              Preço Máximo
            </AccordionTrigger>
            <AccordionContent>
              <div className="pt-6 px-2">
                <Slider
                  value={[maxPrice]}
                  max={DEFAULT_MAX_PRICE}
                  min={0}
                  step={1}
                  onValueChange={handlePriceChange}
                  className="[&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:border-2 [&_[role=slider]]:border-purple-berry [&_.bg-primary]:bg-purple-berry"
                />
                <div className="flex justify-between mt-6">
                  <span className="text-xs font-bold text-muted-foreground">R$ 0</span>
                  <div className="bg-purple-berry text-white px-3 py-1 rounded-full text-xs font-black shadow-sm">
                    Até R$ {maxPrice.toFixed(2)}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="attributes" className="border-none py-2">
            <AccordionTrigger className="text-sm font-bold uppercase tracking-wider text-muted-foreground hover:no-underline">
              Atributos
            </AccordionTrigger>
            <AccordionContent>
              <div className="pt-2 space-y-4">
                {availableTags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-3 group">
                    <Checkbox
                      id={`tag-${tag}`}
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={() => toggleTag(tag)}
                      className="h-5 w-5 border-purple-berry data-[state=checked]:bg-purple-berry data-[state=checked]:text-white"
                    />
                    <Label htmlFor={`tag-${tag}`} className="text-sm font-medium capitalize group-hover:text-purple-berry transition-colors cursor-pointer">
                      {tag.replace('-', ' ')}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="p-6 border-t bg-muted/20">
        <div className="bg-green-vibrant/10 border border-green-vibrant/20 p-4 rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1.5 w-1.5 rounded-full bg-green-vibrant animate-pulse" />
            <p className="text-[10px] uppercase font-bold text-green-vibrant">Dica Bloom</p>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Nossos produtos são 100% naturais. Use o filtro <strong>Proteico</strong> para opções ideais para o seu treino.
          </p>
        </div>
      </div>
    </div>
  );
}