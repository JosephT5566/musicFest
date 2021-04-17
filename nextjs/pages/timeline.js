import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ShowsContext from '../src/context/ShowsContext';

import Container from '@material-ui/core/Container';
import AdjustIcon from '@material-ui/icons/Adjust';
import TimeLineOfDay from '../src/components/TimeLineOfDay';
import TimeBackdrop from '../src/components/TimeBackdrop';
import { MEGA_START_TIME, SCALE_UNIT } from '../src/static';
import { STORAGE_KEY } from '../src/static';

const useStyle = makeStyles((theme) => ({
	timeLinePage: {
		backgroundColor: theme.palette.background.default,
	},
	timeline: {
		position: 'relative',
		display: 'flex',
		marginBottom: '1em',
	},
	dayBtnContainer: {
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
	},
	dayBtn: {
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
	},
	timeBackdrop: { marginTop: `${0.5 * SCALE_UNIT}rem` },
	baseLine: {
		width: '3.8em',
		marginRight: '1em',
	},
	scale: {
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
	},
	scaleWithTime: {
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
	},
}));

const DayButton = ({ day, selectedDay, onClick, ...props }) => {
	const classes = useStyle();
	const active = day === selectedDay ? true : false;

	const handleClick = () => onClick(day);

	return (
		<button className={`${classes.dayBtn} ${active}`} onClick={handleClick}>
			{props.children}
		</button>
	);
};

const BaseLine = () => {
	const classes = useStyle();
	const start = new Date(MEGA_START_TIME[0]);

	let scale = [];
	for (let i = 0; i < 63; i++) {
		const time = new Date(start.getTime() + 10 * i * 60000);
		const hh = time.getHours();
		const mm = time.getMinutes();
		if (mm === 0) {
			scale.push(
				<div key={i} className={classes.scaleWithTime} style={{ height: `${SCALE_UNIT}rem` }}>
					<div className="text">{hh}:00</div>
					<AdjustIcon className="icon" />
				</div>
			);
		} else {
			scale.push(<div key={i} className={classes.scale} style={{ height: `${SCALE_UNIT}rem` }}></div>);
		}
	}
	return <div className={classes.baseLine}>{scale}</div>;
};

export default function TimeLine() {
	const classes = useStyle();
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
		<Container className={classes.timeLinePage}>
			<div className={`${classes.dayBtnContainer} ${'day' + selectedDay}`}>
				<DayButton day={0} selectedDay={selectedDay} onClick={handleClick}>
					3/27
				</DayButton>
				<DayButton day={1} selectedDay={selectedDay} onClick={handleClick}>
					3/28
				</DayButton>
			</div>
			<div className={classes.timeline}>
				<TimeBackdrop className={classes.timeBackdrop} />
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
			</div>
		</Container>
	);
}
