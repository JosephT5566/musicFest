'use client';
import React, { useState } from 'react';
import { palette } from 'styles/palette';
import { SCALE_UNIT } from 'constants/static';
import { IArtist, IStage } from 'types/show';
import moment, { Moment } from 'moment';

import { useSelectShow } from 'providers/ShowsProvider';
import { generateGoogleCalendarLink, toUTCFormat } from 'utils/googleUtils';
import { H1, H2, P } from 'components/base/Typography';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';

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
}

const TimeLineButton: React.FC<TimeLineButtonProps> = ({ megaStartTime, showInfo, id }) => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const { name, startTime, endTime, itemColor, stageName, layer, overlappingCount } = showInfo;
	const startMoment = moment(startTime);
	const endMoment = moment(endTime);
	const selectShow = useSelectShow();

	const top = moment.duration(startMoment.diff(megaStartTime)).asMinutes() / 10;
	const height = moment.duration(endMoment.diff(startMoment)).asMinutes() / 10;

	// Calculate width based on overlapping events
	const width = 100 / overlappingCount;
	// The left position is now based on the layer number (0, 1, 2, etc.)
	const leftPosition = layer * width;

	const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
		if (
			event &&
			event.type === 'keydown' &&
			((event as React.KeyboardEvent).key === 'Tab' ||
				(event as React.KeyboardEvent).key === 'Shift')
		) {
			return;
		}
		setDrawerOpen(open);
	};

	return (
		<>
			<div
				className="timeline-button-wrapper absolute flex-row w-full"
				style={{
					top: `calc(${top * SCALE_UNIT}rem + 0.5rem)`,
				}}
			>
				<Button
					className={`timeline-button timeline-button-${name
						.toLowerCase()
						.replace(/\s+/g, '-')} absolute border-none rounded-sm p-1 z-10 normal-case hover:brightness-95`}
					onClick={toggleDrawer(true)}
					style={{
						left: `${leftPosition}%`,
						width: `${width}%`,
						minHeight: `${height * SCALE_UNIT}rem`,
						height: `${height * SCALE_UNIT}rem`,
						backgroundColor: itemColor.main,
					}}
				>
					<div className="flex flex-col items-center gap-1 text-primary-foreground">
						<P className="timeline-button-title text-secondary-foreground">
							{name}
						</P>
						<P className="timeline-button-stage-name text-secondary-foreground">
							{stageName}
						</P>
					</div>
				</Button>
			</div>
			<Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
				<SheetContent side="bottom" className="rounded-t-lg p-2 min-h-[30vh] relative pt-4">
					<div className="w-30 h-6 bg-secondary-main rounded-md absolute top-2 left-1/2 -translate-x-1/2" />
					<H2 className="text-center" >
						{name}
					</H2>
					<P>
						{startMoment.format('YYYY/M/D(ddd) HH:mm')} - {endMoment.format('HH:mm')}
					</P>
					<P className="font-bold">
						{stageName}
					</P>
					<div
						className="absolute bottom-8 left-4 flex flex-col gap-2"
					>
						<Button
							onClick={() => {
								const formattedStartTime = toUTCFormat(startTime);
								const formattedEndTime = toUTCFormat(endTime);

								const calendarLink = generateGoogleCalendarLink({
									title: `${stageName} - ${name}`,
									startDateTime: formattedStartTime,
									endDateTime: formattedEndTime,
									details: stageName,
									location: '',
								});
								window.open(calendarLink, '_blank');
							}}
              variant="default"
						>
							新增到 Google 日曆
						</Button>
						<Button
							onClick={() => {
								selectShow(id);
							}}
              variant="destructive"
						>
							移除選擇
						</Button>
					</div>
				</SheetContent>
			</Sheet>
		</>
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

	// Initialize stages with basic info
	const processedStages: ShowItem[][] = stages
		.map((stage, index) =>
			stage.artists.map((artist) => ({
				stageName: stage.name,
				itemColor: palette.stage[index as keyof typeof palette.stage],
				layer: 0,
				overlappingCount: 1,
				...artist,
			}))
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
				isOverlapping(groupArtist, otherArtist)
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
		<div
			className={`timeline-container timeline-day-${day} ${day === selectedDay ? 'flex' : 'hidden'} h-[${height * SCALE_UNIT}rem] w-[calc(100vw - 1em - 3.8em)] relative flex-col`}
		>
			{allArtists.map((item) => (
				<TimeLineButton
					megaStartTime={startTime}
					key={item.id}
					showInfo={item}
					id={item.id}
				/>
			))}
		</div>
	);
}