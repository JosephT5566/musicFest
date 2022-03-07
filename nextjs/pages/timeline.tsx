import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';

import Container from '@mui/material/Container';
import TimeLine from 'view/payment/TimeLine';
import { STORAGE_KEY } from 'static';
import programList from 'static/program/megaport2021';

const StyledContainer = styled(Container)(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
}));

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

const DayButton = ({ day, selectedDay, onClick, ...props }) => {
	const active = day === selectedDay ? true : false;

	const handleClick = () => onClick(day);

	return (
		<StyleddayBtn className={`${active}`} onClick={handleClick}>
			{props.children}
		</StyleddayBtn>
	);
};

export interface ISelectedShows {
	stageIndex: number;
	showIndex: number;
}

export default function TimeLinePage() {
	const [selectedDay, setSelectedDay] = useState(0);

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
			<TimeLine programList={programList} selectedDay={selectedDay} />
		</StyledContainer>
	);
}
