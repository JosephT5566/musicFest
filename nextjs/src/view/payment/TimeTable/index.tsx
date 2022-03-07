import React from 'react';
import { styled } from '@mui/material/styles';

import TimeScale from './TimeScale';
import TableOfDay from './TableOfDay';

import { IProgramList } from 'types/show';

const TimeTableContainer = styled('div')({
	width: '100%',
	position: 'relative',
	display: 'flex',
	flexDirection: 'row',
	marginBottom: '1em',
	overflowX: 'scroll',
	overflowY: 'hidden',
});

interface props {
	festival: IProgramList;
	selectedDay: number;
}

export default function TimeTable({ festival, selectedDay }: props) {
	return (
		<TimeTableContainer>
			<TimeScale />
			{festival.perfDays.map((perfDay, index) => {
				return (
					<TableOfDay key={index} perfDay={perfDay} day={index} selected={selectedDay} />
				);
			})}
		</TimeTableContainer>
	);
}
