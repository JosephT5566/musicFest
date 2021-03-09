import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { MEGA_START_TIME, MIN } from '../../utils/static';

const useStyle = makeStyles((theme) => ({
	column: {
		textAlign: 'center',
		maxWidth: '7em',
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
	return <div style={{ height: `${height}rem` }}>Moving...</div>;
};

const ShowButton = ({ name, startTime, endTime }) => {
	const classes = useStyle();
	const height = (endTime.getTime() - startTime.getTime()) / MIN / 10;
	return (
		<button className={classes.showButton} style={{ height: `${height}rem` }}>
			{name}
		</button>
	);
};

export default function StageColumn({ stage, shows }) {
	const classes = useStyle();
	let prevEndTime = new Date(MEGA_START_TIME);
	let prevShowTime = 0; // moving time + performance time

	if (shows) {
		return (
			<div className={classes.column}>
				<div className={classes.head}>{stage}</div>
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
							<ShowButton name={show.name} startTime={start} endTime={end} />
						</div>
					);
				})}
			</div>
		);
	}
}
