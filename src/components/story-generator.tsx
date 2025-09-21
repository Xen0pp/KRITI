
'use client';

import { useState, useTransition } from 'react';
import type { Artisan, Product } from '@/lib/types';
import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useToast } from '@/hooks/use-toast';
import { generateStoryAction } from '@/app/actions';
import { useLanguage } from '@/hooks/use-language';

interface StoryGeneratorProps {
  product: Product;
  artisan: Artisan;
}

export default function StoryGenerator({ product, artisan }: StoryGeneratorProps) {
  const [story, setStory] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleGenerateStory = () => {
    startTransition(async () => {
      const result = await generateStoryAction(product, artisan);
      if ('error' in result) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: t('product.storyError'),
        });
      } else {
        setStory(result.story);
      }
    });
  };

  return (
    <section>
      <Card className="bg-card/50 border-dashed">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl tracking-tight">
            {t('product.storyBehindCraft')}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center min-h-[15rem] text-center">
          {isPending ? (
            <div className="flex flex-col items-center gap-2">
              <Sparkles className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">{t('product.storyGenerating')}</p>
            </div>
          ) : story ? (
            <div className="prose prose-lg max-w-none text-left font-body text-foreground/80 leading-relaxed">
              {story.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <p className="max-w-md text-muted-foreground">
                {t('product.storyPrompt')}
              </p>
              <Button onClick={handleGenerateStory} disabled={isPending} variant="secondary">
                <Sparkles className="mr-2 h-4 w-4" />
                {t('product.storyUnveil')}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
