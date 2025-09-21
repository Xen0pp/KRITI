
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState } from 'react';
import { artisans, products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ArtisanAvatar } from '@/components/artisan-avatar';
import StoryGenerator from '@/components/story-generator';
import { Separator } from '@/components/ui/separator';
import TrackProductView from '@/components/track-product-view';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Hand, Heart, PlayCircle, ShoppingCart } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from '@/hooks/use-language';
import { useCart } from '@/hooks/use-cart';


export default function ProductPage({ params }: { params: { id: string } }) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === params.id);
  if (!product) {
    notFound();
  }

  const artisan = artisans.find((a) => a.id === product.artisanId);
  const [selectedImage, setSelectedImage] = useState(product.imageUrl);
  const [tip, setTip] = useState('0');

  // Placeholder for multiple images
  const productImages = [
    product.imageUrl,
    product.imageUrl.replace('seed', 'seed-thumb1'),
    product.imageUrl.replace('seed', 'seed-thumb2'),
    product.imageUrl.replace('seed', 'seed-thumb3'),
  ];
  
  const relatedTags = ["Madhubani Art", "Jaipur Pottery", "Wedding Gifts"];

  const handleAddToCart = () => {
    addToCart(product.id);
    // The toast is now handled by the useCart hook
  }

  return (
    <div className="max-w-7xl mx-auto">
      <TrackProductView productId={product.id} />
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        {/* Product Gallery */}
        <div className="flex flex-col gap-4">
          <Dialog>
            <DialogTrigger asChild>
                <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg group cursor-pointer">
                    <Image
                        src={selectedImage}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={product.imageHint}
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex flex-col items-center text-white text-center">
                            <PlayCircle className="h-16 w-16" />
                            <p className="font-headline text-xl mt-2">Story Peek</p>
                        </div>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>The Story of {product.name}</DialogTitle>
                <DialogDescription asChild>
                    <div className="space-y-4 pt-4">
                        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                            <p>AI-generated micro-video playing here...</p>
                        </div>
                        <p>This is a short, AI-narrated story about the product's origin, the artisan's craft, and its cultural significance.</p>
                        {artisan && (
                            <Button asChild>
                                <Link href={`/artisans/${artisan.id}`}>Watch Full Story</Link>
                            </Button>
                        )}
                    </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <div className="grid grid-cols-4 gap-2">
            {productImages.map((img, index) => (
              <div
                key={index}
                className={`aspect-square relative rounded-md overflow-hidden cursor-pointer border-2 ${selectedImage === img ? 'border-primary' : 'border-transparent'}`}
                onClick={() => setSelectedImage(img)}
              >
                <Image
                  src={img}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="font-headline text-4xl lg:text-5xl font-bold tracking-tight text-primary-foreground">
            {product.name}
          </h1>
          
          {artisan && (
            <Link href={`/artisans/${artisan.id}`} className="mt-4 inline-block group">
              <ArtisanAvatar artisan={artisan} />
            </Link>
          )}

           <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500"/>
                  <span>{t('product.artisanVerified')}</span>
              </div>
              <div className="flex items-center gap-1">
                  <Hand className="h-4 w-4 text-green-500"/>
                  <span>{t('product.handmadeCertified')}</span>
              </div>
          </div>

          <p className="mt-4 text-3xl font-bold text-accent">₹{product.price.toFixed(2)}</p>

          <div className="mt-6 prose prose-lg text-muted-foreground max-w-none">
            <ul>
                <li><strong>{t('product.material')}</strong> {product.material}</li>
                <li><strong>{t('product.origin')}</strong> {product.origin}</li>
                <li><strong>{t('product.description')}</strong> {product.description}</li>
            </ul>
          </div>
          
          <div className="mt-auto pt-6 space-y-4">
             <div className="grid grid-cols-2 gap-4">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleAddToCart}>
                    <ShoppingCart className="mr-2"/> {t('product.quickAddToCart')}
                </Button>
                 <Button size="lg" variant="outline">
                    {t('product.customizeAndOrder')}
                </Button>
            </div>
            {artisan && (
            <div className="p-4 bg-secondary/30 rounded-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-accent"/>
                        <label htmlFor="tip-select" className="font-semibold">{t('product.tipArtisan').replace('{name}', artisan.name)}</label>
                    </div>
                     <Select onValueChange={setTip} defaultValue="0">
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder={t('product.tipAmount')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="0">₹0</SelectItem>
                            <SelectItem value="50">₹50</SelectItem>
                            <SelectItem value="100">₹100</SelectItem>
                            <SelectItem value="150">₹150</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <p className="text-xs text-muted-foreground mt-2">{t('product.tipThanks')}</p>
            </div>
            )}
          </div>
        </div>
      </div>
      
       <Separator className="my-12 lg:my-16" />

       <div>
        <h3 className="font-headline text-2xl font-bold mb-4">{t('product.culturalContext')}</h3>
        <div className="flex flex-wrap gap-2">
            {relatedTags.map(tag => (
                <Link key={tag} href={`/discover?tag=${encodeURIComponent(tag.toLowerCase())}`}>
                    <Badge variant="secondary" className="text-base py-1 px-3 hover:bg-primary/20 transition-colors">{tag}</Badge>
                </Link>
            ))}
        </div>
       </div>

      {artisan && (
        <>
          <Separator className="my-12" />
          <StoryGenerator product={product} artisan={artisan} />
        </>
      )}
    </div>
  );
}
