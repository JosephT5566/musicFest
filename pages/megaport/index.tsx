import React from 'react';
import { styled } from '@mui/material/styles';

import { PageContainer } from 'components/base/Container';

import { APP_NAME, ROUTE, FEST_NAME } from 'constants/static';
import Head from 'next/head';
import { H1 } from 'components/base/Typography';
import { IMAGES } from 'constants/images';
import PosterCard from 'components/shared/PosterCard';

const PostersContainer = styled('div')(({ theme }) => ({
	width: '100%',
	display: 'grid',
	[theme.breakpoints.down('sm')]: {
		gridTemplateColumns: 'repeat(2, 1fr)',
		gap: '1rem',
		paddingInline: '1rem',
	},
	gridTemplateColumns: 'repeat(auto-fill, minmax(15em, 1fr))',
	gap: '2rem',
	justifyItems: 'center',
}));

const pageTitle = `${APP_NAME} - ${FEST_NAME.MEGAPORT}`;

export default function Megaport() {
	return (
		<>
			<Head>
				<title>{pageTitle}</title>
			</Head>

			<PageContainer>
				<H1>{FEST_NAME.MEGAPORT}</H1>
				<PostersContainer>
					<PosterCard
						name="2021"
						href={ROUTE.megaport[2021].root}
						image={IMAGES.posters[2021]}
					/>
					<PosterCard
						name="2022"
						href={ROUTE.megaport[2022].root}
						image={IMAGES.posters[2022]}
					/>
					<PosterCard
						name="2024"
						href={ROUTE.megaport[2024].root}
						image={IMAGES.posters[2024]}
					/>
				</PostersContainer>
			</PageContainer>
		</>
	);
}
