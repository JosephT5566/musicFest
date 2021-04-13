import React from 'react'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import '../styles/globals.css'
import theme from '../src/styles/theme'

const useStyle = makeStyles((theme) => {

})

function MyApp({ Component, pageProps }) {
	return (
		<React.Fragment>
			<ThemeProvider theme={theme}>
				<Component {...pageProps} />
			</ThemeProvider>
		</React.Fragment>
	)
}

export default MyApp
