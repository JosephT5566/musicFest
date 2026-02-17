import React from 'react';
import moment from 'moment';

import TimeScale from './TimeScale';
import TableOfDay from './TableOfDay';

import { IProgramList } from 'types/show';

interface props {
	programList: IProgramList;
	selectedDay: number;
}

export default function TimeTable({ programList, selectedDay }: props) {
	const startTime = moment(programList.perfDays[selectedDay].dayStartTime);
	const endTime = moment(programList.perfDays[selectedDay].dayEndTime);

	return (
		<div className="w-full relative flex flex-row mb-[1em] overflow-y-hidden">
			<TimeScale startTime={startTime} endTime={endTime} />
			{programList.perfDays.map((perfDay, index) => {
				return (
					<TableOfDay key={index} perfDay={perfDay} day={index} selected={selectedDay} />
				);
			})}
		</div>
	);
}