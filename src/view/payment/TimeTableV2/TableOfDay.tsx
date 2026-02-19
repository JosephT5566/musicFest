import React from 'react';
import moment from 'moment';

import StageColumn from './StageColumn';

import { IPerfDayV2, IArtistV2 } from 'types/show';

import { palette } from 'styles/palette';

interface props {
	perfDay: IPerfDayV2;
	day: number;
	selected: number;
	artists: IArtistV2[];
}

export default function TableOfDay({ perfDay, day, selected, artists }: props) {
	const { stage: stageColors } = palette;

	return (
		<div className={`${day === selected ? 'flex' : 'hidden'} flex-row`}>
			{perfDay.stages.map((stage, index) => (
				<StageColumn
					dayStartTime={moment(perfDay.dayStartTime)}
					dayEndTime={moment(perfDay.dayEndTime)}
					key={index}
					stageColor={stageColors[index as keyof typeof palette.stage]}
					stage={stage}
					day={day}
					artists={artists}
				/>
			))}
		</div>
	);
}
