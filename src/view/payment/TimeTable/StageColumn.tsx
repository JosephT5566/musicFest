'use client';
import React from 'react';
import { differenceInMinutes, getMinutes } from 'date-fns';
import { Button } from '@/components/ui/button';

import { useGetSelectedShow, useSelectShow } from 'providers/ShowsProvider';
import { SCALE_UNIT } from 'constants/static';
import { IArtist, IStage } from 'types/show';

const MovingTime = (props: { prevEndTime: Date; startTime: Date }) => {
	const { prevEndTime, startTime } = props;
	const height = differenceInMinutes(startTime, prevEndTime) / 10;
	const prevEndTimeMin = getMinutes(prevEndTime);

	if (height <= 0) {
		return null;
	}

	return (
		<>
			{Array.from({ length: height }, (_, index) => {
				const theHour = (prevEndTimeMin + 10 + index * 10) % 60 === 0 ? 'theHour' : '';
				return (
					<div
						key={index}
						className={`gap-time relative after:content-[''] after:absolute after:h-[1px] after:w-[90%] after:bottom-[-0.5px] after:left-1/2 after:-translate-x-1/2 ${
							theHour === 'theHour' ? 'after:bg-secondary' : 'after:bg-paper'
						}`}
						style={{ height: `${SCALE_UNIT}rem` }}
					/>
				);
			})}
		</>
	);
};

const ShowButton = (props: {
	show: IArtist;
	buttonColor: { main: string };
	active: boolean;
	onClick: () => void;
}) => {
	const { show, buttonColor, active, onClick } = props;
	const startTime = new Date(show.startTime);
	const endTime = new Date(show.endTime);
	const height = differenceInMinutes(endTime, startTime) / 10;

	return (
		<Button
			className={`font-sans w-full rounded-md border-none tracking-normal normal-case bg-paper hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-800 ${
				active ? 'text-secondary-foreground' : 'text-foreground'
			} text-xs sm:text-sm`}
			style={{
				height: `${height * SCALE_UNIT}rem`,
				backgroundColor: active ? buttonColor.main : undefined,
			}}
			onClick={onClick}
		>
			{show.name}
		</Button>
	);
};

export default function StageColumn(props: {
	dayStartTime: Date;
	dayEndTime: Date;
	stage: IStage;
	stageColor: { main: string };
	day: number;
}) {
	const { dayStartTime, dayEndTime, stage, stageColor, day } = props;
	const { artists } = stage;
	const selectedIds = useGetSelectedShow();
	const selectShow = useSelectShow();

	const finalEndTime = dayEndTime;
	const prevEndTimes = [dayStartTime, ...artists.map((s) => new Date(s.endTime))];

	const handleClickButton = (id: string) => {
		selectShow(id);
	};

	return (
		<div className="text-center w-[4.8rem] sm:w-[5.8rem] md:w-[7.4rem]">
			<div
				className="h-16 flex justify-center items-center font-bold mb-4 tracking-wider"
				style={{ backgroundColor: stageColor.main }}
			>
				{stage.name}
			</div>
			{artists.map((artist, index) => {
				const start = new Date(artist.startTime);

				return (
					<div key={index}>
						<MovingTime prevEndTime={prevEndTimes[index]} startTime={start} />
						<ShowButton
							show={artist}
							buttonColor={stageColor}
							active={selectedIds.includes(artist.id)}
							onClick={() => {
								handleClickButton(artist.id);
							}}
						/>
					</div>
				);
			})}
			<MovingTime
				prevEndTime={new Date(artists[artists.length - 1].endTime)}
				startTime={finalEndTime}
			/>
		</div>
	);
}
