'use client';
import React from 'react';
import Page from 'components/Page';

import programList from 'assets/program/megaport2025';
import { ROUTE, FEST_NAME } from 'constants/static';

const pageTitle = `${FEST_NAME.MEGAPORT} - 2025`;

const Megaport2025 = () => {

	return (
		<Page
			headerTitle={pageTitle}
			pageTitle={pageTitle}
			pageRoutes={ROUTE.megaport[2025]}
			storageKey={ROUTE.megaport[2025].root}
			programList={programList}
		/>
	);
};

export default Megaport2025;