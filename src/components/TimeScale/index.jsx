import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
	timescale: {
		position: 'relative',
		borderTop: 'solid 1px',
		// height: 'calc(1em - 1px)',
		height: '1em',
		minWidth: '3.5em',
	},
	text: {
		backgroundColor: theme.palette.bg.main,
		fontSize: '8px',
		position: 'absolute',
		bottom: '50%',
		left: '50%',
		transform: 'translateX(-50%)',
	},
}));

export default function TimeScale() {
	const classes = useStyle();
	const start = new Date('2021-03-27T11:40');
	console.log(start.getHours(), start.getMinutes());

	let scale = [];
	for (let i = 0; i < 62; i++) {
		const time = new Date(start.getTime() + 10 * i * 60000);
		const hh = time.getHours();
		const mm = time.getMinutes() === 0 ? '00' : time.getMinutes();
		scale.push(
			<div className={classes.timescale} key={i}>
				<div className={classes.text}>
					{hh}:{mm}
				</div>
			</div>
		);
	}
	return <div>{scale}</div>;
}
