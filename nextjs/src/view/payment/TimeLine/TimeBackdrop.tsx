import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';

import { SCALE_UNIT } from 'constants/static';
import moment, { Moment } from 'moment';

const StyledtimeBackdrop = styled('div')({
	position: 'absolute',
	top: '0',
	marginTop: `${0.5 * SCALE_UNIT}rem`,
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

export default function TimeBackdrop(props: { dayStartTime: Moment; dayEndTime: Moment }) {
	const { dayStartTime, dayEndTime } = props;
	const [time, setTime] = useState(moment());

	// const day = localStorage.getItem(STORAGE_KEY.day);

	const isToday = () => {
		return time.isBetween(dayStartTime, dayEndTime);
	};

	const top = isToday() ? moment.duration(time.diff(dayStartTime)).asMinutes() / 10 : 0;

	useEffect(() => {
		const intervalID = setInterval(() => {
			setTime(moment());
		}, INTERVAL);

		return () => {
			clearInterval(intervalID);
		};
	}, []);

	return (
		isToday() && (
			<StyledtimeBackdrop
				sx={{
					top: `${top * SCALE_UNIT}rem`,
				}}
			>
				<StyledcurrentTime>{time.format('HH:mm')}</StyledcurrentTime>
			</StyledtimeBackdrop>
		)
	);
}
