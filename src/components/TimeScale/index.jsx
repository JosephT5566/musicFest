import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { MEGA_START_TIME, SCALE_UNIT } from '../../utils/static';

const useStyle = makeStyles((theme) => ({
	timeScale: {
		paddingTop: `calc(${theme.tableHeadHeight} + ${theme.tableHeadMarginBottom})`,
		paddingRight: '0.5em',
		[theme.breakpoints.down('md')]: {
			position: 'sticky',
			left: '0',
		},
	},
	scale: {
		backgroundColor: 'transparent',
		position: 'relative',
		height: `${SCALE_UNIT}rem`,
		minWidth: '2.5em',
		'&::after': {
			content: `''`,
			position: 'absolute',
			background: theme.palette.primary.main,
			height: '1px',
			width: '30%',
			top: '-0.5px',
			right: '0',
		},
	},
	text: {
		backgroundColor: 'transparent',
		fontSize: '8px',
		position: 'absolute',
		top: '0',
		left: '0',
		transform: 'translate(0, -50%)',
	},
}));

export default function TimeScale() {
	const classes = useStyle();
	const start = new Date(MEGA_START_TIME[0]);

	let scale = [];
	for (let i = 0; i < 62; i++) {
		const time = new Date(start.getTime() + 10 * i * 60000);
		const hh = time.getHours();
		const mm = time.getMinutes() === 0 ? '00' : time.getMinutes();
		scale.push(
			<div className={classes.scale} key={i}>
				<div className={classes.text}>
					{hh}:{mm}
				</div>
			</div>
		);
	}
	return <div className={classes.timeScale}>{scale}</div>;
}
