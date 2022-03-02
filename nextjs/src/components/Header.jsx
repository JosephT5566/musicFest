import React from 'react';
import { styled } from '@mui/material/styles';

import Container from '@mui/material/Container';

const StyledHeader = styled(Container)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	height: theme.typography.headerHeight,
	padding: '1em',
	paddingRight: '4em',
	backgroundColor: theme.palette.secondary.main,

	'& a': {
		display: 'flex',
		alignItems: 'center',
		height: '100%',
		textDecoration: 'none',
		color: theme.palette.text.secondary,
		'&:hover': {
			color: theme.palette.primary.main,
		},
		'& img': {
			height: '90%',
			padding: '0 1em',
		},
	},
}));

export default function Header() {
	return (
		<StyledHeader>
			<a href="/">
				<img src={'/mega_origin.png'} alt="mega_origin" />
				<h2>Megaport Festival</h2>
			</a>
		</StyledHeader>
	);
}
