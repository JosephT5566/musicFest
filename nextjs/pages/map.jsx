import React from 'react';
import { makeStyles } from '@material-ui/styles';
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
