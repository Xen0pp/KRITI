
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function ProductPhotographyGuidePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-4xl">A Guide to Product Photography</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none text-foreground/80 leading-relaxed">
            <p>Taking stunning photos of your crafts is crucial for attracting customers. You don't need a fancy camera; your smartphone is powerful enough! This guide will walk you through the basics of lighting, composition, and editing to make your products shine.</p>

            <div className="relative aspect-video rounded-lg overflow-hidden my-8">
                <Image src="https://picsum.photos/seed/phone-photography-craft/1200/675" alt="A person taking a photo of pottery with a smartphone" fill className="object-cover" data-ai-hint="phone photography craft" />
            </div>

            <h3 className="font-headline text-2xl">1. Find the Right Light</h3>
            <p>Natural light is your best friend. Avoid harsh, direct sunlight which creates strong shadows. Instead, find a spot near a window with soft, indirect light. An overcast day is perfect for product photography!</p>

            <h3 className="font-headline text-2xl">2. Create a Simple Background</h3>
            <p>You want your product to be the star. Use a simple, uncluttered background. A plain wall, a large sheet of paper, or a clean piece of fabric works well. Neutral colors like white, grey, or beige are great starting points.</p>

            <h3 className="font-headline text-2xl">3. Master the Angles</h3>
            <p>Don't just take one photo. Move around your product and shoot from different angles:</p>
            <ul>
                <li><strong>Eye-Level:</strong> A straightforward shot that shows the product clearly.</li>
                <li><strong>High Angle:</strong> Looking down on the product. Great for flat items like coasters or textiles.</li>
                <li><strong>Close-Up/Detail Shot:</strong> Get close to show off the texture and intricate details of your craft. This is where the story of your handwork is told.</li>
            </ul>

            <h3 className="font-headline text-2xl">4. Edit for Polish</h3>
            <p>A little editing can make a big difference. Use your phone's built-in editor or a free app like Snapseed or Adobe Lightroom Mobile to make small adjustments.</p>
            <ul>
                <li><strong>Brightness:</strong> Make sure your photo is bright enough to see details clearly.</li>
                <li><strong>Contrast:</strong> Add a little contrast to make the colors pop.</li>
                <li><strong>Sharpening:</strong> A touch of sharpening can make the details look crisp.</li>
            </ul>
            <p>With these simple tips, you can create beautiful, professional-looking photos that do justice to your incredible craft!</p>
        </CardContent>
      </Card>
    </div>
  );
}
