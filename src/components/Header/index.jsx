import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import mega_origin from '../../assets/image/mega_origin.png';
import Container from '@material-ui/core/Container';

const useStyle = makeStyles((theme) => ({
	header: {
		display: 'flex',
		alignItems: 'center',
		height: theme.headerHeight,
		padding: '1em',
		backgroundColor: theme.palette.secondary.main,
	},
	a: {
		display: 'flex',
		alignItems: 'center',
		height: '100%',
		textDecoration: 'none',
		color: theme.palette.text.light,
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
			<a className={classes.a} href="/musicFest/">
				<img src={mega_origin} alt="mega_origin" />
				<h2>Megaport Festival</h2>
			</a>
		</Container>
	);
}
