'use client';

import { useEffect } from 'react';
import { useBrowsingHistory } from '@/hooks/use-browsing-history';

interface TrackProductViewProps {
  productId: string;
}

export default function TrackProductView({ productId }: TrackProductViewProps) {
  const { addProductToHistory } = useBrowsingHistory();

  useEffect(() => {
    addProductToHistory(productId);
  }, [productId, addProductToHistory]);

  return null;
}
