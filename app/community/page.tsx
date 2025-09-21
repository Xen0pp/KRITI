
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { artisans } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Users, Award } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const collabSuggestions = artisans.slice(0, 3).map((artisan, index) => ({
    ...artisan,
    matchReason: index === 0 ? "Works with similar materials" : "Regional connection",
}));

const userBoards = [
    { id: 'board-1', name: 'Cozy Living', creator: 'Anjali P.', images: ['madhubani-tree', 'ajrakh-fabric', 'bhil-festival'] },
    { id: 'board-2', name: 'Wedding Season', creator: 'Rohan M.', images: ['indigo-shawl', 'kalamkari-mahabharata', 'kashmiri-box'] },
    { id: 'board-3', name: 'Diwali Decor', creator: 'Priya K.', images: ['madhubani-fish', 'dhokra-bull', 'blue-pottery-mugs'] },
];

const festivalHighlights = [
    { name: 'Holi Bazaar 2024', imageSeed: 'holi', hint: 'holi festival' },
    { name: 'Diwali Showcase 2023', imageSeed: 'diwali', hint: 'diwali celebration' },
    { name: 'Monsoon Crafts Fair', imageSeed: 'monsoon', hint: 'rainy market' },
];

const forumTopics = [
    { title: "Tips for shipping fragile pottery?", replies: 12, category: "Artisan Help" },
    { title: "Looking for a weaver for a custom sari!", replies: 5, category: "Collabs" },
    { title: "Showcase your latest creation!", replies: 34, category: "Show & Tell" },
];


export default function CommunityPage() {
  return (
    <div className="space-y-16">
      <section className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Community Hub</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Connect with artisans, discover unique collections, and join the conversation.
        </p>
      </section>

      {/* Artisan Collab Suggestions */}
      <section>
        <h2 className="font-headline text-3xl font-bold tracking-tight mb-8 text-center">
          Find Your Next Collaboration
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {collabSuggestions.map(artisan => (
            <Card key={artisan.id} className="text-center">
              <CardContent className="p-6">
                <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-primary/20">
                  <AvatarImage src={artisan.avatarUrl} alt={artisan.name} />
                  <AvatarFallback>{artisan.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="font-headline text-xl font-bold">{artisan.name}</h3>
                <p className="text-muted-foreground">{artisan.tradition}</p>
                <Badge variant="secondary" className="mt-2">{artisan.matchReason}</Badge>
              </CardContent>
              <CardFooter>
                 <Button asChild className="w-full">
                  <Link href="/messages"><MessageSquare className="mr-2"/>Connect Now</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* User Boards Section */}
      <section>
        <h2 className="font-headline text-3xl font-bold tracking-tight mb-8 text-center">
          Explore Cultural Moodboards
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {userBoards.map(board => (
                 <Card key={board.id} className="group overflow-hidden">
                    <CardContent className="p-4">
                        <div className="grid grid-cols-2 gap-2 aspect-square mb-4">
                            <div className="col-span-2 row-span-2 relative rounded-md overflow-hidden">
                                <Image src={`https://picsum.photos/seed/${board.images[0]}/400/400`} alt="Board image 1" fill className="object-cover"/>
                            </div>
                            <div className="relative rounded-md overflow-hidden">
                                <Image src={`https://picsum.photos/seed/${board.images[1]}/200/200`} alt="Board image 2" fill className="object-cover"/>
                            </div>
                             <div className="relative rounded-md overflow-hidden">
                                <Image src={`https://picsum.photos/seed/${board.images[2]}/200/200`} alt="Board image 3" fill className="object-cover"/>
                            </div>
                        </div>
                        <h3 className="font-headline text-xl font-bold">{board.name}</h3>
                        <p className="text-sm text-muted-foreground">by {board.creator}</p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full" asChild>
                            <Link href="/board">View Board</Link>
                        </Button>
                    </CardFooter>
                 </Card>
            ))}
        </div>
      </section>
      
      {/* Digital Festival Highlights */}
      <section>
        <h2 className="font-headline text-3xl font-bold tracking-tight mb-8 text-center">
            A Walk Down Memory Lane
        </h2>
        <Carousel opts={{ align: 'start' }} className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {festivalHighlights.map((festival) => (
              <CarouselItem key={festival.name} className="md:basis-1/2 lg:basis-1/3">
                <Link href="/events" className="block group">
                  <Card className="overflow-hidden">
                    <CardContent className="p-0 relative aspect-video">
                      <Image
                        src={`https://picsum.photos/seed/${festival.imageSeed}/800/450`}
                        alt={festival.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={festival.hint}
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-end p-4">
                        <h3 className="font-headline text-2xl font-bold text-white">{festival.name}</h3>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </section>

      {/* Community Forum */}
      <section>
        <h2 className="font-headline text-3xl font-bold tracking-tight mb-8 text-center">
            Join the Conversation
        </h2>
        <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6 space-y-4">
                 {forumTopics.map(topic => (
                     <div key={topic.title} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                            <p className="font-semibold">{topic.title}</p>
                            <Badge variant="outline" className="mt-1">{topic.category}</Badge>
                        </div>
                        <div className="text-right">
                             <p className="font-bold text-lg">{topic.replies}</p>
                             <p className="text-sm text-muted-foreground">Replies</p>
                        </div>
                     </div>
                 ))}
                 <Button className="w-full mt-4" asChild>
                    <Link href="/community">View All Discussions</Link>
                 </Button>
            </CardContent>
        </Card>
      </section>
    </div>
  );
}
