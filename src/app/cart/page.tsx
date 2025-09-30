
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { artisans } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, Heart, Lock } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';

export default function CartPage() {
  const { toast } = useToast();
  const { cartItems, updateQuantity, removeFromCart, subtotal, getProductFromItem, clearCart } = useCart();
  const [tipAmount, setTipAmount] = useState(0);

  const handleTipChange = (value: string) => {
    setTipAmount(Number(value) || 0);
  };

  const total = subtotal + tipAmount; // Assuming shipping & tax are calculated at checkout

  return (
    <div className="space-y-8">
      <section>
        <h1 className="font-headline text-4xl font-bold tracking-tight">Your Kriti Cart</h1>
        <p className="mt-2 text-lg text-muted-foreground">You have {cartItems.length} unique item(s) in your cart.</p>
      </section>

      {cartItems.length === 0 ? (
        <Card className="py-16 text-center">
            <CardContent>
                <h2 className="text-2xl font-semibold">Your Cart is Empty</h2>
                <p className="text-muted-foreground mt-2">Looks like you haven't added anything to your cart yet.</p>
                <Button asChild className="mt-6">
                    <Link href="/discover">Start Exploring</Link>
                </Button>
            </CardContent>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-3 lg:gap-12">
          {/* Product List */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map(item => {
              const product = getProductFromItem(item);
              if (!product) return null;
              const artisan = artisans.find(a => a.id === product.artisanId);
              return (
                <Card key={item.productId}>
                  <CardContent className="flex gap-4 p-4 items-center">
                     <div className="relative h-24 w-24 rounded-md overflow-hidden">
                       <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                     </div>
                     <div className="flex-grow">
                        <Link href={`/products/${product.id}`} className="font-semibold hover:underline">{product.name}</Link>
                        {artisan && <p className="text-sm text-muted-foreground">By <Link href={`/artisans/${artisan.id}`} className="hover:underline text-primary/90">{artisan.name}</Link></p>}
                        <p className="text-lg font-semibold text-accent mt-1">₹{product.price.toFixed(2)}</p>
                     </div>
                     <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.productId, item.quantity - 1)}>
                            <Minus className="h-4 w-4" />
                        </Button>
                        <Input value={item.quantity} className="h-8 w-12 text-center" readOnly />
                         <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                            <Plus className="h-4 w-4" />
                        </Button>
                     </div>
                     <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.productId)}>
                        <Trash2 className="h-5 w-5 text-muted-foreground hover:text-destructive" />
                     </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
             <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                            <span>Shipping</span>
                            <span>Calculated at next step</span>
                        </div>
                         <div className="flex justify-between text-muted-foreground">
                            <span>Tax</span>
                            <span>Calculated at next step</span>
                        </div>
                    </div>
                     <Separator />
                     <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Heart className="h-5 w-5 text-accent"/>
                            <h4 className="font-semibold">Support the Artisan</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">100% of your tip goes directly to the artisans.</p>
                         <ToggleGroup type="single" onValueChange={handleTipChange} className="justify-start gap-2">
                            <ToggleGroupItem value="50" aria-label="Tip 50">₹50</ToggleGroupItem>
                            <ToggleGroupItem value="100" aria-label="Tip 100">₹100</ToggleGroupItem>
                            <ToggleGroupItem value="150" aria-label="Tip 150">₹150</ToggleGroupItem>
                         </ToggleGroup>
                         {tipAmount > 0 && (
                             <div className="flex justify-between font-medium text-accent">
                                <span>Artisan Tip</span>
                                <span>₹{tipAmount.toFixed(2)}</span>
                            </div>
                         )}
                     </div>
                    <Separator />
                     <div className="flex justify-between text-xl font-bold">
                        <span>Total</span>
                        <span>₹{total.toFixed(2)}</span>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-4">
                    <Button asChild size="lg" className="w-full">
                        <Link href="/payment">Proceed to Payment</Link>
                    </Button>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Lock className="h-3 w-3" />
                        <span>Secure SSL encrypted payments</span>
                    </div>
                </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
