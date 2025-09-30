
'use client';

import Link from 'next/link';
import { Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';
import { LotusIcon } from '../icons/lotus-icon';
import { useLanguage } from '@/hooks/use-language';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
             <div className="flex items-center gap-2 text-primary-foreground">
              <LotusIcon className="h-6 w-6 text-primary" />
              <span className="font-body text-xl font-bold">Kriti</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{t('footer.tagline')}</p>
          </div>
          
          <div className="flex flex-col items-center text-sm">
             <div className="flex gap-6 md:gap-8">
                <Link href="#" className="text-muted-foreground hover:text-primary-foreground transition-colors">{t('footer.about')}</Link>
                <Link href="#" className="text-muted-foreground hover:text-primary-foreground transition-colors">{t('footer.contact')}</Link>
                <Link href="#" className="text-muted-foreground hover:text-primary-foreground transition-colors">{t('footer.help')}</Link>
                <Link href="#" className="text-muted-foreground hover:text-primary-foreground transition-colors">{t('footer.policies')}</Link>
            </div>
          </div>

          <div className="flex justify-center md:justify-end items-center gap-4">
            <Link href="#" className="text-muted-foreground hover:text-primary-foreground"><Facebook className="h-5 w-5" /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary-foreground"><Instagram className="h-5 w-5" /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary-foreground"><Youtube className="h-5 w-5" /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary-foreground"><Linkedin className="h-5 w-5" /></Link>
          </div>
        </div>
        <div className="border-t mt-8 pt-4">
            <p className="text-center text-xs text-muted-foreground">
              &copy; {currentYear} Kriti. {t('footer.rights')}
            </p>
        </div>
      </div>
    </footer>
  );
}
