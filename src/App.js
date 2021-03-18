import React, { useEffect } from 'react';
import './App.css';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

import Header from './components/Header';
import Main from './components/Main';

import { theme } from './styles/theme';
import { value } from './styles/value';
import { initGA } from './index';

const useStyle = makeStyles({
	app: {
		fontFamily: value.fontFamily,
		display: 'flex',
		position: 'relative',
		flexDirection: 'column',
		// paddingBottom: size.navHeight,
	},
});

const muiTheme = createMuiTheme(theme.common, value);

function App() {
	const classes = useStyle();

	useEffect(() => {
		initGA();
	}, []);

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
