import React from 'react';
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
export function ProductFilterSheet() {
  return (
    <div className="p-4 space-y-8">
      <div>
        <h3 className="text-lg font-bold mb-4">Filtros</h3>
        <Accordion type="multiple" defaultValue={["categories", "attributes"]} className="w-full">
          <AccordionItem value="categories">
            <AccordionTrigger className="text-sm font-semibold">Categorias</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                {["Taças de Açaí", "Smoothies", "Lanches Fit", "Adicionais"].map((cat) => (
                  <div key={cat} className="flex items-center space-x-2">
                    <Checkbox id={cat} />
                    <Label htmlFor={cat} className="text-sm font-normal">{cat}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="price">
            <AccordionTrigger className="text-sm font-semibold">Faixa de Preço</AccordionTrigger>
            <AccordionContent>
              <div className="pt-6 px-2">
                <Slider defaultValue={[20]} max={100} step={1} />
                <div className="flex justify-between mt-4 text-xs text-muted-foreground font-medium">
                  <span>Até R$ 20</span>
                  <span>R$ 100+</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="attributes">
            <AccordionTrigger className="text-sm font-semibold">Atributos</AccordionTrigger>
            <AccordionContent>
              <RadioGroup defaultValue="all" className="pt-2 space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all" className="text-sm font-normal">Todos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vegan" id="vegan" />
                  <Label htmlFor="vegan" className="text-sm font-normal">Vegano</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no-sugar" id="no-sugar" />
                  <Label htmlFor="no-sugar" className="text-sm font-normal">Sem Açúcar</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="protein" id="protein" />
                  <Label htmlFor="protein" className="text-sm font-normal">Com Proteína</Label>
                </div>
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}