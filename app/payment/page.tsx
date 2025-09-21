
'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Lock, CheckCircle, IndianRupee, CreditCard, Landmark, Wallet } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { useCart } from '@/hooks/use-cart';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function PaymentPage() {
    const { cartItems, subtotal, getProductFromItem } = useCart();
    const [tip, setTip] = useState(50); // Example tip
    const shipping = subtotal > 0 ? 10 : 0;
    const tax = subtotal * 0.05;
    const grandTotal = subtotal + shipping + tax + tip;


  return (
    <div className="max-w-5xl mx-auto">
        <header className="mb-8">
            <Button variant="link" asChild className="p-0 mb-4 text-muted-foreground">
                <Link href="/cart"><ArrowLeft className="mr-2"/> Back to Cart</Link>
            </Button>
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 text-primary">
                    <CheckCircle className="h-5 w-5"/>
                    <span>Cart</span>
                </div>
                <Separator className="w-16" />
                 <div className="flex items-center gap-2 font-bold text-primary">
                    <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center p-2 text-xs">2</div>
                    <span>Payment</span>
                </div>
                <Separator className="w-16" />
                 <div className="flex items-center gap-2">
                     <div className="w-5 h-5 rounded-full border-2 border-muted flex items-center justify-center p-2 text-xs">3</div>
                    <span>Confirmation</span>
                </div>
            </div>
            <h1 className="font-headline text-4xl font-bold tracking-tight text-center mt-4">Secure Checkout</h1>
        </header>

      <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-12">
        {/* Order Summary */}
        <aside>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ScrollArea className="h-48 pr-4">
                <div className="space-y-4">
                    {cartItems.map(item => {
                        const product = getProductFromItem(item);
                        if (!product) return null;
                        return (
                            <div key={item.productId} className="flex items-center gap-4">
                                <div className="relative h-16 w-16 rounded-md overflow-hidden border">
                                    <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                                    <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">{item.quantity}</span>
                                </div>
                                <div className="flex-grow">
                                    <p className="font-semibold text-sm">{product.name}</p>
                                </div>
                                <p className="font-semibold text-sm">₹{(product.price * item.quantity).toFixed(2)}</p>
                            </div>
                        )
                    })}
                </div>
              </ScrollArea>
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>₹{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Artisan Tip</span>
                  <span>₹{tip.toFixed(2)}</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Grand Total</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Payment Details */}
        <main>
          <Tabs defaultValue="card" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="card"><CreditCard className="mr-2"/>Card</TabsTrigger>
              <TabsTrigger value="upi"><IndianRupee className="mr-2"/>UPI</TabsTrigger>
              <TabsTrigger value="netbanking"><Landmark className="mr-2"/>Net Banking</TabsTrigger>
              <TabsTrigger value="wallets"><Wallet className="mr-2"/>Wallets</TabsTrigger>
            </TabsList>
            <TabsContent value="card">
                 <Card>
                    <CardHeader>
                        <CardTitle>Credit/Debit Card</CardTitle>
                        <CardDescription>Enter your card details. Payment is secure and encrypted.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input id="card-number" placeholder="0000 0000 0000 0000" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="card-name">Name on Card</Label>
                            <Input id="card-name" placeholder="Priya Sharma" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="expiry">Expiry</Label>
                                <Input id="expiry" placeholder="MM/YY" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="cvv">CVV</Label>
                                <Input id="cvv" placeholder="123" />
                            </div>
                        </div>
                         <div className="flex items-center space-x-2 pt-2">
                            <Checkbox id="save-card" />
                            <Label htmlFor="save-card" className="font-normal">Save this card for future purchases</Label>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="upi">
                <Card>
                     <CardHeader>
                        <CardTitle>Pay with UPI</CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <p className="text-sm">Scan the QR code or enter your UPI ID.</p>
                        <div className="flex justify-center p-4 bg-white rounded-md">
                            <Image src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=upi://pay?pa=example@upi" alt="Demo QR Code" width={160} height={160} />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">Or Enter UPI ID</span>
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="upi-id">Your UPI ID</Label>
                            <Input id="upi-id" placeholder="yourname@bank" />
                        </div>
                     </CardContent>
                </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8">
            <Button size="lg" className="w-full h-12 text-lg">
                <Lock className="mr-2" /> Pay ₹{grandTotal.toFixed(2)}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">By clicking "Pay Now", you agree to Kriti's Terms of Service and Privacy Policy.</p>
        </main>
      </div>
    </div>
  );
}
