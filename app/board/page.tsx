
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  ChevronDown,
  Plus,
  MoreVertical,
  PinOff,
  Link as LinkIcon,
  Share2,
  Trash2,
  Edit,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { products, artisans } from '@/lib/data';
import { ProductCard } from '@/components/product-card';

const userBoards = [
  {
    id: 'board-1',
    name: 'Diwali Decorations',
    description: 'Beautiful handmade items to light up my home for the festival of lights.',
    itemCount: 8,
    images: ['madhubani-fish', 'dhokra-bull', 'blue-pottery-mugs', 'madhubani-tree'],
  },
  {
    id: 'board-2',
    name: 'Wedding Gift Ideas',
    description: 'Unique and thoughtful gifts for the happy couple.',
    itemCount: 5,
    images: ['indigo-shawl', 'kalamkari-mahabharata', 'kashmiri-box', 'ajrakh-fabric'],
  },
  {
    id: 'board-3',
    name: 'Kalamkari Collection',
    description: 'Exploring the intricate art of Kalamkari from Andhra Pradesh.',
    itemCount: 3,
    images: ['kalamkari-mahabharata', 'man-scroll-painter', 'pattachitra-ramayana'],
  },
];

const pinnedItems = [
    { type: 'product', data: products.find(p => p.id === 'prod-6') },
    { type: 'product', data: products.find(p => p.id === 'prod-11') },
    { type: 'artisan', data: artisans.find(a => a.id === 'artisan-1') },
    { type: 'product', data: products.find(p => p.id === 'prod-1') },
    { type: 'product', data: products.find(p => p.id === 'prod-12') },
    { type: 'product', data: products.find(p => p.id === 'prod-4') },
];

export default function BoardPage() {
  return (
    <div className="space-y-12">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-headline text-4xl font-bold tracking-tight">My Boards</h1>
          <p className="mt-2 text-lg text-muted-foreground">Your personal space to collect and organize your inspirations.</p>
        </div>
        <div className="flex gap-2">
            <Dialog>
                <DialogTrigger asChild>
                    <Button><Plus className="mr-2"/> Create New Board</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create a New Board</DialogTitle>
                        <DialogDescription>Give your new collection a name and a short description.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="board-name">Board Name</Label>
                            <Input id="board-name" placeholder="e.g., 'Home Decor Ideas'" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="board-description">Description (Optional)</Label>
                            <Input id="board-description" placeholder="A few words about your collection" />
                        </div>
                    </div>
                    <Button>Create Board</Button>
                </DialogContent>
            </Dialog>
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Filter Boards <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All Boards</DropdownMenuItem>
              <DropdownMenuItem>Crafts</DropdownMenuItem>
              <DropdownMenuItem>Stories</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Board Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {userBoards.map((board) => (
          <Card key={board.id} className="group/board-card overflow-hidden flex flex-col">
            <CardContent className="p-4 flex-grow">
              <div className="grid grid-cols-2 grid-rows-2 gap-2 aspect-square mb-4">
                <div className="col-span-2 row-span-2 relative rounded-md overflow-hidden">
                  <Image src={`https://picsum.photos/seed/${board.images[0]}/400/400`} alt="Board image 1" fill className="object-cover"/>
                </div>
                <div className="col-span-1 row-span-1 relative rounded-md overflow-hidden">
                   <Image src={`https://picsum.photos/seed/${board.images[1]}/200/200`} alt="Board image 2" fill className="object-cover"/>
                </div>
                 <div className="col-span-1 row-span-1 relative rounded-md overflow-hidden">
                    <Image src={`https://picsum.photos/seed/${board.images[2]}/200/200`} alt="Board image 3" fill className="object-cover"/>
                </div>
              </div>
               <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover/board-card:opacity-100 transition-opacity">
                   <Button variant="secondary" size="icon" className="h-8 w-8"><Edit/></Button>
                   <Button variant="destructive" size="icon" className="h-8 w-8"><Trash2/></Button>
                </div>
              <h3 className="font-headline text-xl font-bold">{board.name}</h3>
              <p className="text-sm text-muted-foreground">{board.itemCount} items</p>
            </CardContent>
            <CardFooter className="p-4 border-t">
              {/* This would link to the individual board page, e.g., `/board/${board.id}` */}
               <Button variant="outline" className="w-full" asChild>
                    <Link href="#individual-board">View Board</Link>
                </Button>
            </CardFooter>
          </Card>
        ))}
      </section>

      <Separator />

      {/* Individual Board View (Example) */}
      <section id="individual-board">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="font-headline text-3xl font-bold tracking-tight">Board: {userBoards[0].name}</h2>
            <p className="mt-1 text-muted-foreground max-w-xl">{userBoards[0].description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline"><Plus className="mr-2"/>Add Items</Button>
            <Dialog>
                <DialogTrigger asChild>
                    <Button><Share2 className="mr-2"/> Share Board</Button>
                </DialogTrigger>
                <DialogContent>
                     <DialogHeader>
                        <DialogTitle>Share "{userBoards[0].name}"</DialogTitle>
                        <DialogDescription>Copy the link below or share directly to your favorite social platforms.</DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2 py-4">
                        <Input value={`https://kriti.app/board/${userBoards[0].id}`} readOnly />
                        <Button size="icon">
                            <LinkIcon />
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {pinnedItems.map((item, index) => (
            <Card key={index} className="group/item-card overflow-hidden">
                {item.type === 'product' && item.data && (
                    <div className="relative">
                        <ProductCard product={item.data as any} />
                         <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover/item-card:opacity-100 transition-opacity">
                            <PinOff />
                        </Button>
                    </div>
                )}
                 {item.type === 'artisan' && item.data && (
                    <div className="relative">
                        <CardContent className="p-4 flex flex-col items-center text-center">
                             <Image src={(item.data as any).avatarUrl} alt={(item.data as any).name} width={120} height={120} className="rounded-full border-4 border-primary/20 mb-4"/>
                            <h3 className="font-headline text-xl font-bold">{(item.data as any).name}</h3>
                            <p className="text-muted-foreground">{ (item.data as any).tradition}</p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" asChild className="w-full">
                                <Link href={`/artisans/${(item.data as any).id}`}>View Profile</Link>
                            </Button>
                        </CardFooter>
                         <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover/item-card:opacity-100 transition-opacity">
                            <PinOff />
                        </Button>
                    </div>
                 )}
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
