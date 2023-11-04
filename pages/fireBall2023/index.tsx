import React from 'react';
import Page from 'components/Page';

import programList from 'assets/program/fireBall2023';
import { APP_NAME, ROUTE } from 'constants/static';

const FireBall2023 = () => {
	const headerTitle = `${APP_NAME} | 2023`;
	const pageTitle = '';

	return (
		<Page
			headerTitle={headerTitle}
			pageTitle={pageTitle}
			mapRoute={ROUTE.megaport2021.map}
			storageKey={ROUTE.megaport2021.root}
			programList={programList}
		/>
	);
};

export default FireBall2023;
