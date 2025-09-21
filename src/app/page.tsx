
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { artisans, products } from '@/lib/data';
import { ProductCard } from '@/components/product-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useLanguage } from '@/hooks/use-language';

export default function Home() {
  const { t } = useLanguage();
  return (
    <>
      <div className="relative min-h-[calc(100vh-80px)] -mt-8 -mx-4 sm:-mx-6 lg:-mx-8 flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 h-full w-full z-0">
          <Image
            src="/d5.jpeg"
            alt="An artisan painting a traditional Indian tapestry"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
        </div>

        <div className="relative z-10 text-white space-y-6 max-w-4xl mx-auto px-4">
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-foreground">
            {t('home.heroTitle')}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-foreground/80">
            {t('home.heroSubtitle')}
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/discover">{t('home.discoverCrafts')}</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/dashboard">{t('home.sellYourCraft')}</Link>
            </Button>
          </div>
        </div>
      </div>

      <section className="py-16 lg:py-24">
        <h2 className="font-headline text-3xl font-bold tracking-tight mb-8 text-center">
          {t('home.artisanStoriesTitle')}
        </h2>
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {artisans.map((artisan) => (
              <CarouselItem
                key={artisan.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1 h-full">
                  <Card className="h-full flex flex-col">
                    <CardHeader>
                      <div className="aspect-[4/3] relative">
                        <Image
                          src={artisan.avatarUrl}
                          alt={artisan.name}
                          fill
                          className="rounded-t-lg object-cover"
                          data-ai-hint={artisan.avatarHint}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardTitle className="font-headline text-xl leading-tight">
                        {t('home.handwovenDreams').replace('{location}', artisan.location.split(',')[0])}
                      </CardTitle>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {artisan.story}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/artisans/${artisan.id}`}>{t('home.readStory')}</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </section>

      <section className="py-16 lg:py-24 bg-secondary/30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <h2 className="font-headline text-3xl font-bold tracking-tight mb-8 text-center">
          {t('home.seasonPicksTitle')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="w-full my-16 lg:my-24">
        <div className="relative rounded-lg overflow-hidden bg-card text-card-foreground p-8 md:p-12 lg:p-16 flex items-center justify-center">
          <div className="absolute inset-0">
            <Image
              src="https://picsum.photos/seed/cta-banner/1200/400"
              alt="Artisan working"
              fill
              className="object-cover"
              data-ai-hint="artisan craft"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative z-10 text-center text-white space-y-4">
            <h2 className="font-headline text-3xl font-bold">
              {t('home.ctaTitle')}
            </h2>
            <Button size="lg" variant="secondary">
              {t('home.becomeArtisan')}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
