import React from 'react';
import ThemeRegistry from './ThemeRegistry';
import Header from 'view/layout/Header';
import AppInitializer from './AppInitializer';
import { Toaster } from '@/components/ui/sonner';

export const metadata = {
	title: 'FesTime - A Music Festival Timetable Manager',
	viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="zh-TW">
			<body>
				<ThemeRegistry>
					<AppInitializer />
					<Header />
					<div className="min-h-[calc(100vh_-_theme(spacing.16))]">{children}</div>
					<Toaster />
				</ThemeRegistry>
			</body>
		</html>
	);
}