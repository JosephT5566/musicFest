import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import '../styles/globals.css';
import theme from '../src/styles/theme';

import Header from '../src/components/Header';
import Navigation from '../src/components/Navigation';

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement!.removeChild(jssStyles);
		}
	}, []);

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
