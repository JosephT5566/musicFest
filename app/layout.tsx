import React from 'react';
import ThemeRegistry from './ThemeRegistry';
import SnackbarProvider from 'providers/SnackbarProvider';
import Header from 'view/layout/Header';
import { ContentContainer } from 'components/base/Container';
import Snackbar from 'components/shared/Snackbar';
import AppInitializer from './AppInitializer';

export const metadata = {
	title: 'FesTime - A Music Festival Timetable Manager',
	viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="zh-TW">
			<body>
				<ThemeRegistry>
					<SnackbarProvider>
						<AppInitializer />
						<Header />
						<ContentContainer>{children}</ContentContainer>
						<Snackbar />
					</SnackbarProvider>
				</ThemeRegistry>
			</body>
		</html>
	);
}
