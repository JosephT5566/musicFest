import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import 'styles/globals.css';
import theme from 'styles/theme';
import SnackbarProvider from 'providers/SnackbarProvider';

import Header from 'view/layout/Header';
import Snackbar from 'components/shared/Snackbar';
import { ContentContainer } from 'components/base/Container';

import { STORAGE_KEY } from 'constants/static';
import { isInApp } from 'utils/detect-inapp';

function MyApp({ Component, pageProps }: AppProps) {
	useEffect(() => {
		const useragent = navigator.userAgent || navigator.vendor;
		const isInAppBrowser = isInApp(useragent);
		console.log("isInAppBrowser: ", isInAppBrowser, useragent);

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
			<title>FesTime - A Music Festival Timetable Manager</title>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<SnackbarProvider>
				<ThemeProvider theme={theme}>
					<Header />
					<ContentContainer>
						<Component {...pageProps} />
					</ContentContainer>
				</ThemeProvider>
				<Snackbar />
			</SnackbarProvider>
		</React.Fragment>
	);
}

export default MyApp;
