import React from 'react';
import { styled } from '@mui/material/styles';
import moment from 'moment';

import AdjustIcon from '@mui/icons-material/Adjust';
import TimeBackdrop from './TimeBackdrop';
import TimeLineOfDay from './TimelineOfDay';

import { useGetSelectedShow } from 'providers/ShowsProvider';
import { SCALE_UNIT } from 'constants/static';
import { IProgramList } from 'types/show';

const Styledtimeline = styled('div')({
	position: 'relative',
	display: 'flex',
	marginBottom: '1em',
});

const BaseLineContainer = styled('div')({
	width: '3.8em',
	marginRight: '1em',
});

const Styledscale = styled('div')(({ theme }) => ({
	position: 'relative',
	width: '3.7em',
	borderRight: `solid 2px ${theme.palette.secondary.main}`,
	'&::after': {
		content: `''`,
		position: 'absolute',
		top: '50%',
		right: '0',
		transform: 'translate(60%, 0)',
		height: '1px',
		width: '0.5em',
		backgroundColor: theme.palette.secondary.main,
	},
}));

const StyledscaleWithTime = styled('div')(({ theme }) => ({
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	width: '3.7em',
	'& .text': {
		color: theme.palette.secondary.main,
		paddingRight: '0.5em',
		[theme.breakpoints.down('xs')]: {
			fontSize: '14px',
		},
	},
	'& .icon': {
		position: 'absolute',
		right: '0',
		transform: 'translate(54%, 0)',
	},
}));

interface Props {
	programList: IProgramList;
	selectedDay: number;
}

const BaseLine = (props: { programList: IProgramList }) => {
	const { programList } = props;

	return (
		<BaseLineContainer>
			{new Array(63).fill(undefined).map((_, index) => {
				const time = moment(programList.perfDays[0].dayStartTime).add(10 * index, 'm');
				const mm = time.minute();
				return mm === 0 ? (
					<StyledscaleWithTime key={index} style={{ height: `${SCALE_UNIT}rem` }}>
						<div className="text">{time.format('HH:mm')}</div>
						<AdjustIcon className="icon" />
					</StyledscaleWithTime>
				) : (
					<Styledscale key={index} style={{ height: `${SCALE_UNIT}rem` }}></Styledscale>
				);
			})}
		</BaseLineContainer>
	);
};

export default function TimeLine({ programList, selectedDay }: Props) {
	const selectedIds = useGetSelectedShow();

	const filtedPerfDays = programList.perfDays.map((prefDay) => {
		return {
			...prefDay,
			stages: prefDay.stages.map((stage) => {
				return {
					...stage,
					artists: stage.artists.filter((artist) => selectedIds.includes(artist.id)),
				};
			}),
		};
	});

	return (
		<Styledtimeline>
			<TimeBackdrop selectedDay={selectedDay} />
			<BaseLine programList={programList} />
			{filtedPerfDays.map((perfDay, index) => {
				return (
					<TimeLineOfDay
						key={index}
						stages={perfDay.stages}
						day={index}
						selectedDay={selectedDay}
					/>
				);
			})}
		</Styledtimeline>
	);
}
