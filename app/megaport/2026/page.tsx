'use client';

import Page from 'components/PageV2';
import { FEST_NAME, ROUTE } from 'constants/static';
import { ARTISTS_2026, SCHEDULE_2026 } from 'assets/program/megaport2026';
import React from 'react';

export default function Megaport2026Page() {
	return (
		<Page
			headerTitle={`${FEST_NAME.MEGAPORT} 2026`}
			pageTitle={`${FEST_NAME.MEGAPORT} 2026`}
			schedule={SCHEDULE_2026}
			artists={ARTISTS_2026}
			pageRoutes={ROUTE.megaport[2026]}
			storageKey={'megaport2026'}
		/>
	);
}
