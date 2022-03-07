import React from 'react';
import { styled } from '@mui/material/styles';

import { PageContainer } from 'components/base/Container';

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
		<PageContainer
			sx={{
				overflow: 'scroll',
			}}
		>
			<StyledmapImg src={'/megaport_map.jpg'} alt="mega map" />
		</PageContainer>
	);
}
