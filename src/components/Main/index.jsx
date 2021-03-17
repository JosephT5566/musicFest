import React, { Suspense } from 'react';
import { Router, View } from 'react-navi';
import { makeStyles } from '@material-ui/core/styles';
import { ShowsStore } from '../../contexts/ShowsContext';

import routes from '../../route/routes';
import Container from '@material-ui/core/Container';

import Navigation from '../Navigation';

const useStyle = makeStyles((theme) => ({
	main: {
		backgroundColor: theme.palette.bg.main,
		position: 'relative',
		overflowX: 'scroll',
		overflowY: 'hidden',
	},
}));

export default function Main() {
	const classes = useStyle();
	return (
		<>
			<Router routes={routes}>
				<ShowsStore>
					<Container className={classes.main}>
						<Suspense fallback={null}>
							<View />
						</Suspense>
					</Container>
					<Navigation />
				</ShowsStore>
			</Router>
		</>
	);
}
