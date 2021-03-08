import React, { Suspense } from 'react';
import { Router, View } from 'react-navi';
import { makeStyles } from '@material-ui/core/styles';

import routes from '../../route/routes';
import Container from '@material-ui/core/Container';

import Navigation from '../Navigation';

const useStyle = makeStyles((theme) => ({
	main: {
		backgroundColor: theme.palette.bg.main,
		position: 'relative',
	},
}));

export default function Main() {
	const classes = useStyle();
	return (
		<>
			<Router routes={routes}>
				<Container className={classes.main}>
					<Suspense fallback={null}>
						<View />
					</Suspense>
				</Container>
				<Navigation />
			</Router>
		</>
	);
}
