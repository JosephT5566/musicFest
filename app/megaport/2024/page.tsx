'use client';
import React from 'react';
import Page from 'components/Page';

import programList from 'assets/program/megaport2024';
import { ROUTE, FEST_NAME } from 'constants/static';

const pageTitle = `${FEST_NAME.MEGAPORT} - 2024`;

const Megaport2024 = () => {

	return (
		<Page
			headerTitle={pageTitle}
			pageTitle={pageTitle}
			pageRoutes={ROUTE.megaport[2024]}
			storageKey={ROUTE.megaport[2024].root}
			programList={programList}
		/>
	);
};

export default Megaport2024;