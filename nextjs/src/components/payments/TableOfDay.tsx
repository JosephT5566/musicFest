import React from 'react';
import { styled } from '@mui/material/styles';

import StageColumn from 'components/payments/StageColumn';
import { IStage } from 'types/show';

const TableOfDayContainer = styled('div')({
	display: 'flex',
	flexDirection: 'row',
});

interface props {
	stages: IStage[];
	day: number;
	selected: number;
}

export default function TableOfDay({ stages, day, selected }: props) {
	return (
		<TableOfDayContainer sx={{ display: day === selected ? '' : 'none' }}>
			{stages.map((stage, index) => {
				const { name: stageName, artists } = stage;
				return (
					<StageColumn
						key={stageName}
						stage={{ ...stage, stageIndex: index }}
						shows={artists}
						day={day}
					/>
				);
			})}
		</TableOfDayContainer>
	);
}
