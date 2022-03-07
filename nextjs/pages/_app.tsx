import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import 'styles/globals.css';
import theme from 'styles/theme';
import ShowsProvider from 'providers/ShowsProvider';
import SnackbarProvider from 'providers/SnackbarProvider';

import Header from 'view/layout/Header';
import Navigation from 'view/layout/Navigation';
import { STORAGE_KEY } from 'static';
import Snackbar from 'components/shared/Snackbar';

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
			<title>2021 大港開唱選擇器 Megaport Festival Selector</title>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<SnackbarProvider>
				<ShowsProvider>
					<ThemeProvider theme={theme}>
						<Navigation />
						<Header />
						<Component {...pageProps} />
					</ThemeProvider>
				</ShowsProvider>
				<Snackbar />
			</SnackbarProvider>
		</React.Fragment>
	);
}

export default MyApp;
