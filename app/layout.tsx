import React from 'react';
import ThemeRegistry from './ThemeRegistry';
import Header from 'view/layout/Header';
import AppInitializer from './AppInitializer';
import { Toaster } from '@/components/ui/sonner';

import '../src/styles/globals.css';

export const metadata = {
	title: 'FesTime - A Music Festival Timetable Manager',
	description: '音樂祭表演百百團，如何排出舒服的看團順序一直都是看團仔的最大課題，看團選擇器因應而生！',
	viewport: 'width=device-width, initial-scale=1',
	icons: {
		icon: [
			{ url: '/favicon.ico', sizes: 'any' },
			{ url: '/icon.svg', type: 'image/svg+xml' },
		],
		apple: '/apple-touch-icon.png',
	},
	manifest: '/manifest.json',
	themeColor: '#ee7f02',
	openGraph: {
		title: 'FesTime',
		description: '音樂祭表演百百團，如何排出舒服的看團順序一直都是看團仔的最大課題，看團選擇器因應而生！',
		type: 'website',
		images: ['https://i.imgur.com/MKtF24C.png'],
		siteName: 'FesTime',
		url: 'https://musicfest.josephtseng-tw.com/',
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="zh-TW">
			<head>
				<meta charSet="utf-8" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
				<link
					href="https://fonts.googleapis.com/css2?family=Changa+One&family=Contrail+One&display=swap&family=Noto+Sans+TC:wght@300;400;500;700&family=Roboto:wght@300;400;500;700&display=swap"
					rel="stylesheet"
				/>
			</head>
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