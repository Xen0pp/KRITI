
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function ArtisanBioGuidePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-4xl">How to Write Your Artisan Bio</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none text-foreground/80 leading-relaxed">
            <p>Your bio is more than just a description; it's your story. A compelling bio helps you connect with customers on a personal level, turning them from simple buyers into loyal fans of your work. Here’s how to craft a story that resonates.</p>
            
            <div className="relative aspect-video rounded-lg overflow-hidden my-8">
                <Image src="https://picsum.photos/seed/artisan-writing/1200/675" alt="An artisan smiling while working on their craft" fill className="object-cover" data-ai-hint="artisan writing story" />
            </div>

            <h3 className="font-headline text-2xl">1. Start with Your "Why"</h3>
            <p>Don't just say what you do; share why you do it. What does your craft mean to you? Is it a family tradition? A passion you discovered? Your "why" is the heart of your story.</p>
            <blockquote>Example: "For me, Madhubani painting isn't just an art form; it's a connection to my ancestors. Every line I draw is a story my grandmother first told me."</blockquote>

            <h3 className="font-headline text-2xl">2. Describe Your Craft</h3>
            <p>Briefly explain your art form to someone who might not be familiar with it. What materials do you use? What makes the process special? Highlight the "handmade" aspect of your work.</p>
            <blockquote>Example: "I use natural dyes made from flowers and minerals, and my brushes are simple bamboo twigs. Each Ajrakh block is carved by hand, making every print unique."</blockquote>
            
            <h3 className="font-headline text-2xl">3. Share Your Journey</h3>
            <p>Include a few key moments from your life as an artisan. This makes your story relatable and shows your dedication. This is what your timeline on your profile page is for!</p>
            <ul>
                <li>When did you start?</li>
                <li>Who taught you?</li>
                <li>What has been a proud moment for you?</li>
            </ul>

            <h3 className="font-headline text-2xl">4. Talk About Your Impact</h3>
            <p>Share how your work impacts your life and your community. Do you teach others? Does your craft support your family? This adds a powerful human element to your brand.</p>
            <blockquote>Example: "The income from my pottery helps fund my children's education. I've also started teaching the young girls in my village, hoping to pass this tradition to the next generation."</blockquote>

            <p>Remember, your story is unique and valuable. Write from the heart, be authentic, and let your passion for your craft shine through. Customers will connect with the person behind the product.</p>

        </CardContent>
      </Card>
    </div>
  );
}
