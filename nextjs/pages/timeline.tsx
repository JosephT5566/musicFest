import React, { useState, useEffect } from 'react';

import DaySelector from 'components/shared/DaySelector';
import { PageContainer } from 'components/base/Container';
import TimeLine from 'view/payment/TimeLine';

import programList from 'static/program/megaport2021';
import { STORAGE_KEY } from 'static';

export interface ISelectedShows {
	stageIndex: number;
	showIndex: number;
}

export default function TimeLinePage() {
	const [selectedDay, setSelectedDay] = useState(0);

	const handleClick = (value: number) => {
		setSelectedDay(value);
		localStorage.setItem(STORAGE_KEY.day, value.toString());
	};

	useEffect(() => {
		// GApageView(window.location.hostname + window.location.pathname);

		setSelectedDay(Number(localStorage.getItem(STORAGE_KEY.day)));
	}, []);

	return (
		<PageContainer>
			<DaySelector days={['3/27', '3/28']} selectedDay={selectedDay} onClick={handleClick} />
			<TimeLine programList={programList} selectedDay={selectedDay} />
		</PageContainer>
	);
}
