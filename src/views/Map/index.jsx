import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import mega_map from '../../assets/image/megaport_map.jpg';

import { GApageView } from '../../../src';

const useStyle = makeStyles((theme) => ({
	mapPage: {},
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

	useEffect(() => {
		GApageView(window.location.hostname + window.location.pathname);
	}, []);

	return (
		<div className={classes.mapPage}>
			<img className={classes.mapImg} src={mega_map} alt="mega map" />
		</div>
	);
}
