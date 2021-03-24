import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { MEGA_START_TIME, MEGA_END_TIME, STORAGE_KEY, MIN, SCALE_UNIT } from '../../utils/static';

const useStyle = makeStyles(() => ({
	timeBackdrop: {
		position: 'absolute',
		top: '0',
		width: '100%',
		// backgroundColor: 'black',
		background: 'linear-gradient(to top, black, transparent)',
		opacity: '0.2',
		zIndex: '50',
	},
	currentTime: {
		position: 'absolute',
		bottom: '0.2em',
		right: '0.5em',
		color: 'white',
		opacity: '0.7',
		fontSize: '50px',
		fontWeight: 'bold',
	},
}));

const INTERVAL = 1000 * 60; // min

export default function TimeBackdrop({ className }) {
	const classes = useStyle();
	const [time, setTime] = useState(new Date());

	const day = localStorage.getItem(STORAGE_KEY.day);
	const todayStartTime = new Date(MEGA_START_TIME[day]);
	const todayEndTime = new Date(MEGA_END_TIME[day]);

	const isToday = () => time.getTime() > todayStartTime.getTime() && time.getTime() < todayEndTime.getTime();

	const height = isToday() ? (time.getTime() - todayStartTime.getTime()) / MIN / 10 : 0;

	useEffect(() => {
		const intervalID = setInterval(() => {
			setTime(new Date());
		}, INTERVAL);

		return () => {
			clearInterval(intervalID);
		};
	}, []);

	if (isToday()) {
		return (
			<div
				className={`${classes.timeBackdrop} ${className}`}
				style={{
					height: `${height * SCALE_UNIT}rem`,
				}}
			>
				<div className={classes.currentTime}>
					{time.getHours()}:{time.getMinutes()}
				</div>
			</div>
		);
	} else {
		return null;
	}
}
