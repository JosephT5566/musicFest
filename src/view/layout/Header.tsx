import React from 'react';
import { styled } from '@mui/material/styles';
import Navigation from './Navigation';

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

export default function Header() {
	return (
		<StyledHeader>
			<a className={'logo'} href="/">
				<img src={'/mega_origin.png'} alt="mega_origin" />
				<h2>Megaport Festival</h2>
			</a>
			<Navigation />
		</StyledHeader>
	);
}
