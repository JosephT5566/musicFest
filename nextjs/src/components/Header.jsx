import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';

const useStyle = makeStyles((theme) => ({
	header: {
		display: 'flex',
		alignItems: 'center',
		height: theme.headerHeight,
		padding: '1em',
		paddingRight: '4em',
		backgroundColor: theme.palette.secondary.main,
	},
	a: {
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
	const classes = useStyle();
	return (
		<Container className={classes.header}>
			<a className={classes.a} href="/">
				<img src={"/mega_origin.png"} alt="mega_origin" />
				<h2>Megaport Festival</h2>
			</a>
		</Container>
	);
}
