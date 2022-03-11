import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';
import theme from 'styles/theme';

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang="zh-TW">
				<Head>
					<link rel="icon" href="/favicon.ico" />
					{/* PWA primary color */}
					<meta name="theme-color" content={theme.palette.primary.main} />
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
					<link
						href="https://fonts.googleapis.com/css2?family=Changa+One&family=Noto+Sans+TC:wght@300;400;500;700&family=Roboto:wght@300;400;500;700&display=swap"
						rel="stylesheet"
					></link>
					<meta property="og:title" content="大港開唱選擇器 Megaport Festival Selector" />
					<meta property="og:description" content="大港開唱，看團選擇器" />
					<meta property="og:type" content="website" />
					<meta property="og:image" content="https://i.imgur.com/OgYq1S8.png" />
					<meta
						property="og:site_name"
						content="大港開唱選擇器 Megaport Festival Selector"
					/>
					<meta property="og:url" content="https://josepht5566.github.io/musicFest" />
					<meta name="description" content="大港開唱，看團選擇器" />
					<link rel="manifest" href="/manifest.json" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}

	static async getInitialProps(ctx: DocumentContext) {
		// Render app and page and get the context of the page with collected side effects.
		const sheets = new ServerStyleSheets();
		const originalRenderPage = ctx.renderPage;

		ctx.renderPage = () =>
			originalRenderPage({
				enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
			});

		const initialProps = await Document.getInitialProps(ctx);

		return {
			...initialProps,
			// Styles fragment is rendered after the app and page rendering finish.
			styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
		};
	}
}
