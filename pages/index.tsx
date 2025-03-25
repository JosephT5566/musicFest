import React from 'react';
import Box from '@mui/material/Box';

import { PageContainer } from 'components/base/Container';

import { APP_NAME, FEST_NAME, ROUTE } from 'constants/static';
import Head from 'next/head';
import { H1 } from 'components/base/Typography';
import FestCard from 'components/shared/FestCard';
import { FEST_LOGO } from 'constants/images';

const pageTitle = `${APP_NAME}`;

export default function Home() {
	return (
		<>
			<Head>
				<title>{pageTitle}</title>
			</Head>

			<PageContainer>
				<H1>Festivals</H1>
				<Box
					width="100%"
					paddingX={[4, 0]}
					display="grid"
					gridTemplateColumns="repeat(auto-fill, minmax(15em, 1fr))"
					gap="2rem"
					justifyItems="center"
				>
					<FestCard
						name={FEST_NAME.MEGAPORT}
						href={ROUTE.megaport.index.root}
						image={FEST_LOGO.megaport}
					/>
					{/* <FestCard
						name={FEST_NAME.FUJI_ROCK}
						href={ROUTE.fujirock.index.root}
						image={FEST_LOGO.fujirock}
					/> */}
				</Box>
			</PageContainer>
		</>
	);
}
