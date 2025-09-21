
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Banknote,
  Gift,
  Heart,
  Plus,
  Wallet as WalletIcon,
} from 'lucide-react';
import Link from 'next/link';

const walletBalance = 1250.5;
const totalDonated = 250;

const transactionHistory = [
  {
    type: 'credit',
    description: 'Sale of "Indigo Ajrakh Stole"',
    amount: 1500.0,
    date: 'June 20, 2024',
  },
  {
    type: 'debit',
    description: 'Withdrawal to Bank Account',
    amount: -5000.0,
    date: 'June 15, 2024',
  },
  {
    type: 'credit',
    description: 'Cashback from Diwali Sale',
    amount: 150.5,
    date: 'June 14, 2024',
  },
  {
    type: 'debit',
    description: 'Micro-donation to Artisan Heritage Fund',
    amount: -50.0,
    date: 'June 12, 2024',
  },
  {
    type: 'debit',
    description: 'Purchase: "Tree of Life Madhubani Art"',
    amount: -3800.0,
    date: 'June 10, 2024',
  },
];

export default function WalletPage() {
  return (
    <div className="space-y-12">
      <header>
        <h1 className="font-headline text-4xl font-bold tracking-tight">
          Your Kriti Wallet
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Manage your balance, track your spending, and see your impact.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-8 items-start">
        {/* Left Column - Main Wallet */}
        <div className="md:col-span-2 space-y-8">
          <Card className="bg-primary/10 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Current Balance</CardTitle>
              <WalletIcon className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold">₹{walletBalance.toFixed(2)}</p>
              <p className="text-sm text-primary/80 mt-1">
                This balance can be used for purchases or withdrawn by sellers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                A log of your recent wallet transactions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactionHistory.map((tx, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          tx.type === 'credit'
                            ? 'bg-green-100 dark:bg-green-900'
                            : 'bg-red-100 dark:bg-red-900'
                        }`}
                      >
                        {tx.type === 'credit' ? (
                          <ArrowDown className="h-5 w-5 text-green-600" />
                        ) : (
                          <ArrowUp className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold">{tx.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {tx.date}
                        </p>
                      </div>
                    </div>
                    <p
                      className={`font-bold text-lg ${
                        tx.type === 'credit'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {tx.amount < 0
                        ? `- ₹${Math.abs(tx.amount).toFixed(2)}`
                        : `+ ₹${tx.amount.toFixed(2)}`}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Actions and Impact */}
        <div className="md:col-span-1 space-y-6 sticky top-24">
          <Card>
            <CardHeader>
              <CardTitle>Wallet Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg">
                    <Plus className="mr-2" /> Add Money
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Money to Wallet</DialogTitle>
                    <DialogDescription>
                      Top up your wallet using your preferred payment method.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="add-amount">Amount</Label>
                      <Input
                        id="add-amount"
                        type="number"
                        placeholder="e.g., 500"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You will be redirected to our secure payment gateway.
                    </p>
                  </div>
                  <Button>Proceed to Add ₹500</Button>
                </DialogContent>
              </Dialog>
              <Button asChild variant="outline" size="lg">
                <Link href="/payouts">
                  <Banknote className="mr-2" /> Withdraw (Sellers)
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="text-accent fill-current" />
                Your Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                You've donated a total of{' '}
                <span className="font-bold text-primary">
                  ₹{totalDonated.toFixed(2)}
                </span>{' '}
                to artisan funds!
              </p>
              <Progress value={(totalDonated / 500) * 100} />
              <Button variant="link" className="p-0 h-auto text-sm" asChild>
                <Link href="#">
                  Learn more about your impact{' '}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          
           <Card className="bg-secondary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="text-accent"/> Festive Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="font-semibold text-secondary-foreground">Get 10% cashback on purchases over ₹1000 during the Diwali sale!</p>
                <Button variant="outline" size="sm" className="mt-4">Shop Now</Button>
            </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
