import React, { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
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
import { Search, RotateCcw } from "lucide-react";
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
    <div className="p-6 space-y-8 h-full bg-background">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-foreground">Refinar Busca</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="h-8 px-2 text-xs text-muted-foreground hover:text-purple-berry hover:bg-purple-berry/5 font-bold"
          >
            <RotateCcw className="h-3 w-3 mr-1" /> Limpar
          </Button>
        )}
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar no cardápio..."
          className="pl-10 h-11 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-purple-berry"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Accordion type="multiple" defaultValue={["categories", "price", "attributes"]} className="w-full">
        <AccordionItem value="categories" className="border-none">
          <AccordionTrigger className="text-sm font-bold uppercase tracking-wider text-muted-foreground hover:no-underline">
            Categorias
          </AccordionTrigger>
          <AccordionContent>
            <RadioGroup value={categoryId} onValueChange={setCategoryId} className="pt-2 space-y-4">
              <div className="flex items-center space-x-3 cursor-pointer group">
                <RadioGroupItem value="all" id="cat-all" className="border-purple-berry text-purple-berry" />
                <Label htmlFor="cat-all" className="text-sm font-medium group-hover:text-purple-berry transition-colors cursor-pointer">
                  Todas as categorias
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
        <AccordionItem value="price" className="border-none mt-4">
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
                className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:border-purple-berry [&_.bg-primary]:bg-purple-berry"
              />
              <div className="flex justify-between mt-6">
                <span className="text-xs font-bold text-muted-foreground">R$ 0</span>
                <div className="bg-purple-berry/10 text-purple-berry px-3 py-1 rounded-full text-xs font-black">
                  Até R$ {maxPrice.toFixed(2)}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="attributes" className="border-none mt-4">
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
                    className="border-purple-berry data-[state=checked]:bg-purple-berry"
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
      <div className="pt-8">
        <div className="bg-green-vibrant/5 border border-green-vibrant/20 p-4 rounded-2xl">
          <p className="text-[10px] uppercase font-bold text-green-vibrant mb-2">Dica Bloom</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Combine filtros de <strong>Proteico</strong> com <strong>Zero Açúcar</strong> para o lanche pós-treino perfeito.
          </p>
        </div>
      </div>
    </div>
  );
}