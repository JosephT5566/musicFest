import React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { PageContainer, PostersContainer } from 'components/base/Container';

import { APP_NAME, ROUTE, FEST_NAME } from 'constants/static';
import Head from 'next/head';
import { H1 } from 'components/base/Typography';
import PosterCard from 'components/shared/PosterCard';
import { IMAGES } from 'constants/images';

const pageTitle = `${APP_NAME} - ${FEST_NAME.FUJI_ROCK}`;

export default function Fujirock() {
	return (
		<>
			<Head>
				<title>{pageTitle}</title>
			</Head>


			<Typography variant='h1'>Coming Soon...</Typography>
			{/* <PageContainer>
				<H1>{FEST_NAME.FUJI_ROCK}</H1>
				<PostersContainer>
					<PosterCard
						name="2021"
						href={ROUTE.megaport[2021].root}
						image={IMAGES.posters[2021]}
					/>
				</PostersContainer>
			</PageContainer> */}
		</>
	);
}
