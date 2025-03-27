import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
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
import { setLSWithExpiry, getLSWithExpiry } from 'utils/localStorageUtils';

import { STORAGE_KEY } from 'constants/static';

function MyApp({ Component, pageProps }: AppProps) {
	const [openDialog, setOpenDialog] = useState(false);
	const isInApp = useIsInApp();
	const router = useRouter();

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
		const isIgnoreDialog = getLSWithExpiry(STORAGE_KEY.ignoreDialog) === 'true';
		if (!isIgnoreDialog) {
			setOpenDialog(isInApp);
		}
	}, [isInApp]);

	useEffect(() => {
		const savedPath = localStorage.getItem(STORAGE_KEY.lastVisitedPath);
		const isHomepage = router.asPath === '/';
		const isNavigationFromExternalSite =
			document.referrer === '' || !document.referrer.includes(window.location.origin);

		// Save current path when route changes
		const savePath = () => {
			localStorage.setItem(STORAGE_KEY.lastVisitedPath, router.asPath);
		};

		// Navigate to last visit path on initial load
		const navigateToLastVisitPath = () => {
			// redirection only happened on the main page.
			const isNavigationEnable =
				isHomepage && savedPath && savedPath !== '/' && isNavigationFromExternalSite;

			if (isNavigationEnable) {
				router.push(savedPath);
			}
		};

		savePath();

		// Run check on mount
		if (savedPath) {
			navigateToLastVisitPath();
			return;
		}
	}, [router]);

	const handleCloseDialog = () => {
		const tenMinutesInMs = 10 * 60 * 1000;
		setLSWithExpiry(STORAGE_KEY.ignoreDialog, 'true', tenMinutesInMs);

		setOpenDialog(false);
	};

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
					content={'使用預設瀏覽器開啟，以獲得較好體驗。'}
					confirmButtonText={'關閉'}
					hideDisagreeButton={true}
					handleConfirm={handleCloseDialog}
					handleClose={handleCloseDialog}
				/>
			</SnackbarProvider>
		</React.Fragment>
	);
}

export default MyApp;
