import React from 'react';
import './App.css';
import { useCurrentRoute } from 'react-navi';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

import Header from './components/Header';
import Main from './components/Main';

import { theme } from './styles/theme';
import { size } from './styles/size';

const useStyle = makeStyles({
	app: {
		fontFamily: 'Open Sans, serif',
		display: 'flex',
		position: 'relative',
		flexDirection: 'column',
		// paddingBottom: size.navHeight,
	},
});

const muiTheme = createMuiTheme(theme.common, size);

function App() {
	const classes = useStyle();
	const route = useCurrentRoute();
	console.log(route);
	return (
		<ThemeProvider theme={muiTheme}>
			<div className={('App', classes.app)}>
				<Header />
				<Main />
			</div>
		</ThemeProvider>
	);
}

export default App;
