'use client';
import React from 'react';
import Page from 'components/PageV2';
import { ROUTE } from 'constants/static';
import { ARTISTS_2026, SCHEDULE_2026 } from 'assets/program/megaport2026';
import { jsonLd } from './metadata';

export default function Megaport2026Page() {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<Page
				schedule={SCHEDULE_2026}
				artists={ARTISTS_2026}
				pageRoutes={ROUTE.megaport[2026]}
				storageKey={'megaport2026'}
			/>
		</>
	);
}
