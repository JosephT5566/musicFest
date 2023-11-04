import React from 'react';
import Head from 'next/head';
import { styled } from '@mui/material/styles';
import TableChartIcon from '@mui/icons-material/TableChart';

import { FixedButtonsContainer, PageContainer } from 'components/base/Container';
import { H1 } from 'components/base/Typography';
import { ShadowIconButton } from 'components/base/Button';

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

type MapProps = {
	headerTitle: string;
	pageTitle: string;
	imageSrc: string;
	pageRoute: string;
};

export default function Map({ headerTitle, pageTitle, imageSrc, pageRoute }: MapProps) {
	const router = useRouter();

	return (
		<PageContainer>
			<Head>
				<title>{headerTitle}</title>
			</Head>

			<H1>{pageTitle}</H1>
			<ImageContainer>
				<StyledmapImg src={imageSrc} alt="mega map" />
			</ImageContainer>
			<FixedButtonsContainer>
				<ShadowIconButton
					size={'large'}
					onClick={() => {
						router.push(pageRoute);
					}}
				>
					<TableChartIcon />
				</ShadowIconButton>
			</FixedButtonsContainer>
		</PageContainer>
	);
}
