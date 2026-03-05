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

const SCALE_UNIT = 1.7;

interface props {
	schedule: ISchedule;
	selectedDay: number;
	artists: IArtistV2[];
	captureRef: React.RefObject<HTMLDivElement>;
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

	const columnCount = 2;
	const artistsPerColumn = Math.ceil(stageArtists.length / columnCount);

	const columns = Array.from({ length: columnCount }, (_, i) =>
		stageArtists.slice(i * artistsPerColumn, (i + 1) * artistsPerColumn),
	);

	return (
		<div
			ref={captureRef}
			className="w-[100vw] h-[100vh] px-4 pb-4 relative flex flex-col mb-[1em] overflow-y-hidden bg-background"
		>
			<div className="h-1/4 flex items-center justify-center">
				<h1 className="text-5xl font-bold text-center tracking-widest">Megaport 2026</h1>
			</div>
			<div className="h-3/4 flex flex-col w-full gap-3">
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
												<span className="absolute -top-[0.4rem] right-2.5 text-xs">
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

						return (
							<div
								key={index}
								className="flex flex-row"
								style={{ height: `${columnHeight}rem` }}
							>
								<div className="w-8 shrink-0 relative">{scaleTicks}</div>
								<div className="relative w-full">
									{artists.map((artist) => {
										const height =
											(differenceInMinutes(artist._end, artist._start) / 15) *
											SCALE_UNIT;
										const top =
											(differenceInMinutes(artist._start, columnStartTime) /
												15) *
											SCALE_UNIT;

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
												className="absolute w-full pr-1"
												style={{
													top: `${top}rem`,
													height: `${height}rem`,
												}}
											>
												<div
													className="flex flex-col justify-between p-2 items-stretch rounded-r-md bg-card text-card-foreground shadow-sm h-full"
													style={{
														backgroundColor:
															`${color?.main}9D` || 'white',
														color: 'white',
													}}
												>
													<div className="text-xs font-bold text-foreground">
														{artist.name}
													</div>
													<div className="text-xs text-gray-700">
														{artist.stageName}
													</div>
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
