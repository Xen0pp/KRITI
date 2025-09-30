
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Bell,
  ShoppingBag,
  IndianRupee,
  Calendar,
  MessageSquare,
  Check,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const orderUpdates = [
  {
    id: 'ord_1',
    productName: 'Indigo Ajrakh Stole',
    imageUrl: 'https://picsum.photos/seed/indigo-shawl/100/100',
    orderNumber: 'KRITI-1024',
    status: 'Shipped',
    artisanMessage: "Ismail Khatri says: 'Your product is on its way!'",
    link: '#',
  },
  {
    id: 'ord_2',
    productName: 'Tree of Life Madhubani Art',
    imageUrl: 'https://picsum.photos/seed/madhubani-tree/100/100',
    orderNumber: 'KRITI-1023',
    status: 'Order Confirmed',
    artisanMessage:
      "Lalita Devi says: 'Your product is being handmade with care!'",
    link: '#',
  },
];

const payoutUpdates = [
  {
    id: 'pay_1',
    amount: '4,500',
    date: 'June 15, 2024, 4:30 PM',
    link: '/payouts',
  },
];

const festivalAlerts = [
  {
    id: 'fest_1',
    title: 'Grand Diwali Bazaar',
    date: 'October 20, 2024',
    imageUrl: 'https://picsum.photos/seed/diwali-market/800/450',
    link: '/events',
  },
];

const messageNotifications = [
  {
    id: 'msg_1',
    sender: 'Anjali P.',
    message: 'I love the vase! Can you tell me more...?',
    avatar: 'https://picsum.photos/seed/woman-portrait/100/100',
    link: '/messages',
  },
];

const workshopReminders = [
  {
    id: 'work_1',
    title: 'Live Pottery Workshop',
    date: 'June 25, 2024, 2:00 PM',
    link: '#',
  },
];

const categoryIcons = {
    orders: <ShoppingBag className="h-6 w-6 text-primary" />,
    payouts: <IndianRupee className="h-6 w-6 text-green-600" />,
    festivals: <Calendar className="h-6 w-6 text-accent" />,
    messages: <MessageSquare className="h-6 w-6 text-blue-500" />,
    workshops: <Bell className="h-6 w-6 text-purple-500" />,
}

export default function UpdatesPage() {
  return (
    <div className="space-y-12">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-headline text-4xl font-bold tracking-tight">
            Your Updates
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            All your important alerts and news in one place.
          </p>
        </div>
        <Button variant="outline" className="mt-4 sm:mt-0">
          <Check className="mr-2" />
          Mark All as Read
        </Button>
      </header>

      <div className="space-y-8">
        {/* Order Tracking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              {categoryIcons.orders}
              <span>Order Tracking</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {orderUpdates.map((update) => (
              <Link key={update.id} href={update.link} className="block hover:bg-muted/50 p-4 rounded-lg transition-colors -m-4">
                <div className="flex items-start gap-4">
                  <Image
                    src={update.imageUrl}
                    alt={update.productName}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-grow">
                    <p className="font-semibold">{update.productName}</p>
                    <p className="text-sm text-muted-foreground">
                      Order #{update.orderNumber}
                    </p>
                    <p className="text-sm text-muted-foreground italic mt-1">
                      {update.artisanMessage}
                    </p>
                  </div>
                  <Badge variant={update.status === 'Shipped' ? 'default' : 'secondary'}>{update.status}</Badge>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Payouts & Earnings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              {categoryIcons.payouts}
              <span>Payouts & Earnings</span>
            </CardTitle>
            <CardDescription>For artisans only</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {payoutUpdates.map((payout) => (
              <Link key={payout.id} href={payout.link} className="block hover:bg-muted/50 p-4 rounded-lg transition-colors -m-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-semibold">
                            Your payout of ₹{payout.amount} has been processed.
                        </p>
                        <p className="text-sm text-muted-foreground">{payout.date}</p>
                    </div>
                    <Button variant="outline" size="sm">View Payouts</Button>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
        
        {/* Festival Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
                {categoryIcons.festivals}
                <span>Festival Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
             {festivalAlerts.map((alert) => (
              <Link key={alert.id} href={alert.link} className="block group">
                  <Card className="overflow-hidden">
                    <CardContent className="p-0 relative aspect-video">
                      <Image
                        src={alert.imageUrl}
                        alt={alert.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint="diwali event"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-end p-4">
                        <h3 className="font-headline text-2xl font-bold text-white">Join us for the {alert.title} on {alert.date}!</h3>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
             ))}
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
             {/* Artisan Messages */}
            <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                {categoryIcons.messages}
                <span>Artisan Messages</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {messageNotifications.map((msg) => (
                <Link key={msg.id} href={msg.link} className="block hover:bg-muted/50 p-4 rounded-lg transition-colors -m-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={msg.avatar} alt={msg.sender} />
                            <AvatarFallback>{msg.sender.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{msg.sender}</p>
                            <p className="text-sm text-muted-foreground truncate">{msg.message}</p>
                        </div>
                    </div>
                </Link>
                ))}
            </CardContent>
            </Card>

            {/* Workshop Reminders */}
            <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                {categoryIcons.workshops}
                <span>Workshop Reminders</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {workshopReminders.map((reminder) => (
                 <Link key={reminder.id} href={reminder.link} className="block hover:bg-muted/50 p-4 rounded-lg transition-colors -m-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-semibold">{reminder.title}</p>
                            <p className="text-sm text-muted-foreground">{reminder.date}</p>
                        </div>
                         <Button variant="secondary" size="sm">Join Now</Button>
                    </div>
                 </Link>
                ))}
            </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
