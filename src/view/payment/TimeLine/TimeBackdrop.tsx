'use client';
import React, { useState, useEffect } from 'react';

import { SCALE_UNIT } from 'constants/static';
import moment, { Moment } from 'moment';

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

	return isToday() ? (
		<div
			style={{
				top: `${top * SCALE_UNIT}rem`,
				marginTop: `${0.5 * SCALE_UNIT}rem`,
			}}
			className="absolute w-full h-[2px] bg-black opacity-30 z-50"
		>
			<div className="font-['Playfair_Display'] absolute bottom-[0.2em] right-0 text-secondary opacity-80 text-[50px] font-bold">
				{time.format('HH:mm')}
			</div>
		</div>
	) : null;
}
