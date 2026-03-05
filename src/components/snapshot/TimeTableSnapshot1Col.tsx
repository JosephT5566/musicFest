import React from 'react';
import {
	parseISO,
	isValid,
	differenceInMinutes,
	getMinutes,
	setSeconds,
	subMinutes,
	addMinutes,
	isBefore,
	format,
	startOfMinute,
} from 'date-fns';

import { useGetSelectedShow } from 'providers/ShowsProvider';
// import { SCALE_UNIT } from 'constants/static';
import { palette } from 'styles/palette';
import { ISchedule, IArtistV2 } from 'types/show';

const SCALE_UNIT = 1.1;

interface props {
	schedule: ISchedule;
	selectedDay: number;
	artists: IArtistV2[];
	captureRef: React.RefObject<HTMLDivElement>;
}

type ArtistWithLayout = IArtistV2 & {
	stageName: string;
	_start: Date;
	_end: Date;
	layout: {
		top: number;
		height: number;
		width: number;
		left: number;
		isOverlapping: boolean;
	};
};

/**
 * Takes a list of artists for a column and calculates their layout properties
 * to handle overlaps by placing them side-by-side.
 * @param artists Artists in the column, sorted by start time.
 * @param columnStartTime The start time of the first artist in the column.
 * @returns A list of artists with added layout properties (top, height, width, left, isOverlapping).
 */
function getLayoutedArtists(
	artists: (IArtistV2 & { _start: Date; _end: Date; stageName: string })[],
	columnStartTime: Date,
): ArtistWithLayout[] {
	if (artists.length === 0) {
		return [];
	}

	// 1. Group artists that visually overlap in time.
	const groups: (typeof artists)[] = [];
	if (artists.length > 0) {
		let currentGroup = [artists[0]];
		let groupEndTime = artists[0]._end;

		for (let i = 1; i < artists.length; i++) {
			const artist = artists[i];
			if (artist._start < groupEndTime) {
				currentGroup.push(artist);
				if (artist._end > groupEndTime) {
					groupEndTime = artist._end;
				}
			} else {
				groups.push(currentGroup);
				currentGroup = [artist];
				groupEndTime = artist._end;
			}
		}
		groups.push(currentGroup);
	}

	const layoutedArtists: ArtistWithLayout[] = [];

	for (const group of groups) {
		// 2. For each group, find the maximum number of concurrent artists.
		// This determines how many sub-columns we need.
		const points = group
			.flatMap((a) => [
				{ time: a._start, type: 1 },
				{ time: a._end, type: -1 },
			])
			.sort((a, b) => a.time.getTime() - b.time.getTime());

		let maxConcurrent = 0;
		let currentConcurrent = 0;
		for (const point of points) {
			currentConcurrent += point.type;
			maxConcurrent = Math.max(maxConcurrent, currentConcurrent);
		}

		const isOverlapping = maxConcurrent > 1;

		// 3. Assign each artist to a "lane" (sub-column).
		const laneEndTimes = new Array(maxConcurrent).fill(new Date(0));
		for (const artist of group) {
			for (let i = 0; i < laneEndTimes.length; i++) {
				if (artist._start >= laneEndTimes[i]) {
					const width = 100 / maxConcurrent;
					const left = i * width;

					layoutedArtists.push({
						...artist,
						layout: {
							top:
								(differenceInMinutes(artist._start, columnStartTime) / 15) *
								SCALE_UNIT,
							height:
								(differenceInMinutes(artist._end, artist._start) / 15) * SCALE_UNIT,
							width: width,
							left: left,
							isOverlapping,
						},
					});
					laneEndTimes[i] = artist._end;
					break;
				}
			}
		}
	}

	return layoutedArtists;
}

function normalizeDateString(dateString?: string) {
	if (typeof dateString !== 'string') return undefined;
	// YYYY-MM-DDHH:mm:ss -> YYYY-MM-DDTHH:mm:ss
	if (dateString.length === 19 && dateString[10] !== 'T') {
		return dateString.substring(0, 10) + 'T' + dateString.substring(10);
	}
	return dateString;
}

