'use client';

import { useState, useEffect } from 'react';
import { useBrowsingHistory } from '@/hooks/use-browsing-history';
import { getRecommendationsAction } from '@/app/actions';
import type { Product } from '@/lib/types';
import { ProductCard } from './product-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Skeleton } from './ui/skeleton';

export default function Recommendations() {
  const { history } = useBrowsingHistory();
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only fetch recommendations on the client after history has been loaded
    if (typeof window !== 'undefined') {
      setIsLoading(true);
      getRecommendationsAction(history)
        .then(setRecommendations)
        .finally(() => setIsLoading(false));
    }
  }, [history]);

  if (isLoading) {
    return (
      <section>
        <h2 className="font-headline text-3xl font-bold tracking-tight mb-8 text-center">Recommended For You</h2>
        <div className="flex space-x-8 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 shrink-0">
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="h-6 w-3/4 mt-4" />
                <Skeleton className="h-8 w-1/2 mt-2" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="font-headline text-3xl font-bold tracking-tight mb-8 text-center">Recommended For You</h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full max-w-6xl mx-auto"
      >
        <CarouselContent>
          {recommendations.map((product) => (
            <CarouselItem key={product.id} className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </section>
  );
}
