import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ShowsContext from '../../contexts/ShowsContext';

import AdjustIcon from '@material-ui/icons/Adjust';
import TimeLineOfDay from '../../components/TimelineOfDay';
import { MEGA_START_TIME, SCALE_UNIT } from '../../utils/static';

const useStyle = makeStyles((theme) => ({
	timeLineContainer: {},
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
		fontFamily: theme.fontFamily,
		position: 'relative',
		border: 'none',
		fontSize: '1em',
		backgroundColor: theme.palette.bg.main,
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
	baseLine: {
		width: '3.8em',
		paddingRight: '1em',
	},
	scale: {
		position: 'relative',
		borderRight: `solid 2px ${theme.palette.secondary.main}`,
		'&::after': {
			content: `''`,
			position: 'absolute',
			top: '50%',
			right: '0',
			transform: 'translate(50%, 0)',
			height: '1px',
			width: '1em',
			backgroundColor: theme.palette.secondary.main,
		},
	},
	scaleWithTime: {
		display: 'flex',
		alignItems: 'center',
	},
	text: {
		color: theme.palette.secondary.main,
		paddingRight: '0.5em',
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
					<div className={classes.text}>{hh}:00</div>
					<AdjustIcon />
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
	const [selectedDay, setSelectedDay] = useState(0);
	const [selectedShows, setSelectedShows] = useState([]);
	const { getData } = useContext(ShowsContext);

	const handleClick = (value) => {
		setSelectedDay(value);
	};

	const splitDataByDay = (data) => {
		const arr = data.split(',');
		let orderedData = [];
		arr.forEach((element) => {
			const info = element.split(':');
			const day = info[0];
			const stageIndex = info[1];
			const showIndex = info[2];

			if (!orderedData[day]) {
				orderedData.push({ shows: [] });
			}

			orderedData[day].shows.push({ stageIndex, showIndex });
		});
		return orderedData;
	};

	useEffect(() => {
		const data = getData()
		if (data){
			setSelectedShows(splitDataByDay(getData()));
		}
	}, [getData]);

	return (
		<div className={classes.timeLineContainer}>
			<div className={`${classes.dayBtnContainer} ${'day' + selectedDay}`}>
				<DayButton day={0} selectedDay={selectedDay} onClick={handleClick}>
					3/27
				</DayButton>
				<DayButton day={1} selectedDay={selectedDay} onClick={handleClick}>
					3/28
				</DayButton>
			</div>
			<div className={classes.timeline}>
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
		</div>
	);
}
