import React from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';

const useStyle = makeStyles((theme) => ({
	mapPage: {
		overflow: 'scroll',
	},
	mapImg: {
		[theme.breakpoints.up('md')]: {
			width: '100%',
		},
		[theme.breakpoints.down('sm')]: {
			width: '200%',
		},
	},
}));

export default function Map() {
	const classes = useStyle();

	return (
		<Container className={classes.mapPage}>
			<img className={classes.mapImg} src={'/megaport_map.jpg'} alt="mega map" />
		</Container>
	);
}
