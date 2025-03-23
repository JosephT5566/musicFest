import React from 'react';
import Page from 'components/Page';

import programList from 'assets/program/megaport2024';
import { APP_NAME, ROUTE, FEST_NAME } from 'constants/static';

const headerTitle = `${APP_NAME} - ${FEST_NAME.MEGAPORT} - 2024`;
const pageTitle = `${FEST_NAME.MEGAPORT} - 2024`;

const Megaport2024 = () => {

	return (
		<Page
			headerTitle={headerTitle}
			pageTitle={pageTitle}
			pageRoutes={ROUTE.megaport[2024]}
			storageKey={ROUTE.megaport[2024].root}
			programList={programList}
		/>
	);
};

export default Megaport2024;