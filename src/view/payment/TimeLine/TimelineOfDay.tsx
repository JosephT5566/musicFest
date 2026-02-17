'use client';
import React, { useState, useEffect, useRef } from 'react';

import moment, { Moment } from 'moment';

import { palette } from 'styles/palette';
import { SCALE_UNIT } from 'constants/static';
import { IArtist, IStage } from 'types/show';
import { Button } from '@/components/ui/button';
import useClickOutside from 'hooks/useClickOutside';
import { P } from 'components/base/Typography';

type ShowItem = IArtist & {
	stageName: string;
	layer: number;
	itemColor: { main: string };
};

const TimeLineButton = (props: { megaStartTime: Moment; showInfo: ShowItem; day: number }) => {
	const { megaStartTime, showInfo, day } = props;
	const [active, setActive] = useState(false);
	const buttonRef = useRef(null);

	const { text: textColor } = palette;
	const { name, startTime, endTime, layer, itemColor, stageName } = showInfo;
	const startMoment = moment(startTime);
	const endMoment = moment(endTime);

	const top = moment.duration(startMoment.diff(megaStartTime)).asMinutes() / 10;
	const height = moment.duration(endMoment.diff(startMoment)).asMinutes() / 10;
	const left = layer;

	const handleClick = () => {
		setActive((prev) => !prev);
	};

	const handleClickAway = () => {
		if (active) {
			setActive(false);
		}
	};

	useClickOutside(buttonRef, handleClickAway);

	return (
		<div
			style={{
				top: `calc(${top * SCALE_UNIT}rem + 0.5rem)`,
			}}
			className="absolute flex flex-row w-full"
			ref={buttonRef}
		>
			<div
				className={`${active ? 'ml-0 opacity-0' : 'ml-[40%]'} transition-all duration-500 flex flex-col px-2 bg-background z-0 after:content-[''] after:mt-1 after:h-[3px] after:w-[80%] after:bg-primary-main text-xs sm:text-base`}
			>
				{name}
			</div>
			<Button
				onClick={handleClick}
				style={{
					left: `${left + left * 1}em`,
					minHeight: `${height * SCALE_UNIT}rem`,
					height: `${height * SCALE_UNIT}rem`,
					backgroundColor: itemColor.main,
					color: active ? textColor.primary : textColor.secondary,
				}}
				className={`absolute border-none rounded-md transition-all duration-500 ease-out w-[1.2rem] z-10 hover:cursor-pointer focus:outline-none ${active ? 'w-60 z-20' : ''}`}
			>
				<div
					className={`text-primary hidden absolute top-2 left-2 flex-col items-start w-60 ${active ? 'flex' : ''}`}
				>
					<P className="font-bold text-base w-full">{name}</P>
					<P>{stageName}</P>
					<P>{startMoment.format('HH:mm') + ' - ' + endMoment.format('HH:mm')}</P>
				</div>
			</Button>
		</div>
	);
};

export default function TimeLineOfDay(props: {
	startTime: Moment;
	endTime: Moment;
	stages: IStage[];
	day: number;
	selectedDay: number;
}) {
	const { startTime, endTime, stages, day, selectedDay } = props;

	const height = moment.duration(endTime.diff(startTime)).asMinutes() / 10;
	const layerHashRef = useRef<number[]>(new Array(Math.floor(height)).fill(0));

	useEffect(() => {
		// reset layerHashRef every re-render
		layerHashRef.current = new Array(Math.floor(height)).fill(0);
	});

	const filteredStages: ShowItem[][] = stages
		.map((stage, index) =>
			stage.artists.map((artist) => ({
				stageName: stage.name,
				itemColor: palette.stage[index as keyof typeof palette.stage],
				layer: 0,
				...artist,
			})),
		)
		.filter((item) => item.length !== 0)
		.map((stages) => {
			return stages.map((item) => {
				const startMoment = moment(item.startTime);
				const endMoment = moment(item.endTime);
				const top = moment.duration(startMoment.diff(startTime)).asMinutes() / 10;
				const height = moment.duration(endMoment.diff(startMoment)).asMinutes() / 10;
				let layer = 0;

				for (let i = top; i <= top + height; i++) {
					layerHashRef.current[i] += 1;
					if (layerHashRef.current[i] > layer) {
						layer = layerHashRef.current[i];
					}
				}
				// console.log('layerHashRef.current', layerHashRef.current);

				return {
					...item,
					layer: layer - 1,
				};
			});
		});

	return (
		<div
			style={{
				display: day === selectedDay ? '' : 'none',
				height: `${height * SCALE_UNIT}rem`,
			}}
			className="w-[calc(100vw - 1em - 3.8em)] flex relative flex-col"
		>
			{filteredStages.map((stage) => {
				return stage.map((item) => (
					<TimeLineButton
						megaStartTime={startTime}
						key={item.id}
						showInfo={item}
						day={day}
					/>
				));
			})}
		</div>
	);
}
