import React, { useState, useContext, useEffect } from 'react';
import ShowsContext from 'context/ShowsContext';

import { makeStyles } from '@material-ui/core/styles';

import { palette } from 'styles/palette';
import { MEGA_START_TIME, MEGA_END_TIME, MIN, SCALE_UNIT } from 'static';

const useStyle = makeStyles((theme) => ({
	column: {
		textAlign: 'center',
		width: '7.4em',
		[theme.breakpoints.down('md')]: {
			width: '5.8em',
		},
		[theme.breakpoints.down('sm')]: {
			width: '4.8em',
		},
	},
	head: {
		height: theme.typography.tableHeadHeight,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		fontWeight: 'bold',
		marginBottom: theme.typography.tableHeadMarginBottom,
		letterSpacing: theme.typography.letterSpacing,
	},
	showButton: {
		fontFamily: theme.typography.fontFamily,
		width: '100%',
		borderRadius: '0.5em',
		border: 'none',
		letterSpacing: theme.typography.letterSpacing,
		'&:hover': {
			cursor: 'pointer',
		},
		'&:focus': {
			outline: '0',
		},
		[theme.breakpoints.down('md')]: {
			letterSpacing: '0',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '12px',
		},
	},
	freeTimeScale: {
		position: 'relative',
		height: `${SCALE_UNIT}rem`,
		'&::after': {
			content: `''`,
			position: 'absolute',
			background: theme.palette.background.paper,
			height: '1px',
			width: '90%',
			bottom: '-0.5px',
			left: '50%',
			transform: 'translate(-50%, 0)',
		},
		'&.theHour::after': {
			background: theme.palette.secondary.main,
		},
	},
}));

const MovingTime = ({ prevEndTime, startTime }) => {
	const classes = useStyle();
	const time = startTime.getTime() - prevEndTime.getTime();
	const prevEndTimeMin = prevEndTime.getMinutes();
	const height = time / MIN / 10;

	if (time === 0) return null;
	let scale = [];
	for (let i = 0; i < height; i++) {
		const theHour = (prevEndTimeMin + 10 + i * 10) % 60 === 0 ? 'theHour' : '';
		scale.push(<div className={`${classes.freeTimeScale} ${theHour}`} key={i}></div>);
	}
	return scale;
};

const ShowButton = ({ show, day, stageIndex, showIndex }) => {
	const classes = useStyle();
	const [active, setActive] = useState(false);
	const { handleSelectShow, isIDExist } = useContext(ShowsContext);
	const id = `${day}:${stageIndex}:${showIndex}`;
	const { stage: stageColors, text: textColor, background: bgColor } = palette;

	const startTime = new Date(show.start);
	const endTime = new Date(show.end);
	const height = (endTime.getTime() - startTime.getTime()) / MIN / 10;

	const handleClick = () => {
		setActive((prev) => !prev);
	};

	// chack active first
	useEffect(() => {
		if (!isIDExist) return;
		
		const isActive = isIDExist(id);
		setActive(isActive);
	}, [isIDExist, id]);
	
	useEffect(() => {
		if (!handleSelectShow) return;

		handleSelectShow(id, active);
	}, [handleSelectShow, id, active]);

	return (
		<button
			className={`${classes.showButton} ${id}`}
			style={{
				height: `${height * SCALE_UNIT}rem`,
				backgroundColor: active ? stageColors[stageIndex].main : bgColor.paper,
				color: active ? textColor.secondary : textColor.primary,
			}}
			onClick={handleClick}
		>
			{show.name}
		</button>
	);
};

export default function StageColumn({ stage, shows, day }) {
	const classes = useStyle();
	let prevEndTime = new Date(MEGA_START_TIME[day]);
	let finalEndTime = new Date(MEGA_END_TIME[day]);
	let prevShowTime = 0; // moving time + performance time
	const stageColors = palette.stage;

	if (shows) {
		return (
			<div className={classes.column}>
				<div className={classes.head} style={{ backgroundColor: `${stageColors[stage.index].main}` }}>
					{stage.stageName}
				</div>
				{shows.map((show, index) => {
					const start = new Date(show.start);
					const end = new Date(show.end);
					if (index !== 0) {
						prevEndTime = new Date(prevEndTime.getTime() + prevShowTime);
					}
					prevShowTime = end.getTime() - prevEndTime.getTime();

					return (
						<div key={index}>
							<MovingTime prevEndTime={prevEndTime} startTime={start} />
							<ShowButton show={show} day={day} stageIndex={stage.index} showIndex={index} />
						</div>
					);
				})}
				<MovingTime prevEndTime={new Date(prevEndTime.getTime() + prevShowTime)} startTime={finalEndTime} />
			</div>
		);
	}
}
