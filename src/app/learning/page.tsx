
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { FileText, PlayCircle, Bot } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const tutorials = [
  {
    title: 'Safe Shipping: How to Pack Your Pottery',
    description: 'Learn the best techniques to ensure your fragile pottery arrives safely.',
    imageSeed: 'packing-pottery',
    imageHint: 'packing pottery safely'
  },
  {
    title: 'Social Media Hacks for Artisans',
    description: 'Boost your online presence and reach more customers with these simple tips.',
    imageSeed: 'social-media-art',
    imageHint: 'artisan social media'
  },
  {
    title: 'Photographing Your Crafts Like a Pro',
    description: 'Take stunning photos of your products using just your smartphone.',
    imageSeed: 'product-photography-setup',
    imageHint: 'craft photography'
  },
];

const guides = [
  {
    title: 'A Guide to Product Photography',
    description: 'Master the basics of lighting, composition, and editing.',
    href: '/learning/guides/product-photography',
  },
  {
    title: 'Understanding Your Sales Dashboard',
    description: 'Learn how to track your performance and make data-driven decisions.',
    href: '/learning/guides/sales-dashboard',
  },
  {
    title: 'How to Write Your Artisan Bio',
    description: 'Craft a compelling story that connects with customers.',
    href: '/learning/guides/artisan-bio',
  },
];

export default function LearningPage() {
  return (
    <div className="space-y-16">
      <section className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
          Learn & Grow
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Empower your craft with the knowledge you need to succeed.
        </p>
      </section>

      {/* Video Tutorials Section */}
      <section>
        <h2 className="font-headline text-3xl font-bold tracking-tight mb-8 text-center">
          Video Tutorials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tutorials.map((tutorial) => (
            <Card key={tutorial.title} className="group overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative aspect-video">
                  <Image
                    src={`https://picsum.photos/seed/${tutorial.imageSeed}/800/450`}
                    alt={tutorial.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={tutorial.imageHint}
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <PlayCircle className="h-16 w-16 text-white/80 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="font-headline text-xl">
                  {tutorial.title}
                </CardTitle>
                <CardDescription className="mt-2">
                  {tutorial.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" className="w-full">
                  Watch Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        {/* AI Tutor Section */}
        <section>
          <h2 className="font-headline text-3xl font-bold tracking-tight mb-8 text-center">
            Ask Kriti's AI Tutor
          </h2>
          <Card className="flex flex-col h-full">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 bg-primary/20 rounded-full">
                 <Bot className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle>Your Personal Assistant</CardTitle>
                <CardDescription>
                  I can answer in your language! Ask me anything.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-4 flex flex-col">
              <div className="p-4 bg-muted rounded-lg flex-grow">
                 {/* This could be a scrollable chat history */}
                <p className="text-sm text-muted-foreground italic">
                    Example: "How do I set up my Payouts?"
                </p>
              </div>
              <Textarea placeholder="Ask a question..." rows={3} />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Send Message</Button>
            </CardFooter>
          </Card>
        </section>

        {/* Interactive Guides Section */}
        <section>
          <h2 className="font-headline text-3xl font-bold tracking-tight mb-8 text-center">
            Step-by-Step Guides
          </h2>
          <div className="space-y-4">
            {guides.map((guide) => (
              <Card key={guide.title}>
                <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <FileText className="h-6 w-6 text-primary" />
                        <div>
                            <p className="font-semibold">{guide.title}</p>
                            <p className="text-sm text-muted-foreground">{guide.description}</p>
                        </div>
                    </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={guide.href}>Read Guide</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
