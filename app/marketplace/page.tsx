
'use client';

import { products } from '@/lib/data';
import { ProductCard } from '@/components/product-card';

export default function MarketplacePage() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight">Marketplace</h1>
        <p className="mt-2 text-lg text-muted-foreground">Explore all the unique crafts from our talented artisans.</p>
      </section>
      
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} showArtisan />
          ))}
        </div>
      </section>
    </div>
  );
}
