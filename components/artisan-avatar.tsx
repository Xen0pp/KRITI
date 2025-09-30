
'use client';
import Image from 'next/image';
import type { Artisan } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/hooks/use-language';

interface ArtisanAvatarProps {
  artisan: Artisan;
}

export function ArtisanAvatar({ artisan }: ArtisanAvatarProps) {
  const { t } = useLanguage();
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-12 w-12 border-2 border-primary/50">
        <AvatarImage src={artisan.avatarUrl} alt={artisan.name} data-ai-hint={artisan.avatarHint} />
        <AvatarFallback>{artisan.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm text-muted-foreground">{t('product.craftedBy')}</p>
        <p className="font-semibold text-primary-foreground group-hover:text-primary transition-colors">
          {artisan.name}
        </p>
      </div>
    </div>
  );
}