export default function TimeTableSnapshot({ schedule, selectedDay, artists, captureRef }: props) {
	if (!schedule || !schedule[selectedDay]) {
		return <div>Loading...</div>;
	}

	const stages = schedule[selectedDay].stages;
	const selectedIds = useGetSelectedShow();

	const stageNameIndexMap = new Map<string, number>();
	stages.forEach((stage, index) => {
		stageNameIndexMap.set(stage.name, index);
	});

	const stageArtists = stages
		.flatMap((stage) =>
			stage.artistIds
				.filter((id) => selectedIds.includes(id))
				.map((id) => {
					const artist = artists.find((item) => item.id === id);
					if (!artist || !artist.startTime || !artist.endTime) {
						return null;
					}

					const start = parseISO(normalizeDateString(artist.startTime)!);
					const end = parseISO(normalizeDateString(artist.endTime)!);
					if (!isValid(start) || !isValid(end)) {
						return null;
					}

					return {
						...artist,
						stageName: artist.stageName ?? stage.name,
						_start: start,
						_end: end,
					};
				}),
		)
		.filter(
			(
				artist,
			): artist is IArtistV2 & {
				stageName: string;
				_start: Date;
				_end: Date;
			} => Boolean(artist),
		)
		.sort((a, b) => a._start.getTime() - b._start.getTime());

	const columnCount = 1;

	// Distribute artists into columns based on fixed time slices of the day
	// to create a balanced layout.
	const day_startTime = parseISO(schedule[selectedDay].dayStartTime!);
	const day_endTime = parseISO(schedule[selectedDay].dayEndTime!);
	const totalDuration = differenceInMinutes(day_endTime, day_startTime);
	console.log('Total duration in minutes:', totalDuration);
	const timeSliceDuration = totalDuration / columnCount;
	console.log('Time slice duration in minutes:', timeSliceDuration);

	const columns: (typeof stageArtists)[] = Array.from({ length: columnCount }, () => []);

	for (const artist of stageArtists) {
		const artistOffset = differenceInMinutes(artist._start, day_startTime);
		let columnIndex = Math.floor(artistOffset / timeSliceDuration);
		if (columnIndex >= columnCount) {
			columnIndex = columnCount - 1;
		}
		if (columns[columnIndex]) {
			columns[columnIndex].push(artist);
		}
	}

	return (
		<div
			ref={captureRef}
			className="w-screen h-screen max-h-screen px-4 pb-4 relative flex flex-col mb-[1em] bg-background"
		>
			<div className="flex pb-10 items-end justify-center font-['Contrail_One'] font-bold whitespace-pre-wrap">
				<h1 className="text-5xl font-bold text-center tracking-widest">
					{`Megaport
2026`}
				</h1>
			</div>
			<div className="flex flex-col w-full gap-3">
				<div
					className="grid gap-3 w-full h-full"
					style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
				>
					{columns.map((artists, index) => {
						if (artists.length === 0) {
							return <div key={index} />;
						}

						const columnStartTime = artists[0]._start;
						const columnEndTime = artists[artists.length - 1]._end;
						const columnDuration = differenceInMinutes(columnEndTime, columnStartTime);
						const columnHeight = (columnDuration / 15) * SCALE_UNIT;

						const scaleTicks = [];
						if (artists.length > 0) {
							const currentMinutes = getMinutes(columnStartTime);
							const scaleStartTime = setSeconds(
								subMinutes(columnStartTime, currentMinutes % 10),
								0,
							);

							let scaleEndTime = columnEndTime;
							if (getMinutes(scaleEndTime) % 10 !== 0) {
								scaleEndTime = startOfMinute(
									addMinutes(scaleEndTime, 10 - (getMinutes(scaleEndTime) % 10)),
								);
							}

							let currentTime = scaleStartTime;
							while (isBefore(currentTime, scaleEndTime)) {
								const top =
									(differenceInMinutes(currentTime, columnStartTime) / 15) *
									SCALE_UNIT;
								scaleTicks.push(
									<div
										key={currentTime.toISOString()}
										className="absolute right-0 text-right"
										style={{ top: `${top}rem`, height: '1px' }}
									>
										{getMinutes(currentTime) === 0 ||
										getMinutes(currentTime) === 30 ? (
											<>
												<span className="absolute -top-[0.5rem] right-2.5 text-[8px]">
													{format(currentTime, 'HH:mm')}
												</span>
												<div
													className="w-1.5 h-px"
													style={{ backgroundColor: 'orange' }}
												></div>
											</>
										) : (
											<div
												className="w-3 h-px"
												style={{ backgroundColor: 'orange' }}
											></div>
										)}
									</div>,
								);
								currentTime = addMinutes(currentTime, 10);
							}
						}

						const layoutedArtists = getLayoutedArtists(artists, columnStartTime);

						return (
							<div
								key={index}
								className="flex flex-row gap-1"
								style={{ height: `${columnHeight}rem` }}
							>
								<div className="w-8 shrink-0 relative">{scaleTicks}</div>
								<div className="relative w-full">
									{layoutedArtists.map((artist) => {
										const { top, height, width, left, isOverlapping } =
											artist.layout;

										const stageIndex = stageNameIndexMap.get(artist.stageName);
										const color =
											stageIndex !== undefined
												? palette.stage[
														stageIndex as keyof typeof palette.stage
													]
												: null;

										return (
											<div
												key={artist.id}
												className="absolute pr-1"
												style={{
													top: `${top}rem`,
													height: `${height}rem`,
													width: `${width}%`,
													left: `${left}%`,
												}}
											>
												<div
													className="relative flex flex-col justify-between px-2 pb-3 items-stretch rounded-r-md bg-card text-card-foreground shadow-sm h-full"
													style={{
														backgroundColor:
															`${color?.main}9D` || 'white',
														color: 'white',
													}}
												>
													<div
														className={`text-xs font-bold text-foreground ${
															isOverlapping ? 'text-[10px]' : ''
														}`}
													>
														{artist.name}
													</div>
													<div
														className={`absolute bottom-1 right-1 px-2 py-0.5 rounded-md flex items-center justify-center text-[10px] text-[#364153] bg-accent`}
													>
														<p
															className={`relative bottom-1.5 ${
																isOverlapping ? 'text-[8px]' : ''
															}`}
														>
															{artist.stageName}
														</p>
													</div>{' '}
												</div>
											</div>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
