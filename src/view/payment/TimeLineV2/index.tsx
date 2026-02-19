'use client';
import React from 'react';
import moment from 'moment';
import { CircleSmall } from 'lucide-react';

import TimeBackdrop from './TimeBackdrop';
import TimeLineOfDayV2 from './TimelineOfDayV2';

import { useGetSelectedShow } from 'providers/ShowsProvider';
import { SCALE_UNIT } from 'constants/static';
import { ISchedule, IArtistV2 } from 'types/show';

interface Props {
	programList: ISchedule;
	selectedDay: number;
	artists: IArtistV2[];
}

const BaseLine = (props: { programList: ISchedule }) => {
	const { programList } = props;

	return (
		<div className="w-[3.8em] mr-[1em]">
			{new Array(63).fill(undefined).map((_, index) => {
				const time = moment(programList[0].dayStartTime).add(10 * index, 'm');
				const mm = time.minute();
				return mm === 0 ? (
					<div
						key={index}
						style={{ height: `${SCALE_UNIT}rem` }}
						className="relative flex items-center w-[3.7em]"
					>
						<div className="text-secondary pr-[0.5em] text-[14px] sm:text-inherit">
							{time.format('HH:mm')}
						</div>
						<CircleSmall className="absolute right-0 translate-x-[54%]" />
					</div>
				) : (
					<div
						key={index}
						style={{ height: `${SCALE_UNIT}rem` }}
						className="relative w-[3.7em] border-r-2 border-secondary after:content-[''] after:absolute after:top-1/2 after:right-0 after:translate-x-[60%] after:h-[1px] after:w-[0.5em] after:bg-secondary"
					/>
				);
			})}
		</div>
	);
};

export default function TimeLine({ programList, selectedDay, artists }: Props) {
	const selectedIds = useGetSelectedShow();
	const dayStartTime = moment(programList[selectedDay].dayStartTime);
	const dayEndTime = moment(programList[selectedDay].dayEndTime);

	const filteredPerfDays = programList.map((perfDay) => {
		return {
			...perfDay,
			stages: perfDay.stages.map((stage) => {
				return {
					...stage,
					artistIds: stage.artistIds.filter((id) => selectedIds.includes(id)),
				};
			}),
		};
	});

	return (
		<div className="w-full relative flex">
			<TimeBackdrop dayStartTime={dayStartTime} dayEndTime={dayEndTime} />
			<BaseLine programList={programList} />
			{filteredPerfDays.map((perfDay, index) => {
				return (
					<TimeLineOfDayV2
						startTime={moment(perfDay.dayStartTime)}
						endTime={moment(perfDay.dayEndTime)}
						key={index}
						stages={perfDay.stages}
						day={index}
						selectedDay={selectedDay}
						artists={artists}
					/>
				);
			})}
		</div>
	);
}
