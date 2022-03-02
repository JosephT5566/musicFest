import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';

import { MEGA_START_TIME, MEGA_END_TIME, STORAGE_KEY, MIN, SCALE_UNIT } from 'static';

const StyledtimeBackdrop = styled('div')({
	position: 'absolute',
	top: '0',
	width: '100%',
	height: '2px',
	backgroundColor: 'black',
	opacity: '0.3',
	zIndex: 50,
});

const StyledcurrentTime = styled('div')(({ theme }) => ({
	fontFamily: 'Playfair Display',
	position: 'absolute',
	bottom: '0.2em',
	right: '0',
	color: theme.palette.secondary.main,
	opacity: '0.8',
	fontSize: '50px',
	fontWeight: 'bold',
}));

const INTERVAL = 1000 * 10; // 10 sec

export default function TimeBackdrop(props: { className?: string }) {
	const { className } = props;
	const [time, setTime] = useState(new Date());
	const [day, setDay] = useState(0);

	// const day = localStorage.getItem(STORAGE_KEY.day);
	const todayStartTime = new Date(MEGA_START_TIME[day]);
	const todayEndTime = new Date(MEGA_END_TIME[day]);

	const isToday = () => time.getTime() > todayStartTime.getTime() && time.getTime() < todayEndTime.getTime();

	const top = isToday() ? (time.getTime() - todayStartTime.getTime()) / MIN / 10 : 0;

	useEffect(() => {
		setDay(localStorage.getItem(STORAGE_KEY.day));
		const intervalID = setInterval(() => {
			setTime(new Date());
		}, INTERVAL);

		return () => {
			clearInterval(intervalID);
		};
	}, []);

	if (isToday()) {
		return (
			<StyledtimeBackdrop
				className={`${className}`}
				sx={{
					top: `${top * SCALE_UNIT}rem`,
				}}
			>
				<StyledcurrentTime>
					{time.getHours()}:{time.getMinutes().toString().padStart(2, '0')}
				</StyledcurrentTime>
			</StyledtimeBackdrop>
		);
	} else {
		return null;
	}
}
