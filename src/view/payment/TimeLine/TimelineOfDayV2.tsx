'use client';
import React, { useState } from 'react';
import { palette } from 'styles/palette';
import { SCALE_UNIT } from 'constants/static';
import { IArtist, IStage } from 'types/show';
import moment, { Moment } from 'moment';

import { useSelectShow } from 'providers/ShowsProvider';
import { generateGoogleCalendarLink, toUTCFormat } from 'utils/googleUtils';
import { P } from 'components/base/Typography';
import { Button } from '@/components/ui/button';
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerDescription,
	DrawerTrigger,
} from '@/components/ui/drawer';

interface ShowItem extends IArtist {
	stageName: string;
	layer: number;
	itemColor: { main: string };
	overlappingCount: number;
}

interface TimeLineButtonProps {
	megaStartTime: Moment;
	showInfo: ShowItem;
	id: string;
	onClick: (show: ShowItem) => void;
}

const TimeLineButton: React.FC<TimeLineButtonProps> = ({
	megaStartTime,
	showInfo,
	id,
	onClick,
}) => {
	const { name, startTime, endTime, itemColor, stageName, layer, overlappingCount } = showInfo;
	const startMoment = moment(startTime);
	const endMoment = moment(endTime);

	const top = moment.duration(startMoment.diff(megaStartTime)).asMinutes() / 10;
	const height = moment.duration(endMoment.diff(startMoment)).asMinutes() / 10;

	// Calculate width based on overlapping events
	const width = 100 / overlappingCount;
	// The left position is now based on the layer number (0, 1, 2, etc.)
	const leftPosition = layer * width;

	return (
		<div
			className="timeline-button-wrapper absolute flex-row w-full"
			style={{
				top: `calc(${top * SCALE_UNIT}rem + 0.5rem)`,
			}}
		>
			<DrawerTrigger asChild onClick={() => onClick(showInfo)}>
				<Button
					className={`timeline-button timeline-button-${name
						.toLowerCase()
						.replace(
							/\s+/g,
							'-',
						)} absolute border-none rounded-sm p-1 z-10 normal-case hover:brightness-95`}
					style={{
						left: `${leftPosition}%`,
						width: `${width}%`,
						minHeight: `${height * SCALE_UNIT}rem`,
						height: `${height * SCALE_UNIT}rem`,
						backgroundColor: itemColor.main,
					}}
				>
					<div className="flex flex-col items-center gap-0.5 w-full overflow-hidden">
						<P className="timeline-button-title text-secondary-foreground text-xs font-bold w-full text-center">
							{name}
						</P>
						<P className="timeline-button-stage-name text-secondary-foreground text-[10px] w-full text-center">
							{stageName}
						</P>
					</div>
				</Button>
			</DrawerTrigger>
		</div>
	);
};

interface TimeLineOfDayV2Props {
	startTime: Moment;
	endTime: Moment;
	stages: IStage[];
	day: number;
	selectedDay: number;
}

export default function TimeLineOfDayV2(props: TimeLineOfDayV2Props) {
	const { startTime, endTime, stages, day, selectedDay } = props;
	const height = moment.duration(endTime.diff(startTime)).asMinutes() / 10;
	const [selectedShow, setSelectedShow] = useState<ShowItem | null>(null);
	const selectShow = useSelectShow();

	// Initialize stages with basic info
	const processedStages: ShowItem[][] = stages
		.map((stage, index) =>
			stage.artists.map((artist) => ({
				stageName: stage.name,
				itemColor: palette.stage[index as keyof typeof palette.stage],
				layer: 0,
				overlappingCount: 1,
				...artist,
			})),
		)
		.filter((items) => items.length > 0);

	// Flatten all artists into a single array
	const allArtists = processedStages.flat();

	// Function to check if two time ranges overlap
	const isOverlapping = (event1: ShowItem, event2: ShowItem) => {
		const start1 = moment(event1.startTime);
		const end1 = moment(event1.endTime);
		const start2 = moment(event2.startTime);
		const end2 = moment(event2.endTime);
		return start1 < end2 && start2 < end1;
	};

	// Find overlapping groups
	const overlappingGroups: ShowItem[][] = [];
	const processedIds = new Set<string>();

	allArtists.forEach((artist) => {
		if (processedIds.has(artist.id)) {
			return;
		}

		const overlappingGroup = [artist];
		processedIds.add(artist.id);

		// Find all artists that overlap with the current group
		allArtists.forEach((otherArtist) => {
			if (artist.id === otherArtist.id) {
				return;
			}

			// Check if the other artist overlaps with any artist in the current group
			const hasOverlap = overlappingGroup.some((groupArtist) =>
				isOverlapping(groupArtist, otherArtist),
			);

			if (hasOverlap && !overlappingGroup.some((a) => a.id === otherArtist.id)) {
				overlappingGroup.push(otherArtist);
			}
		});

		if (overlappingGroup.length > 0) {
			// Sort by start time within group
			overlappingGroup.sort((a, b) => moment(a.startTime).diff(moment(b.startTime)));

			// Assign layers and overlapping count
			overlappingGroup.forEach((artist, index) => {
				artist.layer = index;
				artist.overlappingCount = overlappingGroup.length;
			});

			overlappingGroups.push(overlappingGroup);
		}
	});

	return (
		<Drawer>
			<div
				className={`timeline-container timeline-day-${day} ${day === selectedDay ? 'flex' : 'hidden'} w-full relative flex-col`}
				style={{ height: `${height * SCALE_UNIT}rem` }}
			>
				{allArtists.map((item) => (
					<TimeLineButton
						megaStartTime={startTime}
						key={item.id}
						showInfo={item}
						id={item.id}
						onClick={setSelectedShow}
					/>
				))}
			</div>
			<DrawerContent className='h-[30dvh]'>
				{selectedShow && (
					<>
						<DrawerHeader>
							<DrawerTitle className="text-center">
								{selectedShow.name}
							</DrawerTitle>
							<DrawerDescription className="">
								{moment(selectedShow.startTime).format('YYYY/M/D(ddd) HH:mm')} -{' '}
								{moment(selectedShow.endTime).format('HH:mm')}
							</DrawerDescription>
						</DrawerHeader>
						<P className="font-bold text-center">{selectedShow.stageName}</P>
						<div className="absolute bottom-8 left-4 flex flex-col gap-2">
							<Button
								onClick={() => {
									const formattedStartTime = toUTCFormat(selectedShow.startTime);
									const formattedEndTime = toUTCFormat(selectedShow.endTime);

									const calendarLink = generateGoogleCalendarLink({
										title: `${selectedShow.stageName} - ${selectedShow.name}`,
										startDateTime: formattedStartTime,
										endDateTime: formattedEndTime,
										details: selectedShow.stageName,
										location: '',
									});
									window.open(calendarLink, '_blank');
								}}
								className='bg-green-600'
							>
								新增到 Google 日曆
							</Button>
							<Button
								onClick={() => {
									selectShow(selectedShow.id);
								}}
								variant="outline"
								className="border-red-600 text-red-600"
							>
								移除選擇
							</Button>
						</div>
					</>
				)}
			</DrawerContent>
		</Drawer>
	);
}
