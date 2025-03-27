import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Navigation from './Navigation';
import { APP_NAME } from 'constants/static';
import { IMAGES } from 'constants/images';

const StyledHeader = styled('header')(({ theme }) => ({
	height: theme.layout.header.height,
	backgroundColor: theme.palette.secondary.main,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '1em 2em',
	paddingRight: '4em',

	'& .logo': {
		display: 'flex',
		gap: '1em',
		alignItems: 'center',
		height: '100%',
		textDecoration: 'none',
		color: theme.palette.text.secondary,
		'&:hover': {
			color: theme.palette.primary.main,
		},
		'& img': {
			height: '100%',
		},
	},
}));

const StyledIcon = styled('img')({
	width: '100%',
});

export default function Header() {
	return (
		<StyledHeader>
			<a className={'logo'} href="/">
				<Box height="100%" borderRadius={24} overflow="hidden" sx={{ aspectRatio: '1' }}>
					<StyledIcon
						src={IMAGES.LOGO_SVG}
						alt="FesTime"
						aria-label="FesTime"
						height={48}
						width={48}
					/>
				</Box>
				<Typography variant="h1" fontSize="2.5rem">{APP_NAME}</Typography>
			</a>
			{/* <Navigation /> */}
		</StyledHeader>
	);
}
