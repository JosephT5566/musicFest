import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import 'styles/globals.css';
import theme from 'styles/theme';
import { ShowsStore } from 'context/ShowsContext';

import Header from 'components/Header';
import Navigation from 'components/Navigation';
import { STORAGE_KEY } from 'static';

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
