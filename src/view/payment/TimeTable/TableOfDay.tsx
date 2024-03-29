import React from 'react';
import { styled } from '@mui/material/styles';
import moment from 'moment';

import StageColumn from 'view/payment/TimeTable/StageColumn';
import { IPerfDay } from 'types/show';
import { palette } from 'styles/palette';

const TableOfDayContainer = styled('div')({
	display: 'flex',
	flexDirection: 'row',
});

interface props {
	perfDay: IPerfDay;
	day: number;
	selected: number;
}

export default function TableOfDay({ perfDay, day, selected }: props) {
	const { stage: stageColors } = palette;

	return (
		<TableOfDayContainer sx={{ display: day === selected ? '' : 'none' }}>
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
		</TableOfDayContainer>
	);
}
