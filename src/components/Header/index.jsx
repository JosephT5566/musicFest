import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';

const useStyle = makeStyles((theme) => ({
	header: {
		display: 'flex',
		alignItems: 'center',
		height: theme.headerHeight,
	},
	a: {
		textDecoration: 'none',
		color: theme.palette.primary.main,
		'&:hover': {
			borderBottom: 'solid 1px',
		},
	},
}));

export default function Header() {
	const classes = useStyle();
	return (
		<Container className={classes.header}>
			<h2>
				<a className={classes.a} href="/musicFest/">
					Megaport Festival
				</a>
			</h2>
		</Container>
	);
}
