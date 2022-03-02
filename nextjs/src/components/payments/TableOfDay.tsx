import React from 'react';
import { styled } from '@mui/material/styles';

import StageColumn from 'components/payments/StageColumn';

const StyledtableOfDay = styled('div')({
	display: 'flex',
	flexDirection: 'row',
});

export default function TableOfDay({ showsOfDay, day, selected }) {
	return (
		<StyledtableOfDay sx={{ display: day === selected ? '' : 'none' }}>
			{showsOfDay.map((stage, index) => {
				const { stage: stageName, artists } = stage;
				return <StageColumn key={stageName} stage={{ stageName, index }} shows={artists} day={day} />;
			})}
		</StyledtableOfDay>
	);
}
