import { Heart, Star, ShoppingCart, Eye } from 'lucide-react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import React from 'react';
import type { Product } from '../services/types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
}

export const ProductCard = React.memo(({ product }: ProductCardProps) => {
  if (!product) return;

  const discountedPrice = product?.price * (1 - product?.discountPercentage / 100) || 0;
  const isOnSale = product?.discountPercentage > 0 || 0;
  const isInStock = product?.stock > 0 || 0;

  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-lg pt-0">
      <div className="relative aspect-square overflow-hidden">
        <img src={product.thumbnail || '/placeholder.svg'} alt={product.title} className="object-cover transition-transform group-hover:scale-105 w-full h-full" />
        
        {isOnSale && <Badge className="absolute left-2 top-2 bg-red-500 text-white">-{product.discountPercentage}%</Badge>}
        
        {!isInStock && <Badge className="absolute right-2 top-2 bg-gray-500 text-white">Out of Stock</Badge>}
        
        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />

        <div className="absolute right-2 top-1/2 flex -translate-y-1/2 flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <Button size="icon" variant="secondary" className="h-8 w-8" onClick={() => console.log(product)}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" className="h-8 w-8" onClick={() => console.log(product)}>
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardContent className="px-4">
        <div className="mb-2 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
          ))}
          <span className="ml-1 text-xs text-muted-foreground">({product.reviews.length})</span>
        </div>

        <h3 className="font-semibold line-clamp-2 mb-1 text-lg">{product.title}</h3>
        <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>

        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">${discountedPrice.toFixed(2)}</span>
          {isOnSale && <span className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>}
        </div>

        <div className="mt-2 flex flex-wrap gap-1">
          {product.tags.slice(0, 2).map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="px-4 pt-0">
        <Button className="w-full" onClick={() => console.log(product)} disabled={!isInStock}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isInStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  );
});
