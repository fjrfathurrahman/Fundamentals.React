import { Filter, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { useGetCategories } from '../services/api';
import { useProduct } from '../hooks/product-context';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import React from 'react';

const brands = [
  { id: 'apple', name: 'Apple', count: 12 },
  { id: 'samsung', name: 'Samsung', count: 8 },
  { id: 'nike', name: 'Nike', count: 15 },
  { id: 'adidas', name: 'Adidas', count: 11 },
  { id: 'sony', name: 'Sony', count: 7 },
];

const colors = [
  { id: 'black', name: 'Black', color: '#000000' },
  { id: 'white', name: 'White', color: '#FFFFFF' },
  { id: 'red', name: 'Red', color: '#EF4444' },
  { id: 'blue', name: 'Blue', color: '#3B82F6' },
  { id: 'green', name: 'Green', color: '#10B981' },
];

const activeFilters = [
  { id: 'electronics', label: 'Electronics', type: 'category' },
  { id: 'nike', label: 'Nike', type: 'brand' },
  { id: 'black', label: 'Black', type: 'color' },
];

export const SidebarFiltering = React.memo(() => {
  const { setCategory, categories } = useProduct();

  return (
    <Card className="w-80 h-max">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters
        </CardTitle>
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {activeFilters.map(filter => (
              <Badge key={filter.id} variant="secondary" className="text-xs">
                {filter.label}
                <Button variant="ghost" size="sm" className="h-auto p-0 ml-1 hover:bg-transparent">
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {filter.label} filter</span>
                </Button>
              </Badge>
            ))}
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
              Clear all
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Categories */}
        {categories.length > 0 && (
          <>
            <Separator />

            <Accordion type="single" collapsible defaultValue="categories">
              <AccordionItem value="categories" className="border-none">
                <AccordionTrigger className="text-base font-medium hover:no-underline">Categories</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <RadioGroup onValueChange={value => setCategory(value)}>
                      {/* Categories can not be sellected like this; only one category can be sellected  */}
                      {categories.map((c: string, i: number) => (
                        <div key={i} className="flex items-center gap-3 capitalize">
                          <RadioGroupItem value={c} id={i.toString()} />
                          <Label htmlFor={i.toString()}>{c}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </>
        )}

        <Separator />

        {/* Brands */}
        <Accordion type="single" collapsible defaultValue="brands">
          <AccordionItem value="brands" className="border-none">
            <AccordionTrigger className="text-base font-medium hover:no-underline">Brands</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {brands.map(brand => (
                  <div key={brand.id} className="flex items-center space-x-2">
                    <Checkbox id={brand.id} />
                    <Label htmlFor={brand.id} className="flex-1 text-sm font-normal cursor-pointer">
                      {brand.name}
                    </Label>
                    <span className="text-xs text-muted-foreground">({brand.count})</span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Separator />

        {/* Colors */}
        <Accordion type="single" collapsible defaultValue="colors">
          <AccordionItem value="colors" className="border-none">
            <AccordionTrigger className="text-base font-medium hover:no-underline">Colors</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {colors.map(color => (
                  <div key={color.id} className="flex items-center space-x-2">
                    <Checkbox id={color.id} />
                    <div className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: color.color }} />
                    <Label htmlFor={color.id} className="flex-1 text-sm font-normal cursor-pointer">
                      {color.name}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Separator />

        {/* Rating */}
        <div>
          <Label className="text-base font-medium">Rating</Label>
          <div className="mt-3 space-y-2">
            {[4, 3, 2, 1].map(rating => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox id={`rating-${rating}`} />
                <Label htmlFor={`rating-${rating}`} className="flex items-center gap-1 text-sm font-normal cursor-pointer">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ★
                      </span>
                    ))}
                  </div>
                  & Up
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
