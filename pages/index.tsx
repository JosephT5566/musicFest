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
	height: '20em',
	width: '15em',
	padding: '1em 2em',
	display: 'flex',
	position: 'relative',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: '0.5em',
	backgroundPosition: 'center',
	backgroundSize: 'cover',
	boxShadow: `${theme.palette.grey[800]} 4px 4px 10px 0px`,
	color: theme.palette.common.white,
	overflow: 'hidden',

	'&::before': {
		content: `''`,
		position: 'absolute',
		backgroundColor: theme.palette.grey[900],
		borderRadius: '0.5em',
		opacity: 0.3,
		width: '100%',
		height: '100%',
		top: '0',
		left: '0',
	},

	'& > h1': {
		zIndex: 1,
	},

	'&:hover h1': {
		fontSize: '4em',
		transition: '500ms',
	},

	'&:focus h1': {
		fontSize: '4em',
		transition: '500ms',
	},
}));

const PostersContainer = styled('div')({
	width: '100%',
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fill, minmax(15em, 1fr))',
	gap: '0.5rem',
	justifyItems: 'center',
});

export default function Home() {
	return (
		<HeroContainer>
			<Head>
				<title>{`${APP_NAME}`}</title>
			</Head>

			<PageContainer>
				<H1>{'大港開唱選擇器'}</H1>
				<PostersContainer>
					<StyledAnchor
						href={ROUTE.megaport2021.root}
						sx={{ backgroundImage: `url("${IMAGES.posters[2021]}")` }}
					>
						<H1>{'2021'}</H1>
					</StyledAnchor>
					<StyledAnchor
						href={ROUTE.megaport2022.root}
						sx={{ backgroundImage: `url("${IMAGES.posters[2022]}")` }}
					>
						<H1>{'2022'}</H1>
					</StyledAnchor>
					<StyledAnchor
						href={ROUTE.fireBall2023.root}
						sx={{ backgroundImage: `url("${IMAGES.posters[2022]}")` }}
					>
						<H1>{'2023'}</H1>
					</StyledAnchor>
				</PostersContainer>
			</PageContainer>
		</HeroContainer>
	);
}
