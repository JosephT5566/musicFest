'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import TableChartIcon from '@mui/icons-material/TableChart';

import { FixedButtonsContainer, PageContainer } from 'components/base/Container';
import { H1 } from 'components/base/Typography';
import { ShadowIconButton } from 'components/base/Button';

import { useRouter } from 'next/navigation';
import { useIsMobileNavEnable } from 'hooks/navigationUtils';
import MobileBottomNav from './shared/MobileBottomNav';
import { PageRoutes } from 'types/navigation';

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
	imageSrc?: string;
	pageRoutes: PageRoutes;
};

export default function Map({ headerTitle, pageTitle, imageSrc, pageRoutes }: MapProps) {
	const router = useRouter();
	const isMobileNavEnable = useIsMobileNavEnable();

	return (
		<PageContainer>
			<H1>{imageSrc ? pageTitle : 'COMING SOON...'}</H1>
			{imageSrc && (
				<ImageContainer>
					<StyledmapImg src={imageSrc} alt="mega map" />
				</ImageContainer>
			)}
			<FixedButtonsContainer>
				{!isMobileNavEnable && (
					<ShadowIconButton
						size={'large'}
						onClick={() => {
							router.push(pageRoutes.root);
						}}
					>
						<TableChartIcon />
					</ShadowIconButton>
				)}
			</FixedButtonsContainer>
			<MobileBottomNav routes={pageRoutes} />
		</PageContainer>
	);
}