
'use client';

import Link from 'next/link';
import { LotusIcon } from '@/components/icons/lotus-icon';
import { Button } from '../ui/button';
import { ShoppingCart, User, LayoutGrid, Heart, BarChart2, MessageSquare, BrainCircuit, Bell, Wallet, Calendar, Languages } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/use-auth';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useLanguage } from '@/hooks/use-language';

export default function Header() {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const { t, setLanguage, language } = useLanguage();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({
        title: t('header.logoutSuccessTitle'),
        description: t('header.logoutSuccessDescription'),
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: t('header.logoutErrorTitle'),
        description: t('header.logoutErrorDescription'),
      });
    }
  };

  return (
    <header className="bg-card/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-primary-foreground group">
            <div className="p-1.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <LotusIcon className="h-7 w-7 text-primary" />
            </div>
            <span className="font-body text-2xl font-bold tracking-tight">
              Kriti
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="font-headline text-sm font-medium text-muted-foreground hover:text-primary-foreground transition-colors">{t('header.home')}</Link>
            <Link href="/discover" className="font-headline text-sm font-medium text-muted-foreground hover:text-primary-foreground transition-colors">{t('header.discover')}</Link>
            <Link href="/marketplace" className="font-headline text-sm font-medium text-muted-foreground hover:text-primary-foreground transition-colors">{t('header.marketplace')}</Link>
            <Link href="/community" className="font-headline text-sm font-medium text-muted-foreground hover:text-primary-foreground transition-colors">{t('header.community')}</Link>
            <Link href="/events" className="font-headline text-sm font-medium text-muted-foreground hover:text-primary-foreground transition-colors">{t('header.events')}</Link>
            <Link href="/learning" className="font-headline text-sm font-medium text-muted-foreground hover:text-primary-foreground transition-colors">{t('header.learning')}</Link>
            <Link href="/nikhar" className="font-headline text-sm font-medium text-muted-foreground hover:text-primary-foreground transition-colors">{t('header.nikhar')}</Link>
             <DropdownMenu>
              <DropdownMenuTrigger className="font-headline text-sm font-medium text-muted-foreground hover:text-primary-foreground transition-colors flex items-center gap-1">
                {t('header.forArtisans')} <LayoutGrid className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{t('header.sellerTools')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                        <BarChart2 className="mr-2"/> {t('header.artisanDashboard')}
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/payouts">
                        {t('header.payouts')}
                    </Link>
                </DropdownMenuItem>
                 <DropdownMenuItem asChild>
                    <Link href="/nikhar">
                        <BrainCircuit className="mr-2"/> {t('header.nikharAiStudio')}
                    </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
          <div className="flex items-center space-x-1">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                      <Languages />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{t('header.selectLanguage')}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => setLanguage('en')} disabled={language === 'en'}>English</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setLanguage('hi')} disabled={language === 'hi'}>हिन्दी</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setLanguage('bn')} disabled={language === 'bn'}>বাংলা (Bengali)</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setLanguage('te')} disabled={language === 'te'}>తెలుగు (Telugu)</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setLanguage('mr')} disabled={language === 'mr'}>मराठी (Marathi)</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setLanguage('ta')} disabled={language === 'ta'}>தமிழ் (Tamil)</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setLanguage('gu')} disabled={language === 'gu'}>ગુજરાતી (Gujarati)</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setLanguage('kn')} disabled={language === 'kn'}>ಕನ್ನಡ (Kannada)</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setLanguage('ml')} disabled={language === 'ml'}>മലയാളം (Malayalam)</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setLanguage('pa')} disabled={language === 'pa'}>ਪੰਜਾਬੀ (Punjabi)</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" asChild>
                <Link href="/updates"><Bell /></Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
                <Link href="/cart"><ShoppingCart /></Link>
            </Button>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar className="h-8 w-8">
                          <AvatarImage src={user.photoURL ?? undefined} alt={user.displayName ?? 'User'} />
                          <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{t('header.myAccount')}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                      <Link href="/board">
                          <Heart className="mr-2"/> {t('header.myBoard')}
                      </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                      <Link href="/wallet">
                          <Wallet className="mr-2"/> {t('header.kritiWallet')}
                      </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                      <Link href="/messages">
                          <MessageSquare className="mr-2"/>{t('header.messages')}
                      </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                      <Link href="/settings">
                          {t('header.settings')}
                      </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>{t('header.logOut')}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
                <Button asChild variant="outline">
                    <Link href="/login">{t('header.logIn')}</Link>
                </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
