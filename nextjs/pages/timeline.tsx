import React, { useState, useContext, useEffect } from 'react';
import { styled } from '@mui/material/styles';

import ShowsContext from 'context/ShowsContext';

import Container from '@mui/material/Container';
import AdjustIcon from '@mui/icons-material/Adjust';
import TimeLineOfDay from 'components/payments/TimelineOfDay';
import TimeBackdrop from 'components/payments/TimeBackdrop';
import { MEGA_START_TIME, SCALE_UNIT } from 'static';
import { STORAGE_KEY } from 'static';

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

const StyledtimeBackdrop = styled(TimeBackdrop)(({ theme }) => ({
	marginTop: `${0.5 * SCALE_UNIT}rem`,
}));

const StyledbaseLine = styled('div')({
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
	const start = new Date(MEGA_START_TIME[0]);

	let scale = [];
	for (let i = 0; i < 63; i++) {
		const time = new Date(start.getTime() + 10 * i * 60000);
		const hh = time.getHours();
		const mm = time.getMinutes();
		if (mm === 0) {
			scale.push(
				<StyledscaleWithTime key={i} style={{ height: `${SCALE_UNIT}rem` }}>
					<div className="text">{hh}:00</div>
					<AdjustIcon className="icon" />
				</StyledscaleWithTime>
			);
		} else {
			scale.push(<Styledscale key={i} style={{ height: `${SCALE_UNIT}rem` }}></Styledscale>);
		}
	}
	return <StyledbaseLine>{scale}</StyledbaseLine>;
};

export default function TimeLine() {
	const [selectedDay, setSelectedDay] = useState('');
	const [selectedShows, setSelectedShows] = useState([]);
	const { getData } = useContext(ShowsContext);

	const handleClick = (value) => {
		setSelectedDay(value);
		localStorage.setItem(STORAGE_KEY.day, value);
	};

	useEffect(() => {
		// GApageView(window.location.hostname + window.location.pathname);
		setSelectedDay(localStorage.getItem(STORAGE_KEY.day));
	}, []);

	const splitDataByDay = (data) => {
		const arr = data.split(',');
		let orderedData = [];
		arr.forEach((element) => {
			const info = element.split(':');
			const day = info[0];
			const stageIndex = info[1];
			const showIndex = info[2];

			while (!orderedData[day]) {
				orderedData.push({ shows: [] });
			}

			orderedData[day].shows.push({ stageIndex, showIndex });
		});
		return orderedData;
	};

	useEffect(() => {
		const data = getData();
		if (data) {
			setSelectedShows(splitDataByDay(getData()));
		}
	}, [getData]);

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
				<StyledtimeBackdrop />
				<BaseLine />
				{selectedShows.map((selectedShowsOfDay, index) => {
					return (
						<TimeLineOfDay
							key={index}
							selectedShowsOfDay={selectedShowsOfDay.shows}
							day={index}
							selected={selectedDay}
						/>
					);
				})}
			</Styledtimeline>
		</StyledContainer>
	);
}
