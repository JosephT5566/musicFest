import React from 'react';
import { styled } from '@mui/material/styles';
import moment from 'moment';

import TimeScale from './TimeScale';
import TableOfDay from './TableOfDay';

import { IProgramList } from 'types/show';

const TimeTableContainer = styled('div')({
	width: '100%',
	position: 'relative',
	display: 'flex',
	flexDirection: 'row',
	marginBottom: '1em',
	overflowY: 'hidden',
});

interface props {
	programList: IProgramList;
	selectedDay: number;
}

export default function TimeTable({ programList, selectedDay }: props) {
	const startTime = moment(programList.perfDays[selectedDay].dayStartTime);
	const endTime = moment(programList.perfDays[selectedDay].dayEndTime);

	return (
		<TimeTableContainer>
			<TimeScale startTime={startTime} endTime={endTime} />
			{programList.perfDays.map((perfDay, index) => {
				return (
					<TableOfDay key={index} perfDay={perfDay} day={index} selected={selectedDay} />
				);
			})}
		</TimeTableContainer>
	);
}
