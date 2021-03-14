import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { shows } from '../../data/shows.json';
import { MEGA_START_TIME, MEGA_END_TIME, MIN, SCALE_UNIT } from '../../utils/static';

const useStyle = makeStyles(() => ({
	tableOfDay: {
		display: 'flex',
		position: 'relative',
		flexDirection: 'column',
	},
	timeLineItem: {
		position: 'absolute',
	},
}));

export default function TimeLineOfDay({ selectedShowsOfDay, day, selected }) {
	const classes = useStyle();
	const megaStartTime = new Date(MEGA_START_TIME[day]);
	const megaEndTime = new Date(MEGA_END_TIME[day]);
	const height = (megaEndTime.getTime() - megaStartTime.getTime()) / MIN / 10;

	return (
		<div
			className={classes.tableOfDay}
			style={{ display: day === selected ? '' : 'none', height: `${height * SCALE_UNIT}rem` }}
		>
			{selectedShowsOfDay.map((show, index) => {
				const { name, start, end } = shows[day].stages[show.stageIndex].artists[show.showIndex];
				const startTime = new Date(start);
				const endTime = new Date(end);

				const top = (startTime.getTime() - megaStartTime.getTime()) / MIN / 10;
				console.log(endTime.getTime());

				return (
					<div key={index} className={classes.timeLineItem} style={{ top: `${top * SCALE_UNIT}rem` }}>
						{name}
					</div>
				);
			})}
		</div>
	);
}
