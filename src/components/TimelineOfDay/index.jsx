import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { shows } from '../../data/shows.json';
import { theme } from '../../styles/theme';
import { MEGA_START_TIME, MEGA_END_TIME, MIN, SCALE_UNIT } from '../../utils/static';

const useStyle = makeStyles(() => ({
	tableOfDay: {
		width: `calc(100vw - 1em - 3.8em)`,
		display: 'flex',
		position: 'relative',
		flexDirection: 'column',
	},
	timeLineBtn: {
		position: 'absolute',
		border: 'none',
		borderRadius: '0.5em',
		transition: '500ms',
		width: '1em',
		'&:hover': {
			cursor: 'pointer',
		},
		'&:focus': {
			outline: '0',
		},
		'&.true': {
			width: 'fit-content',
		},
	},
	btnText: {
		width: 'fit-content',
	},
}));

const TimeLineButton = ({ index, showInfo, day, stageIndex, checkBias }) => {
	const classes = useStyle();
	const [active, setActive] = useState(false);

	const { stage: stageColors, text: textColor, bg: bgColor } = theme.common.palette;
	const { name, start, end } = showInfo;
	const megaStartTime = new Date(MEGA_START_TIME[day]);
	const startTime = new Date(start);
	const endTime = new Date(end);

	const top = (startTime.getTime() - megaStartTime.getTime()) / MIN / 10;
	const height = (endTime.getTime() - startTime.getTime()) / MIN / 10;
	const left = checkBias(startTime.getTime(), endTime.getTime(), index);

	const handleClick = () => {
		setActive((prev) => !prev);
	};

	useEffect(() => {
		// console.log(index);
		console.log(name, checkBias(startTime.getTime(), endTime.getTime(), index));
	}, []);

	return (
		<button
			className={`${classes.timeLineBtn} ${active}`}
			onClick={handleClick}
			style={{
				top: `calc(${top * SCALE_UNIT}rem + 0.5rem)`,
				left: `${left + left * 1}em`,
				height: `${height * SCALE_UNIT}rem`,
				backgroundColor: stageColors[stageIndex].main,
				color: active ? textColor.light : textColor.dark,
			}}
		>
			<div className={classes.btnText}>{name}</div>
		</button>
	);
};

export default function TimeLineOfDay({ selectedShowsOfDay, day, selected }) {
	const classes = useStyle();

	const megaStartTime = new Date(MEGA_START_TIME[day]);
	const megaEndTime = new Date(MEGA_END_TIME[day]);
	const height = (megaEndTime.getTime() - megaStartTime.getTime()) / MIN / 10;

	const checkOverlapNumber = (startTime, endTime, currIndex) => {
		let num = 0;
		for (let i = 0; i < currIndex; i++) {
			const stageIndex = selectedShowsOfDay[i].stageIndex;
			const showIndex = selectedShowsOfDay[i].showIndex;
			const { start, end } = shows[day].stages[stageIndex].artists[showIndex];
			const st = new Date(start).getTime();
			const et = new Date(end).getTime();

			if ((startTime >= st && startTime <= et) || (endTime >= st && endTime <= et)) {
				num++;
			}
		}
		return num;
	};

	useEffect(() => {
		console.log(selectedShowsOfDay);
	}, []);

	return (
		<div
			className={classes.tableOfDay}
			style={{ display: day === selected ? '' : 'none', height: `${height * SCALE_UNIT}rem` }}
		>
			{selectedShowsOfDay.map((show, index) => {
				const showInfo = shows[day].stages[show.stageIndex].artists[show.showIndex];

				return (
					<TimeLineButton
						key={index}
						index={index}
						showInfo={showInfo}
						day={day}
						stageIndex={show.stageIndex}
						checkBias={checkOverlapNumber}
					/>
				);
			})}
		</div>
	);
}
