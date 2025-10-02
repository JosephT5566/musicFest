import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';
import theme from 'styles/theme';

const siteName = 'FesTime | 音樂祭時間表管理工具 | 輕鬆規劃看團行程';

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang="zh-TW">
				<Head>
					<link rel="icon" href="/favicon.ico" sizes="any" />
					<link rel="icon" href="/icon.svg" type="image/svg+xml" />
					<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
					{/* PWA primary color */}
					<meta name="theme-color" content={theme.palette.primary.main} />
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
					<link
						href="https://fonts.googleapis.com/css2?family=Changa+One&family=Contrail+One&display=swap&family=Noto+Sans+TC:wght@300;400;500;700&family=Roboto:wght@300;400;500;700&display=swap"
						rel="stylesheet"
					></link>
					<meta property="og:title" content={siteName} />
					<meta property="og:description" content="FesTime 是一款專為音樂祭愛好者設計的時間表管理工具，幫助您輕鬆規劃音樂祭行程，掌握樂團演出時間，不再錯過任何精彩瞬間。" />
					<meta property="og:type" content="website" />
					<meta property="og:image" content="https://i.imgur.com/MKtF24C.png" />
					<meta
						property="og:site_name"
						content={siteName}
					/>
					<meta property="og:url" content="https://musicfest.josephtseng-tw.com/" />
					<meta name="description" content="FesTime 是一款專為音樂祭愛好者設計的時間表管理工具，幫助您輕鬆規劃音樂祭行程，掌握樂團演出時間，不再錯過任何精彩瞬間。" />
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
