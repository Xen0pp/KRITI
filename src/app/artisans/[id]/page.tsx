'use client';

import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { artisans, products } from '@/lib/data';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Heart, MapPin, CheckCircle, Calendar, Video, PlayCircle, Milestone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function ArtisanPage() {
  const params = useParams();
  const { toast } = useToast();
  const id = params.id as string;

  const artisan = artisans.find((a) => a.id === id);

  if (!artisan) {
    notFound();
  }

  const artisanProducts = products.filter((p) => p.artisanId === artisan.id);

  const handleTip = () => {
    toast({
      title: 'Thank You!',
      description: `Your support for ${artisan.name} is greatly appreciated.`,
    });
  };

  const timelineEvents = [
    { year: 1985, event: "Learned from my grandmother" },
    { year: 2005, event: "First solo exhibition" },
    { year: 2015, event: "Started teaching local youth" },
    { year: 2024, event: "Joined Kriti to share my craft" },
  ];

  return (
    <div className="space-y-16">
      {/* Header Section */}
      <section className="relative h-80 lg:h-96 w-full -mx-4 sm:-mx-6 lg:-mx-8 -mt-8">
        <Image
          src={artisan.avatarUrl.replace('200/200', '1600/600')}
          alt={`${artisan.name}'s workspace`}
          fill
          className="object-cover"
          data-ai-hint="artisan workspace"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="max-w-3xl">
                <div className="flex items-center gap-2">
                    <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight text-primary-foreground">
                        {artisan.name}
                    </h1>
                    <Badge variant="secondary" className="text-sm gap-1 pl-2 pr-3">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Artisan Verified
                    </Badge>
                </div>
                <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{artisan.location}</span>
                </div>
                 <p className="mt-4 text-lg text-foreground/80 font-body max-w-2xl">
                    "{artisan.story.split('.')[0]}."
                </p>
            </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        
        {/* Left Column */}
        <div className="md:col-span-2 space-y-12">
          {/* Timeline Section */}
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-3xl">My Journey: A Timeline of My Craft</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative pl-6 after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-border">
                {timelineEvents.map((item, index) => (
                  <div key={index} className="relative pl-8 py-4 grid md:grid-cols-[100px_1fr] items-start gap-4">
                     <div className="absolute left-[-25px] top-1/2 -translate-y-1/2 z-10 text-primary-foreground">
                       <div className="h-12 w-12 rounded-full bg-primary/20 border-4 border-background flex items-center justify-center">
                         <Milestone className="h-6 w-6"/>
                       </div>
                     </div>
                    <time className="text-right font-semibold text-primary">{item.year}</time>
                    <p className="text-muted-foreground">{item.event}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* AI Narration Section */}
          <Card>
            <CardHeader>
                <CardTitle className="font-headline text-3xl">Listen to My Story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="aspect-video relative bg-muted rounded-lg flex items-center justify-center group cursor-pointer overflow-hidden">
                    <Image src={artisan.avatarUrl.replace('200/200', '800/450')} alt="Artisan working" fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/50"/>
                    <div className="relative text-white flex flex-col items-center">
                        <PlayCircle className="h-16 w-16 mb-2"/>
                        <p>Play Story</p>
                    </div>
                </div>
                 <Select defaultValue="en">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                    </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">{artisan.story}</p>
            </CardContent>
          </Card>

          {/* Craft Demo Videos */}
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-3xl">Watch How It's Made</CardTitle>
            </CardHeader>
            <CardContent>
               <Carousel opts={{ align: 'start' }} className="w-full">
                  <CarouselContent>
                    {[1, 2, 3].map((i) => (
                      <CarouselItem key={i} className="md:basis-1/2">
                          <div className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center text-center p-4">
                              <Video className="h-10 w-10 text-muted-foreground mb-2"/>
                              <h4 className="font-semibold">Demo Video {i}</h4>
                              <p className="text-sm text-muted-foreground">e.g. The First Step of Weaving</p>
                          </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden sm:flex" />
                  <CarouselNext className="hidden sm:flex" />
                </Carousel>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="md:col-span-1 space-y-6">
           <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Tip the Artisan</CardTitle>
                    <CardDescription>100% of your tip goes directly to {artisan.name}.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={handleTip} className="w-full">
                        <Heart className="mr-2 h-4 w-4 text-accent fill-current" />
                        Show Your Support
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><Calendar className="h-5 w-5"/> Join a Live Workshop!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">No upcoming workshops. Check back soon!</p>
                    <Button variant="outline" disabled className="w-full">Sign Up Now</Button>
                </CardContent>
            </Card>
        </div>
      </div>
      
      <Separator />

      {/* Product Showcase */}
      <div>
        <h2 className="font-headline text-3xl font-bold tracking-tight mb-8 text-center">
          My Collection
        </h2>
        {artisanProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {artisanProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No products found for this artisan yet.</p>
        )}
      </div>
    </div>
  );
}
