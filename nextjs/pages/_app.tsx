import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import 'styles/globals.css';
import theme from 'styles/theme';
import ShowsProvider from 'providers/ShowsProvider';
import SnackbarProvider from 'providers/SnackbarProvider';

import Header from 'view/layout/Header';
import Navigation from 'view/layout/Navigation';
import Snackbar from 'components/shared/Snackbar';
import { ContentContainer } from 'components/base/Container';

import { STORAGE_KEY } from 'constants/static';

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
						<ContentContainer>
							<Component {...pageProps} />
						</ContentContainer>
					</ThemeProvider>
				</ShowsProvider>
				<Snackbar />
			</SnackbarProvider>
		</React.Fragment>
	);
}

export default MyApp;
