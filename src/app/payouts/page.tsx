
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Banknote,
  Calendar,
  Heart,
  Plus,
  Landmark,
} from 'lucide-react';

const transactionHistory = [
  {
    date: 'June 20, 2024',
    type: 'Sale',
    description: 'Sale of "Indigo Ajrakh Stole"',
    amount: '+ ₹1500.00',
    status: 'Completed',
  },
  {
    date: 'June 18, 2024',
    type: 'Sale',
    description: 'Sale of "Tree of Life Madhubani Art"',
    amount: '+ ₹3800.00',
    status: 'Completed',
  },
  {
    date: 'June 15, 2024',
    type: 'Withdrawal',
    description: 'Withdrawal to Bank Account',
    amount: '- ₹5000.00',
    status: 'Completed',
  },
  {
    date: 'June 15, 2024',
    type: 'Fee',
    description: 'Platform Commission (5%)',
    amount: '- ₹265.00',
    status: 'Completed',
  },
  {
    date: 'June 12, 2024',
    type: 'Sale',
    description: 'Sale of "Kashmiri Paper Mache Box"',
    amount: '+ ₹2200.00',
    status: 'Pending',
  },
];

const customerFeedback = [
    { customer: "Anjali P.", message: "Your work is stunning! So happy to support your craft.", tip: 100 },
    { customer: "Rohan M.", message: "The quality is amazing. Thank you for keeping this tradition alive.", tip: 50 },
];

export default function PayoutsPage() {
  return (
    <div className="space-y-12">
      <header>
        <h1 className="font-headline text-4xl font-bold tracking-tight">Your Payouts</h1>
        <p className="mt-2 text-lg text-muted-foreground">Track your earnings and manage your bank details.</p>
      </header>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Current Balance</CardTitle>
                <Banknote className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <p className="text-4xl font-bold">₹2,235.00</p>
                <p className="text-sm text-muted-foreground">Available for withdrawal</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Total Lifetime Earnings</CardTitle>
                <Calendar className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <p className="text-4xl font-bold">₹87,450.00</p>
                <p className="text-sm text-muted-foreground">Since joining Kriti</p>
            </CardContent>
        </Card>
      </section>

      {/* Payout Management */}
      <section>
        <div className="grid md:grid-cols-2 gap-8 items-start">
            <Card>
                <CardHeader>
                    <CardTitle>Request Withdrawal</CardTitle>
                    <CardDescription>Transfer your balance to your bank account.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="withdraw-amount">Amount</Label>
                        <Input id="withdraw-amount" type="number" placeholder="e.g., 2000" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="payout-method">Payout Method</Label>
                        <Select>
                            <SelectTrigger id="payout-method">
                                <SelectValue placeholder="Select account" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="bank-1">HDFC Bank ...1234</SelectItem>
                                <SelectItem value="upi-1">meena.artist@upi</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button className="w-full">Withdraw Now</Button>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Payout Methods</CardTitle>
                    <CardDescription>Your saved bank accounts and UPI IDs.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                            <Landmark className="h-6 w-6" />
                            <div>
                                <p className="font-semibold">HDFC Bank</p>
                                <p className="text-sm text-muted-foreground">...1234</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm">Remove</Button>
                    </div>
                     <Button variant="outline" className="w-full"><Plus className="mr-2"/> Add New Payout Method</Button>
                </CardContent>
            </Card>
        </div>
      </section>

      <Separator />

      {/* Transaction History */}
      <section>
        <h2 className="font-headline text-3xl font-bold tracking-tight mb-8">Transaction History</h2>
         <Card>
            <CardContent className="p-0">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="w-[50%]">Description</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactionHistory.map((tx, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{tx.date}</TableCell>
                        <TableCell>
                            <Badge variant={
                                tx.type === 'Sale' ? 'default' :
                                tx.type === 'Withdrawal' ? 'secondary' : 'destructive'
                            }>{tx.type}</Badge>
                        </TableCell>
                        <TableCell>{tx.description}</TableCell>
                        <TableCell className={`text-right font-semibold ${tx.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{tx.amount}</TableCell>
                        <TableCell>
                            <Badge variant={tx.status === 'Completed' ? 'outline' : 'default'}>{tx.status}</Badge>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </CardContent>
        </Card>
      </section>
      
      <Separator/>

      {/* Impact Insights */}
       <section>
        <h2 className="font-headline text-3xl font-bold tracking-tight mb-8">Your Impact</h2>
         <Card className="bg-secondary/30">
            <CardContent className="p-6 grid md:grid-cols-2 gap-8">
                <div className="flex flex-col justify-center text-center items-center p-6 bg-background rounded-lg">
                    <p className="text-lg text-muted-foreground">You are preserving the</p>
                    <p className="text-3xl font-bold text-primary my-2">Madhubani Painting</p>
                    <p className="text-lg text-muted-foreground">tradition passed down for</p>
                    <p className="text-3xl font-bold text-primary mt-2">8 generations.</p>
                </div>

                <div className="space-y-4">
                    <h3 className="font-headline text-2xl font-bold flex items-center gap-2"><Heart className="text-accent fill-accent"/> Words from Your Supporters</h3>
                    {customerFeedback.map((feedback, index) => (
                        <div key={index} className="p-4 bg-background/50 rounded-lg">
                            <p className="italic">"{feedback.message}"</p>
                            <p className="text-sm font-semibold text-right mt-2">- {feedback.customer} (Tipped ₹{feedback.tip})</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
      </section>

    </div>
  );
}
