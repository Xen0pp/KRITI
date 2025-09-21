'use client';

import {
  useState,
  useEffect,
  createContext,
  useContext,
  type ReactNode,
} from 'react';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {loading ? <AuthSkeleton /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

const AuthSkeleton = () => (
    <div className="flex flex-col min-h-screen">
        <header className="bg-card/80 backdrop-blur-sm sticky top-0 z-40 border-b">
             <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="flex items-center justify-between h-16">
                    <Skeleton className="h-8 w-24" />
                    <div className="hidden md:flex items-center space-x-6">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-24" />
                    </div>
                    <Skeleton className="h-10 w-10 rounded-full" />
                 </div>
             </div>
        </header>
        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="space-y-8">
                <Skeleton className="h-64 w-full" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <Skeleton className="h-80 w-full" />
                    <Skeleton className="h-80 w-full" />
                    <Skeleton className="h-80 w-full" />
                    <Skeleton className="h-80 w-full" />
                </div>
            </div>
        </main>
    </div>
);
