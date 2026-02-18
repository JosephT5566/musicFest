'use client';

import ShowsProvider from '../../../src/providers/ShowsProvider';
import React from 'react';
import { ROUTE } from 'constants/static';
import MobileBottomNav from 'components/shared/MobileBottomNav';

export default function Megaport2026Layout({ children }: { children: React.ReactNode }) {
  const storageKey = ROUTE.megaport['2026'].root;

  return (
    <ShowsProvider storageKey={storageKey}>
      {children}
      <MobileBottomNav routes={ROUTE.megaport['2026']} />
    </ShowsProvider>
  );
}