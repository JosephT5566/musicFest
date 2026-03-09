'use client';
import React, { useState, useEffect } from 'react';
import { differenceInMinutes, isWithinInterval, format } from 'date-fns';

import { SCALE_UNIT } from 'constants/static';

const INTERVAL = 1000 * 10; // 10 sec

export default function TimeBackdrop(props: { dayStartTime: Date; dayEndTime: Date }) {
	const { dayStartTime, dayEndTime } = props;
	const [time, setTime] = useState(new Date());

	// const day = localStorage.getItem(STORAGE_KEY.day);

	const isToday = () => {
		return isWithinInterval(time, { start: dayStartTime, end: dayEndTime });
	};

	const top = isToday() ? differenceInMinutes(time, dayStartTime) / 10 : 0;

	useEffect(() => {
		const intervalID = setInterval(() => {
			setTime(new Date());
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
				{format(time, 'HH:mm')}
			</div>
		</div>
	) : null;
}
