import React from 'react';
import Head from 'next/head';
import { styled } from '@mui/material/styles';
import TableChartIcon from '@mui/icons-material/TableChart';

import { FixedButtonsContainer, PageContainer } from 'components/base/Container';
import { H1 } from 'components/base/Typography';
import { ShadowIconButton } from 'components/base/Button';

import { APP_NAME, ROUTE } from 'constants/static';
import { useRouter } from 'next/router';
import { IMAGES } from 'constants/images';

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
	const router = useRouter();

	return (
		<PageContainer>
			<Head>
				<title>{`${APP_NAME} | 2022 | 地圖`}</title>
			</Head>

			<H1>{'2022 MEGAPORT'}</H1>
			<ImageContainer>
				<StyledmapImg src={IMAGES.maps[2022]} alt="mega map" />
			</ImageContainer>
			<FixedButtonsContainer>
				<ShadowIconButton
					size={'large'}
					onClick={() => {
						router.push(ROUTE.megaport2022.root);
					}}
				>
					<TableChartIcon />
				</ShadowIconButton>
			</FixedButtonsContainer>
		</PageContainer>
	);
}
