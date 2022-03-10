import React from 'react';
import { styled } from '@mui/material/styles';

import { PageContainer } from 'components/base/Container';

import { APP_NAME, ROUTE } from 'constants/static';
import Head from 'next/head';
import { H1 } from 'components/base/Typography';
import { IMAGES } from 'constants/images';

const HeroContainer = styled('div')({
	minHeight: 'inherit',
	backgroundImage: `url("${IMAGES.heroImage}")`,
	backgroundPosition: 'center',
	backgroundSize: 'cover',
});

const StyledAnchor = styled('a')(({ theme }) => ({
	color: theme.palette.common.white,
	height: '20em',
	width: '15em',
	borderRadius: '0.5em',
	overflow: 'hidden',
}));

const PosterContainer = styled('div')({
	padding: '1em 2em',
	height: 'inherit',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundPosition: 'center',
	backgroundSize: 'cover',
});

export default function Home() {
	return (
		<HeroContainer>
			<Head>
				<title>{`${APP_NAME}`}</title>
			</Head>

			<PageContainer>
				<H1 sx={{ fontWeight: 'bold' }}>{'大港開唱選擇器'}</H1>
				<StyledAnchor href={ROUTE.megaport2021.root}>
					<PosterContainer sx={{ backgroundImage: `url("${IMAGES.posters[2021]}")` }}>
						<H1>{'2021'}</H1>
					</PosterContainer>
				</StyledAnchor>
				<StyledAnchor href={ROUTE.megaport2022.root}>
					<PosterContainer sx={{ backgroundImage: `url("${IMAGES.posters[2022]}")` }}>
						<H1>{'2022'}</H1>
					</PosterContainer>
				</StyledAnchor>
			</PageContainer>
		</HeroContainer>
	);
}
