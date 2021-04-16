import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import '../styles/globals.css';
import theme from '../src/styles/theme';
import { ShowsStore } from '../src/context/ShowsContext';

import Header from '../src/components/Header';
import Navigation from '../src/components/Navigation';
import { STORAGE_KEY } from '../src/static';

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement!.removeChild(jssStyles);
		}
		if (!localStorage.getItem(STORAGE_KEY.day)) {
			localStorage.setItem(STORAGE_KEY.day, '0');
		}
	}, []);

	return (
		<React.Fragment>
			<ShowsStore>
				<ThemeProvider theme={theme}>
					<Navigation />
					<Header />
					<Component {...pageProps} />
				</ThemeProvider>
			</ShowsStore>
		</React.Fragment>
	);
}

export default MyApp;
