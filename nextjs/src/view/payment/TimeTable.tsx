import React from 'react';
import { styled } from '@mui/material/styles';

import TimeScale from 'components/payments/TimeScale';
import TableOfDay from 'components/payments/TableOfDay';

import { IFest } from 'types/show';

const TimeTableContainer = styled('div')({
	position: 'relative',
	display: 'flex',
	flexDirection: 'row',
	marginBottom: '1em',
	overflowX: 'scroll',
	overflowY: 'hidden',
});

interface props {
	festival: IFest;
	selectedDay: number;
}

export default function TimeTable({ festival, selectedDay }: props) {
	return (
		<TimeTableContainer>
			<TimeScale />
			{festival.perfDays.map((perfDay, index) => {
				return <TableOfDay key={index} stages={perfDay.stages} day={index} selected={selectedDay} />;
			})}
		</TimeTableContainer>
	);
}
