import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import '../styles/globals.css';
import theme from '../src/styles/theme';

import Header from '../src/components/Header';
import Navigation from '../src/components/Navigation';

function MyApp({ Component, pageProps }) {
	return (
		<React.Fragment>
			<ThemeProvider theme={theme}>
				<Navigation />
				<Header />
				<Component {...pageProps} />
			</ThemeProvider>
		</React.Fragment>
	);
}

export default MyApp;
