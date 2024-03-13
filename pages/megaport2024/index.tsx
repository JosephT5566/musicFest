import React from 'react';
import Page from 'components/Page';

import programList from 'assets/program/megaport2024';
import { APP_NAME, ROUTE } from 'constants/static';

const Megaport2023 = () => {
	const headerTitle = `${APP_NAME} | 2024`;
	const pageTitle = '';

	return (
		<Page
			headerTitle={headerTitle}
			pageTitle={pageTitle}
			mapRoute={ROUTE.megaport2024.map}
			storageKey={ROUTE.megaport2024.root}
			programList={programList}
		/>
	);
};

export default Megaport2023;