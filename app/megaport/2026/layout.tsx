'use client';

import ShowsProvider from '../../../src/providers/ShowsProvider';
import React from 'react';

export default function Megaport2026Layout({ children }: { children: React.ReactNode }) {
	const storageKey = 'megaport2026-selectedShows';

	return <ShowsProvider storageKey={storageKey}>{children}</ShowsProvider>;
}
