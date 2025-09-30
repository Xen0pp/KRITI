
'use client';

import { useState, useCallback, useTransition } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Download, Share2, Film } from 'lucide-react';
import { applyFilterAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

const artFilters = [
  { id: 'Madhubani', name: 'Madhubani Filter' },
  { id: 'Warli', name: 'Warli Overlay' },
  { id: 'Pattachitra', name: 'Pattachitra Style' },
  { id: 'Gond', name: 'Gond Art' },
];

const inspirationGallery = [
  { id: 'ex1', before: 'https://picsum.photos/seed/woman-face/500/500', after: 'https://picsum.photos/seed/woman-face-art/500/500', hint: 'portrait person' },
  { id: 'ex2', before: 'https://picsum.photos/seed/cat-photo/500/500', after: 'https://picsum.photos/seed/cat-art/500/500', hint: 'cat animal' },
  { id: 'ex3', before: 'https://picsum.photos/seed/building-photo/500/500', after: 'https://picsum.photos/seed/building-art/500/500', hint: 'building architecture' },
  { id: 'ex4', before: 'https://picsum.photos/seed/mountain-photo/500/500', after: 'https://picsum.photos/seed/mountain-art/500/500', hint: 'landscape mountains' },
];

export default function NikharPage() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setOriginalImage(reader.result as string);
      setTransformedImage(null); // Reset transformed image on new upload
      setActiveFilter(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png'] },
    multiple: false,
  });

  const applyFilter = (filterId: string) => {
    if (!originalImage) return;

    setActiveFilter(filterId);
    setTransformedImage(null); // Clear previous result

    startTransition(async () => {
      const result = await applyFilterAction(originalImage, filterId);
      if ('error' in result) {
        toast({
          variant: 'destructive',
          title: 'AI Transformation Failed',
          description: result.error,
        });
        setTransformedImage(null);
      } else {
        setTransformedImage(result.transformedImageUri);
      }
    });
  };

  const isLoading = isPending;

  return (
    <div className="space-y-16">
      <section className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
          Transform Your Photos with Nikhar AI
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Upload your photo and watch our AI transform it into a piece of cultural art!
        </p>
      </section>

      <Card className="w-full max-w-6xl mx-auto">
        <CardContent className="p-6">
          {!originalImage ? (
            <div
              {...getRootProps()}
              className={`flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${isDragActive ? 'border-primary bg-primary/10' : 'border-border'}`}
            >
              <input {...getInputProps()} />
              <Upload className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-semibold">Drag & drop your photo here</p>
              <p className="text-muted-foreground">or click to upload</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Left Column: Original and Transformed Images */}
              <Tabs defaultValue="original" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="original">Original</TabsTrigger>
                  <TabsTrigger value="transformed" disabled={!transformedImage && !isLoading}>
                    Transformed
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="original">
                   <div className="aspect-square relative mt-4 rounded-lg overflow-hidden border">
                     <Image src={originalImage} alt="Original upload" fill className="object-cover" />
                   </div>
                </TabsContent>
                <TabsContent value="transformed">
                  <div className="aspect-square relative mt-4 rounded-lg overflow-hidden border bg-muted flex items-center justify-center">
                    {isLoading ? (
                       <div className="flex flex-col items-center gap-2">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                          <p className="text-muted-foreground">Applying {activeFilter} filter...</p>
                        </div>
                    ) : transformedImage ? (
                      <Image src={transformedImage} alt="Transformed" fill className="object-cover" />
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <p>Select a style to begin the transformation.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              {/* Right Column: Filters and Actions */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-headline mb-4">Choose a Style</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {artFilters.map((filter) => (
                      <Button
                        key={filter.id}
                        variant={activeFilter === filter.id ? 'default' : 'secondary'}
                        onClick={() => applyFilter(filter.id)}
                        disabled={isLoading}
                      >
                        {filter.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                     <h3 className="text-xl font-bold font-headline">Download & Share</h3>
                     <div className="flex gap-3">
                        <Button className="flex-1" disabled={!transformedImage || isLoading}>
                            <Download className="mr-2" /> Download
                        </Button>
                        <Button variant="outline" className="flex-1" disabled={!transformedImage || isLoading}>
                            <Share2 className="mr-2" /> Share
                        </Button>
                    </div>
                     <Button variant="outline" className="w-full" disabled={!transformedImage || isLoading}>
                        <Film className="mr-2" /> Generate Reel
                    </Button>
                </div>
                 <Button variant="outline" className="w-full" onClick={() => { setOriginalImage(null); setTransformedImage(null); }}>
                    <Upload className="mr-2"/> Upload Another Photo
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
       {/* Inspiration Gallery */}
      <section>
        <h2 className="font-headline text-3xl font-bold tracking-tight mb-8 text-center">
          Get Inspired
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {inspirationGallery.map((item) => (
            <Card key={item.id} className="overflow-hidden group">
              <CardContent className="p-2 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                    <div className="aspect-square relative rounded-md overflow-hidden">
                        <Image src={item.before} alt="Before" fill className="object-cover" data-ai-hint={item.hint} />
                         <div className="absolute bottom-0 left-0 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded-tr-md">Before</div>
                    </div>
                     <div className="aspect-square relative rounded-md overflow-hidden">
                        <Image src={item.after} alt="After" fill className="object-cover" data-ai-hint={item.hint} />
                        <div className="absolute bottom-0 left-0 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-tr-md">After</div>
                    </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
