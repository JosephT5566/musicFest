import React from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';

const StyledmapPage = styled(Container)({
	overflow: 'scroll',
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
		<StyledmapPage>
			<StyledmapImg src={'/megaport_map.jpg'} alt="mega map" />
		</StyledmapPage>
	);
}
