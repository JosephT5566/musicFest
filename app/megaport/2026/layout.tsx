'use client';

import ShowsProvider from '../../../src/providers/ShowsProvider';
import React from 'react';
import { ROUTE } from 'constants/static';
import { H1 } from 'components/base/Typography';
import MobileBottomNav from 'components/shared/MobileBottomNav';
import { FEST_NAME } from 'constants/static';

export default function Megaport2026Layout({ children }: { children: React.ReactNode }) {
	const storageKey = ROUTE.megaport['2026'].root;

	return (
		<ShowsProvider storageKey={storageKey}>
			<H1 className='text-center mt-4'>{`${FEST_NAME.MEGAPORT} 2026`}</H1>
			{children}
			<MobileBottomNav routes={ROUTE.megaport['2026']} />
		</ShowsProvider>
	);
}
