import React from 'react';
import moment from 'moment';

import TimeScale from './TimeScale';
import TableOfDay from './TableOfDay';
import { ISchedule, IArtistV2 } from 'types/show';

interface props {
	programList: ISchedule;
	selectedDay: number;
	artists: IArtistV2[];
}

export default function TimeTable({ programList, selectedDay, artists }: props) {
	const startTime = moment(programList[selectedDay].dayStartTime);
	const endTime = moment(programList[selectedDay].dayEndTime);

	return (
		<div className="w-full relative flex flex-row mb-[1em] overflow-y-hidden">
			<TimeScale startTime={startTime} endTime={endTime} />
			{programList.map((perfDay, index) => {
				return (
					<TableOfDay
						key={index}
						perfDay={perfDay}
						day={index}
						selected={selectedDay}
						artists={artists}
					/>
				);
			})}
		</div>
	);
}
