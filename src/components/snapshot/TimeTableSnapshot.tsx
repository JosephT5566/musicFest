import React from 'react';
import moment from 'moment';

import { useGetSelectedShow } from 'providers/ShowsProvider';
import { MIN, SCALE_UNIT } from 'constants/static';
import { ISchedule, IArtistV2 } from 'types/show';

interface props {
	schedule: ISchedule;
	selectedDay: number;
	artists: IArtistV2[];
	captureRef: React.RefObject<HTMLDivElement>;
}

export default function TimeTableSnapshot({ schedule, selectedDay, artists, captureRef }: props) {
	const stages = schedule[selectedDay].stages;
	const selectedIds = useGetSelectedShow();

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

	const columnCount = stageArtists.length > 12 ? 3 : 2;

	const columns = Array.from({ length: columnCount }, (_, i) =>
		stageArtists.filter((_, index) => index % columnCount === i),
	);

	return (
		<div
			ref={captureRef}
			className="w-[100vw] h-[100vh] relative flex flex-row mb-[1em] overflow-y-hidden bg-background"
		>
			<div className="flex flex-col w-full gap-3 px-4 pb-4">
				<div
					className="grid gap-3 w-full"
					style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
				>
					{columns.map((artists, index) => (
						<div key={index} className="flex flex-col w-full">
							{artists.map((artist, index) => {
								const height = artist._end.diff(artist._start, 'minute') / 15;
								const space =
									index > 0
										? artist._start.diff(artists[index - 1]._end, 'minute') / 15
										: 0;
								return (
									<React.Fragment key={artist.id}>
										{space > 0 && (
											<div style={{ height: `${space * SCALE_UNIT}rem` }} />
										)}
										<div
											key={artist.id}
											className="flex items-stretch rounded-md border border-border bg-card text-card-foreground shadow-sm"
											style={{ height: `${height * SCALE_UNIT}rem` }}
										>
											<div className="flex flex-col items-center justify-center px-2 py-1 text-[11px] font-semibold text-secondary bg-muted min-w-[3rem]">
												<span>{artist._start.format('HH:mm')}</span>
												<span>-</span>
												<span>{artist._end.format('HH:mm')}</span>
											</div>
											<div className="flex flex-col justify-center px-3 py-2">
												<div className="text-sm font-semibold text-foreground">
													{artist.name}
												</div>
												<div className="text-xs text-muted-foreground">
													{artist.stageName}
												</div>
											</div>
										</div>
									</React.Fragment>
								);
							})}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
