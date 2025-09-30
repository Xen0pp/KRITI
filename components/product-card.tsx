
'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { artisans } from '@/lib/data';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { Badge } from './ui/badge';
import { useCart } from '@/hooks/use-cart';

interface ProductCardProps {
  product: Product;
  className?: string;
  showArtisan?: boolean;
  trending?: boolean;
}

export function ProductCard({ product, className, showArtisan = false, trending = false }: ProductCardProps) {
  const artisan = showArtisan ? artisans.find(a => a.id === product.artisanId) : null;
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
  };

  return (
    <Card className={cn("group overflow-hidden h-full transition-shadow duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col", className)}>
      <CardContent className="p-0 flex flex-col h-full">
        <div className="aspect-square relative overflow-hidden">
          <Link href={`/products/${product.id}`} className="block w-full h-full">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={product.imageHint}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </Link>
          {trending && <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">🔥 Trending</Badge>}
           <div className="absolute bottom-2 left-2 right-2 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button asChild variant="secondary" className="shadow-lg">
                <Link href={`/products/${product.id}`}>Shop Now</Link>
              </Button>
            </div>
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <Link href={`/products/${product.id}`} className='hover:underline'>
            <h3 className="font-headline text-lg font-semibold text-primary-foreground leading-tight truncate">
              {product.name}
            </h3>
          </Link>
           {artisan && (
            <p className="text-sm text-muted-foreground mt-1">
              By {artisan.name}, {artisan.location.split(',')[1].trim()}
            </p>
          )}
          <p className="mt-2 text-xl font-semibold text-accent">
            ₹{product.price.toFixed(2)}
          </p>
          
          {showArtisan && artisan && (
            <div className="mt-4 pt-4 border-t flex-grow flex flex-col justify-end gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/artisans/${artisan.id}`}>View Story</Link>
                </Button>
                <Button size="sm" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2" />Add to Cart
                </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
