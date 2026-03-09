import React from 'react';

import StageColumn from './StageColumn';
import { IPerfDay } from 'types/show';
import { palette } from 'styles/palette';

interface props {
	perfDay: IPerfDay;
	day: number;
	selected: number;
}

export default function TableOfDay({ perfDay, day, selected }: props) {
	const { stage: stageColors } = palette;

	return (
		<div className={`${day === selected ? 'flex' : 'hidden'} flex-row`}>
			{perfDay.stages.map((stage, index) => (
				<StageColumn
					dayStartTime={new Date(perfDay.dayStartTime)}
					dayEndTime={new Date(perfDay.dayEndTime)}
					key={index}
					stageColor={stageColors[index as keyof typeof palette.stage]}
					stage={stage}
					day={day}
				/>
			))}
		</div>
	);
}