import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import moment from 'moment';

import { useGetSelectedShow } from 'providers/ShowsProvider';

import Container from '@mui/material/Container';
import AdjustIcon from '@mui/icons-material/Adjust';
import TimeLineOfDay from 'components/payments/TimelineOfDay';
import TimeBackdrop from 'components/payments/TimeBackdrop';
import { SCALE_UNIT } from 'static';
import { STORAGE_KEY } from 'static';
import programList from 'static/program/megaport2021';

const StyledContainer = styled(Container)(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
}));

const Styledtimeline = styled('div')({
	position: 'relative',
	display: 'flex',
	marginBottom: '1em',
});

const StyleddayBtnContainer = styled('div')(({ theme }) => ({
	position: 'sticky',
	display: 'flex',
	width: 'fit-content',
	left: '50%',
	transform: 'translateX(-50%)',
	margin: '0.5em 0 1em',
	'&::after': {
		content: `''`,
		position: 'absolute',
		backgroundColor: theme.palette.primary.main,
		borderRadius: '1em',
		width: '1em',
		height: '4px',
		bottom: '0',
		transition: '500ms',
	},
	'&.day0::after': {
		left: '0%',
	},
	'&.day1::after': {
		left: '50%',
	},
}));

const StyleddayBtn = styled('button')(({ theme }) => ({
	fontFamily: theme.typography.fontFamily,
	position: 'relative',
	border: 'none',
	fontSize: '1em',
	backgroundColor: theme.palette.background.default,
	borderRadius: '0.6em',
	padding: '0.5em 0',
	marginRight: '1.5em',
	'&:hover': {
		cursor: 'pointer',
		color: theme.palette.primary.main,
	},
	'&:focus': {
		outline: '0',
	},
	'&.true': {
		color: theme.palette.primary.main,
	},
}));

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

const DayButton = ({ day, selectedDay, onClick, ...props }) => {
	const active = day === selectedDay ? true : false;

	const handleClick = () => onClick(day);

	return (
		<StyleddayBtn className={`${active}`} onClick={handleClick}>
			{props.children}
		</StyleddayBtn>
	);
};

const BaseLine = () => {
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

export interface ISelectedShows {
	stageIndex: number;
	showIndex: number;
}

export default function TimeLine() {
	const [selectedDay, setSelectedDay] = useState(0);
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

	const handleClick = (value: number) => {
		setSelectedDay(value);
		localStorage.setItem(STORAGE_KEY.day, value.toString());
	};

	useEffect(() => {
		// GApageView(window.location.hostname + window.location.pathname);

		setSelectedDay(Number(localStorage.getItem(STORAGE_KEY.day)));
	}, []);

	return (
		<StyledContainer>
			<StyleddayBtnContainer className={`${'day' + selectedDay}`}>
				<DayButton day={0} selectedDay={selectedDay} onClick={handleClick}>
					3/27
				</DayButton>
				<DayButton day={1} selectedDay={selectedDay} onClick={handleClick}>
					3/28
				</DayButton>
			</StyleddayBtnContainer>
			<Styledtimeline>
				<TimeBackdrop selectedDay={selectedDay} />
				<BaseLine />
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
		</StyledContainer>
	);
}
