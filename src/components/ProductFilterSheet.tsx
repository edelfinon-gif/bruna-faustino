import React from 'react';
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
import { useFilterStore } from '@/store/useFilterStore';
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
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api<Category[]>('/api/categories'),
  });
  const availableTags = ['vegano', 'proteico', 'zero-açúcar', 'sem-glúten', 'detox'];
  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Filtros</h3>
        <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 px-2 text-xs">
          <RotateCcw className="h-3 w-3 mr-1" /> Limpar
        </Button>
      </div>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar no cardápio..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Accordion type="multiple" defaultValue={["categories", "price", "attributes"]} className="w-full">
        <AccordionItem value="categories">
          <AccordionTrigger className="text-sm font-semibold">Categorias</AccordionTrigger>
          <AccordionContent>
            <RadioGroup value={categoryId} onValueChange={setCategoryId} className="pt-2 space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="cat-all" />
                <Label htmlFor="cat-all" className="text-sm font-normal">Todas as categorias</Label>
              </div>
              {categories?.map((cat) => (
                <div key={cat.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={cat.id} id={`cat-${cat.id}`} />
                  <Label htmlFor={`cat-${cat.id}`} className="text-sm font-normal">{cat.name}</Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-semibold">Preço Máximo (R$)</AccordionTrigger>
          <AccordionContent>
            <div className="pt-6 px-2">
              <Slider 
                value={[maxPrice]} 
                max={100} 
                step={5} 
                onValueChange={(val) => setMaxPrice(val[0])}
              />
              <div className="flex justify-between mt-4 text-xs font-bold text-purple-berry">
                <span>R$ 0</span>
                <span>R$ {maxPrice}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="attributes">
          <AccordionTrigger className="text-sm font-semibold">Atributos</AccordionTrigger>
          <AccordionContent>
            <div className="pt-2 space-y-3">
              {availableTags.map((tag) => (
                <div key={tag} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`tag-${tag}`} 
                    checked={selectedTags.includes(tag)}
                    onCheckedChange={() => toggleTag(tag)}
                  />
                  <Label htmlFor={`tag-${tag}`} className="text-sm font-normal capitalize">
                    {tag.replace('-', ' ')}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}