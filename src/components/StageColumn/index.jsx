import React, { useState } from 'react';
// import ShowsContext from '../../contexts/ShowsContext';

import { makeStyles } from '@material-ui/core/styles';

import { MEGA_START_TIME, MIN } from '../../utils/static';

const useStyle = makeStyles((theme) => ({
	column: {
		textAlign: 'center',
		maxWidth: '8em',
		minWidth: '6em',
	},
	head: {
		height: theme.tableHeadHeight,
	},
	showButton: {
		width: '100%',
	},
}));

const MovingTime = ({ prevEndTime, startTime }) => {
	const time = startTime.getTime() - prevEndTime.getTime();
	const height = time / MIN / 10;

	if (time === 0) return null;
	return <div style={{ height: `${height}rem` }}></div>;
};

const ShowButton = ({ show, day, stage, showIndex }) => {
	const classes = useStyle();
	const [active, setActive] = useState(false);
	// const { handleSelectShow } = useContext(ShowsContext);
	const id = `${day}:${stage}:${showIndex}`;

	const startTime = new Date(show.start);
	const endTime = new Date(show.end);
	const height = (endTime.getTime() - startTime.getTime()) / MIN / 10;

	const handleClick = () => {
		setActive((prev) => !prev);
	};

	return (
		<button
			className={`${classes.showButton} ${id} ${active}`}
			style={{ height: `${height}rem`, backgroundColor: active ? 'gray' : 'white' }}
			onClick={handleClick}
		>
			{show.name}
		</button>
	);
};

export default function StageColumn({ stage, shows, day }) {
	const classes = useStyle();
	let prevEndTime = new Date(MEGA_START_TIME[day]);
	let prevShowTime = 0; // moving time + performance time

	if (shows) {
		return (
			<div className={classes.column}>
				<div className={classes.head}>{stage.name}</div>
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
							<ShowButton show={show} day={day} stage={stage.index} showIndex={index} />
						</div>
					);
				})}
			</div>
		);
	}
}
