
'use client';

import { useState, useMemo } from 'react';
import { products, artisans } from '@/lib/data';
import type { Product } from '@/lib/types';
import { ProductCard } from '@/components/product-card';
import { DiscoverFilters, type Filters } from '@/components/discover-filters';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

const moodCollections = [
  { name: 'Festive Glow', hint: 'diwali lights', imageSeed: 'diwali-lantern', mood: 'festive' },
  { name: 'Minimalist Living', hint: 'minimalist pottery', imageSeed: 'white-pottery', mood: 'minimalist' },
  { name: 'Romantic Touch', hint: 'embroidered shawl', imageSeed: 'pink-shawl', mood: 'romantic' },
  { name: 'Everyday Gifting', hint: 'small souvenir', imageSeed: 'handmade-gift', mood: 'gifting' },
];

export default function DiscoverPage() {
  const [filters, setFilters] = useState<Filters>({
    query: '',
    craftType: 'all',
    region: 'all',
    price: [0, 200],
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const artisan = artisans.find(a => a.id === product.artisanId);
      const price = product.price;

      const matchesQuery =
        filters.query === '' ||
        product.name.toLowerCase().includes(filters.query.toLowerCase()) ||
        product.material.toLowerCase().includes(filters.query.toLowerCase()) ||
        artisan?.name.toLowerCase().includes(filters.query.toLowerCase()) ||
        artisan?.tradition.toLowerCase().includes(filters.query.toLowerCase());
      
      const matchesCraft = filters.craftType === 'all' || product.material.toLowerCase().includes(filters.craftType.toLowerCase());

      const matchesRegion = filters.region === 'all' || artisan?.location.toLowerCase().includes(filters.region.toLowerCase());
      
      const matchesPrice = price >= filters.price[0] && price <= filters.price[1];

      return matchesQuery && matchesCraft && matchesRegion && matchesPrice;
    });
  }, [filters]);
  
  const trendingProducts = useMemo(() => {
      // Create a copy and reverse it to show the "latest" items as trending
      return [...products].reverse().slice(0, 8);
  }, []);

  return (
    <div className="space-y-16">
      <section className="text-center">
        <div className="max-w-4xl mx-auto">
          <DiscoverFilters onFiltersChange={setFilters} />
        </div>
      </section>

      <section>
        <h2 className="font-headline text-3xl font-bold tracking-tight mb-8 text-center">
          Discover Handpicked Crafts Just for You
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} showArtisan />
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground">
              No products match your current filters. Try something new!
            </p>
          )}
        </div>
      </section>
      
      <section>
        <h2 className="font-headline text-3xl font-bold tracking-tight mb-8 text-center">
            Shop by Mood & Occasion
        </h2>
        <Carousel opts={{ align: 'start' }} className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {moodCollections.map((mood) => (
              <CarouselItem key={mood.name} className="md:basis-1/2 lg:basis-1/4">
                <Link href={`/marketplace?mood=${mood.mood}`} className="block group">
                  <Card className="overflow-hidden">
                    <CardContent className="p-0 relative aspect-square">
                      <Image
                        src={`https://picsum.photos/seed/${mood.imageSeed}/400/400`}
                        alt={mood.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={mood.hint}
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <h3 className="font-headline text-2xl font-bold text-white">{mood.name}</h3>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </section>

      <section>
        <h2 className="font-headline text-3xl font-bold tracking-tight mb-8 text-center">Trending Crafts This Week</h2>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {trendingProducts.map((product) => (
              <CarouselItem key={product.id} className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <ProductCard product={product} showArtisan trending />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </section>
    </div>
  );
}
