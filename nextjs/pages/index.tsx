import React from 'react';

import { PageContainer } from 'components/base/Container';

import { APP_NAME, ROUTE } from 'constants/static';
import Head from 'next/head';

export default function Home() {
	return (
		<PageContainer>
			<Head>
				<title>{`${APP_NAME}`}</title>
			</Head>

			<a href={ROUTE.megaport2021.root}>{'megaport 2021'}</a>
		</PageContainer>
	);
}
