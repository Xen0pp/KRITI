'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, Video, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const upcomingFestivals = [
  {
    name: 'Holi: The Festival of Colors',
    dates: 'March 24-25, 2025',
    imageSeed: 'holi-festival',
    imageHint: 'holi colors',
    description: 'Join our vibrant celebration of spring with exclusive collections of colorful textiles and crafts.',
  },
  {
    name: 'Diwali: The Festival of Lights',
    dates: 'October 20-24, 2024',
    imageSeed: 'diwali-lights',
    imageHint: 'diwali lamps',
    description: 'Illuminate your homes with our handcrafted lamps, decor, and unique gifts for the festive season.',
  },
  {
    name: 'Navaratri: A Celebration of Dance',
    dates: 'October 3-12, 2024',
    imageSeed: 'garba-dance',
    imageHint: 'traditional dance',
    description: 'Discover traditional attire and accessories perfect for the nine nights of dance and festivities.',
  },
];

const bazaarStalls = [
    { artisanName: 'Lalita Devi', craft: 'Madhubani Art', imageSeed: 'stall1', imageHint: 'artisan stall' },
    { artisanName: 'Ismail Khatri', craft: 'Ajrakh Printing', imageSeed: 'stall2', imageHint: 'textile market' },
    { artisanName: 'Anwar Chitrakar', craft: 'Pattachitra Scrolls', imageSeed: 'stall3', imageHint: 'painting workshop' },
    { artisanName: 'Bhuri Bai', craft: 'Bhil Painting', imageSeed: 'stall4', imageHint: 'tribal art' },
];

const liveWorkshops = [
    { name: 'Introduction to Block Printing', artisan: 'Ismail Khatri', date: new Date(new Date().setDate(new Date().getDate() + 5)), time: '2:00 PM' },
    { name: 'The Art of Madhubani', artisan: 'Lalita Devi', date: new Date(new Date().setDate(new Date().getDate() + 7)), time: '4:00 PM', isLive: true },
    { name: 'Natural Dye Making', artisan: 'Anwar Chitrakar', date: new Date(new Date().setDate(new Date().getDate() + 10)), time: '11:00 AM' },
]

export default function EventsPage() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <div className="space-y-16">
      {/* Header */}
      <section className="relative -mx-8 -mt-8 h-80 w-full overflow-hidden">
        <Image
          src="https://picsum.photos/seed/events-banner/1600/400"
          alt="Festival banner"
          fill
          className="object-cover"
          data-ai-hint="indian festival"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
          <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tight">
            Events & Festivals
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            Join our celebrations of culture, craft, and community.
          </p>
        </div>
      </section>
      
      {/* Upcoming Festivals Carousel */}
      <section>
        <h2 className="font-headline text-3xl font-bold tracking-tight mb-8 text-center">
          Upcoming Festivals
        </h2>
        <Carousel opts={{ align: 'start' }} className="w-full max-w-6xl mx-auto">
          <CarouselContent>
            {upcomingFestivals.map((festival) => (
              <CarouselItem key={festival.name} className="md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden group h-full flex flex-col">
                  <CardHeader className="p-0">
                    <div className="relative aspect-video">
                      <Image
                        src={`https://picsum.photos/seed/${festival.imageSeed}/800/450`}
                        alt={festival.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={festival.imageHint}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 flex-grow">
                    <h3 className="font-headline text-xl font-bold">{festival.name}</h3>
                    <p className="text-sm font-medium text-primary">{festival.dates}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{festival.description}</p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                     <Button className="w-full">View Event <ArrowRight className="ml-2" /></Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </section>

      {/* Curated Bazaars Section */}
      <section>
        <h2 className="font-headline text-3xl font-bold tracking-tight mb-8 text-center">
          Explore Our Virtual Bazaars
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bazaarStalls.map(stall => (
                <Card key={stall.artisanName} className="group overflow-hidden">
                    <CardContent className="p-0 relative aspect-square">
                        <Image src={`https://picsum.photos/seed/${stall.imageSeed}/400/400`} alt={stall.artisanName} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={stall.imageHint} />
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4 text-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                             <h3 className="font-headline text-xl font-bold">{stall.artisanName}</h3>
                             <p className="text-sm mb-4">{stall.craft}</p>
                             <Button variant="secondary">Visit Stall</Button>
                        </div>
                         <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-0 transition-opacity">
                            <h3 className="font-headline text-lg font-bold text-white">{stall.artisanName}</h3>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      </section>

      {/* Live Workshops & Calendar */}
      <section>
        <h2 className="font-headline text-3xl font-bold tracking-tight mb-8 text-center">
          Live Workshops & Demos
        </h2>
        <Card className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-[auto_1fr] gap-8 p-6">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border hidden md:block"
                />
                <div className="space-y-4">
                    <h3 className="font-headline text-xl font-bold">Upcoming Workshops for {date?.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</h3>
                     {liveWorkshops.map(workshop => (
                        <div key={workshop.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div>
                                <p className="font-semibold">{workshop.name}</p>
                                <p className="text-sm text-muted-foreground">with {workshop.artisan}</p>
                                <p className="text-sm font-medium text-primary mt-1">{workshop.time}</p>
                            </div>
                            {workshop.isLive ? (
                                <Button size="sm" variant="destructive">Join Live</Button>
                            ) : (
                                <Button size="sm" variant="outline">Book Your Spot</Button>
                            )}
                        </div>
                     ))}
                     {liveWorkshops.length === 0 && <p className="text-muted-foreground text-center py-8">No workshops scheduled for this day.</p>}
                </div>
            </div>
        </Card>
      </section>

       {/* Behind-the-Scenes Reels */}
      <section>
        <h2 className="font-headline text-3xl font-bold tracking-tight mb-8 text-center">
            Getting Ready for the Celebrations
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[1,2,3,4,5].map(i => (
                <Dialog key={i}>
                    <DialogTrigger asChild>
                        <Card className="group overflow-hidden cursor-pointer">
                            <CardContent className="relative aspect-[9/16] p-0">
                                <Image src={`https://picsum.photos/seed/reel${i}/300/500`} alt={`Reel ${i}`} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint="artisan working" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <Video className="h-12 w-12 text-white/70" />
                                </div>
                                <div className="absolute bottom-2 left-2 text-white">
                                    <p className="font-semibold text-sm">Preparing for Diwali</p>
                                </div>
                            </CardContent>
                        </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-md p-0">
                         <div className="aspect-[9/16] bg-black flex items-center justify-center">
                            {/* Placeholder for video player */}
                            <PlayCircle className="h-24 w-24 text-white" />
                         </div>
                    </DialogContent>
                </Dialog>
            ))}
        </div>
      </section>
    </div>
  );
}
