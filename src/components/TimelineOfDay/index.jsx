import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
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

const TimeLineButton = ({ showInfo, day }) => {
	const classes = useStyle();
	const [active, setActive] = useState(false);

	const { stage: stageColors, text: textColor } = theme.common.palette;
	const { name, startTime, endTime, layer, stageIndex } = showInfo;
	const megaStartTime = new Date(MEGA_START_TIME[day]);

	const top = (startTime.getTime() - megaStartTime.getTime()) / MIN / 10;
	const height = (endTime.getTime() - startTime.getTime()) / MIN / 10;
	const left = layer;

	const handleClick = () => {
		setActive((prev) => !prev);
	};

	const handleClickAway = () => {
		if (active) {
			setActive(false);
		}
	};

	return (
		<ClickAwayListener onClickAway={handleClickAway}>
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
				<div className={`${classes.btnText} ${active}`}>{name}</div>
			</button>
		</ClickAwayListener>
	);
};

export default function TimeLineOfDay({ selectedShowsOfDay, day, selected }) {
	const classes = useStyle();
	const [, rerender] = useState(null);
	const itemsRef = useRef([]);

	const megaStartTime = new Date(MEGA_START_TIME[day]);
	const megaEndTime = new Date(MEGA_END_TIME[day]);
	const height = (megaEndTime.getTime() - megaStartTime.getTime()) / MIN / 10;

	useEffect(() => {
		const checkLayer = (currentItem, currentLayer) => {
			if (itemsRef.current.length === 0) {
				return currentLayer;
			}

			itemsRef.current.forEach((item) => {
				if (item.layer !== currentLayer) {
					// no matter if layer is different
					return;
				}
				if (
					(currentItem.startTime.getTime() >= item.startTime.getTime() &&
						currentItem.startTime.getTime() <= item.endTime.getTime()) ||
					(currentItem.endTime.getTime() >= item.startTime.getTime() &&
						currentItem.endTime.getTime() <= item.endTime.getTime())
				) {
					currentLayer = checkLayer(currentItem, currentLayer + 1);
				}
			});
			return currentLayer;
		};

		const setItemsInfo = () => {
			selectedShowsOfDay.forEach((show) => {
				const showInfo = shows[day].stages[show.stageIndex].artists[show.showIndex];
				const { name, start, end } = showInfo;
				const startTime = new Date(start);
				const endTime = new Date(end);
				const stageIndex = show.stageIndex;
				const currentItem = { name, startTime, endTime, stageIndex };
				let layer = checkLayer(currentItem, 0);

				itemsRef.current.push({ ...currentItem, layer });
			});
		};

		setItemsInfo();
		rerender({});
	}, [day, selectedShowsOfDay]);

	return (
		<div
			className={classes.tableOfDay}
			style={{ display: day === selected ? '' : 'none', height: `${height * SCALE_UNIT}rem` }}
		>
			{itemsRef.current.map((item, index) => {
				return <TimeLineButton key={index} showInfo={item} day={day} />;
			})}
		</div>
	);
}
