import React from 'react';
import moment from 'moment';

import StageColumn from 'view/payment/TimeTable/StageColumn';
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
					dayStartTime={moment(perfDay.dayStartTime)}
					dayEndTime={moment(perfDay.dayEndTime)}
					key={index}
					stageColor={stageColors[index as keyof typeof palette.stage]}
					stage={stage}
					day={day}
				/>
			))}
		</div>
	);
}