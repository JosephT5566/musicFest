import React from 'react';
import moment from 'moment';

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

					const start = moment(artist.startTime);
					const end = moment(artist.endTime);
					if (!start.isValid() || !end.isValid()) {
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
				_start: moment.Moment;
				_end: moment.Moment;
			} => Boolean(artist),
		)
		.sort((a, b) => a._start.diff(b._start));

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
						const columnDuration = columnEndTime.diff(columnStartTime, 'minute');
						const columnHeight = (columnDuration / 15) * SCALE_UNIT;

						const scaleTicks = [];
						if (artists.length > 0) {
							const scaleStartTime = columnStartTime
								.clone()
								.subtract(columnStartTime.minute() % 10, 'minutes')
								.second(0);
							const scaleEndTime = columnEndTime.clone();
							if (scaleEndTime.minute() % 10 !== 0) {
								scaleEndTime
									.add(10 - (scaleEndTime.minute() % 10), 'minutes')
									.startOf('minute');
							}

							let currentTime = scaleStartTime.clone();
							while (currentTime.isBefore(scaleEndTime)) {
								const top =
									(currentTime.diff(columnStartTime, 'minute') / 15) * SCALE_UNIT;
								scaleTicks.push(
									<div
										key={currentTime.toISOString()}
										className="absolute right-0 text-right"
										style={{ top: `${top}rem`, height: '1px' }}
									>
										{currentTime.minute() === 0 ||
										currentTime.minute() === 30 ? (
											<>
												<span className="absolute -top-[0.4rem] right-2.5 text-xs">
													{currentTime.format('HH:mm')}
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
								currentTime.add(10, 'minutes');
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
											(artist._end.diff(artist._start, 'minute') / 15) *
											SCALE_UNIT;
										const top =
											(artist._start.diff(columnStartTime, 'minute') / 15) *
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
													className="flex items-stretch rounded-md border border-border bg-card text-card-foreground shadow-sm h-full"
													style={{
														backgroundColor:
															`${color?.main}9D` || 'white',
														color: 'white',
													}}
												>
													{/* <div
														className="flex flex-col items-center justify-center px-2 py-1 text-[11px] font-semibold min-w-[3rem]"
														style={
															color
																? {
																		backgroundColor: color.main,
																		color: 'white',
																	}
																: {}
														}
													>
														<span>{artist._start.format('HH:mm')}</span>
														<span>-</span>
														<span>{artist._end.format('HH:mm')}</span>
													</div> */}
													<div className="flex flex-col justify-center px-3 py-2">
														<div className="text-sm font-semibold text-foreground">
															{artist.name}
														</div>
														<div className="text-xs text-muted-foreground">
															{artist.stageName}
														</div>
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
