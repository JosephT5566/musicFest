'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import TableChartIcon from '@mui/icons-material/TableChart';

import { FixedButtonsContainer, PageContainer } from 'components/base/Container';
import { H1 } from 'components/base/Typography';
import { ShadowIconButton } from 'components/base/Button';

import { ROUTE, FEST_NAME } from 'constants/static';
import { useRouter } from 'next/navigation';
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

const title = `${FEST_NAME.MEGAPORT} | 2021 | Map`;

export default function Map() {
	const router = useRouter();

	return (
		<PageContainer>
			<H1>{title}</H1>
			<ImageContainer>
				<StyledmapImg src={IMAGES.maps[2021]} alt="mega map" />
			</ImageContainer>
			<FixedButtonsContainer>
				<ShadowIconButton
					size={'large'}
					onClick={() => {
						router.push(ROUTE.megaport[2021].root);
					}}
				>
					<TableChartIcon />
				</ShadowIconButton>
			</FixedButtonsContainer>
		</PageContainer>
	);
}
