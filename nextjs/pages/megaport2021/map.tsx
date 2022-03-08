import React from 'react';
import Head from 'next/head';
import { styled } from '@mui/material/styles';

import { PageContainer } from 'components/base/Container';
import { H1 } from 'components/base/Typography';
import { APP_NAME } from 'constants/static';

const ImageContainer = styled('div')({
	width: '100%',
	overflow: 'auto',
});

const StyledmapImg = styled('img')(({ theme }) => ({
	[theme.breakpoints.up('md')]: {
		width: '100%',
	},
	[theme.breakpoints.down('sm')]: {
		width: '200%',
	},
}));

export default function Map() {
	return (
		<PageContainer>
			<Head>
				<title>{`${APP_NAME} | 2021 | 地圖`}</title>
			</Head>

			<H1>{'2021 MEGAPORT'}</H1>
			<ImageContainer>
				<StyledmapImg src={'/megaport_map.jpg'} alt="mega map" />
			</ImageContainer>
		</PageContainer>
	);
}
