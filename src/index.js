import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

export const initGA = () => {
	console.log('MEASUREMENT_ID', process.env.REACT_APP_MEASUREMENT_ID);
	console.log('env top', process.env.REACT_APP_ENV_TOP);
	console.log('env step1', process.env.REACT_APP_ENV_STEP1);
	console.log('env step2', process.env.REACT_APP_ENV_STEP2);
	console.log('env step3', process.env.REACT_APP_ENV_STEP3);

	ReactGA.initialize(process.env.REACT_APP_MEASUREMENT_ID);
};
export const GApageView = (page) => {
	ReactGA.pageview(page);
};

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
