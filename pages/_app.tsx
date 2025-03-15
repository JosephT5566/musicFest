import React, { useState, useEffect } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import 'styles/globals.css';
import theme from 'styles/theme';
import SnackbarProvider from 'providers/SnackbarProvider';
import DialogProvider from 'providers/DialogProvider';

import Header from 'view/layout/Header';
import Snackbar from 'components/shared/Snackbar';
import AlertDialog from 'components/shared/AlertDialog';
import { ContentContainer } from 'components/base/Container';
import useIsInApp from 'hooks/useIsInApp';

import { STORAGE_KEY } from 'constants/static';
import { openInDefaultBrowser } from 'utils/detect-inapp';

function MyApp({ Component, pageProps }: AppProps) {
	const [openDialog, setOpenDialog] = useState(false);
	const isInApp = useIsInApp();

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

	useEffect(() => {
		setOpenDialog(isInApp);
	}, [isInApp]);

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
				<AlertDialog
					open={openDialog}
					title={'瀏覽器切換'}
					content={"使用預設瀏覽器，以獲得較好體驗"}
					onClick={() => {
						console.log('open');
						openInDefaultBrowser();
					}}
					handleClose={() => {
						setOpenDialog(false);
					}}
				/>
			</SnackbarProvider>
		</React.Fragment>
	);
}

export default MyApp;
