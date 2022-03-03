import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import { shows } from 'assets/data/shows.json';
import { palette } from 'styles/palette';
import { MEGA_START_TIME, MEGA_END_TIME, MIN, SCALE_UNIT } from 'static';
import { ISelectedShows } from '../../../pages/timeline';

const StyledtableOfDay = styled('div')({
	width: `calc(100vw - 1em - 3.8em)`,
	display: 'flex',
	position: 'relative',
	flexDirection: 'column',
});

const StyledtimelineBtnContainer = styled('div')({
	position: 'absolute',
	display: 'flex',
	flexDirection: 'row',
	width: '100%',
});

const StyledtimelineBtn = styled('button')({
	position: 'absolute',
	border: 'none',
	borderRadius: '0.5em',
	transition: '500ms ease-out',
	width: '1.2em',
	zIndex: 1,
	'&:hover': {
		cursor: 'pointer',
	},
	'&:focus': {
		outline: '0',
	},
	'&.true': {
		width: '20em',
		zIndex: 10,
	},
});

const StyledshowText = styled('div')(({ theme }) => ({
	marginLeft: '40%',
	transition: '500ms',
	display: 'flex',
	flexDirection: 'column',
	padding: '0 0.5em',
	backgroundColor: theme.palette.background.default,
	zIndex: 0,
	'&.true': {
		marginLeft: '0',
		opacity: 0,
	},
	'&::after': {
		content: `''`,
		marginTop: '0.3em',
		height: '3px',
		width: '80%',
		backgroundColor: theme.palette.primary.main,
	},
	[theme.breakpoints.down('sm')]: {
		fontSize: '12px',
	},
}));

const StyledbtnTextContainer = styled('div')(({ theme }) => ({
	color: theme.palette.text.primary,
	display: 'none',
	position: 'absolute',
	top: '0.5em',
	left: '0.5em',
	flexDirection: 'column',
	alignItems: 'flex-start',
	width: '19em',
	'&.true': {
		display: 'flex',
	},
}));

const StyledbtnTitle = styled('div')({
	fontWeight: 'bold',
	fontSize: '16px',
	width: '100%',
});

const TimeLineButton = ({ showInfo, day }) => {
	const [active, setActive] = useState(false);

	const { stage: stageColors, text: textColor } = palette;
	const { name, startTime, endTime, layer, stageIndex } = showInfo;
	const megaStartTime = new Date(MEGA_START_TIME[day]);

	const top = (startTime.getTime() - megaStartTime.getTime()) / MIN / 10;
	const height = (endTime.getTime() - startTime.getTime()) / MIN / 10;
	const left = layer;
	const startTimeString = `${startTime.getHours()}:${
		startTime.getMinutes() === 0 ? '00' : startTime.getMinutes()
	}`;
	const endTimeString = `${endTime.getHours()}:${
		endTime.getMinutes() === 0 ? '00' : endTime.getMinutes()
	}`;

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
			<StyledtimelineBtnContainer
				style={{
					top: `calc(${top * SCALE_UNIT}rem + 0.5rem)`,
				}}
			>
				<StyledshowText className={`${active}`}>{name}</StyledshowText>
				<StyledtimelineBtn
					className={`${active}`}
					onClick={handleClick}
					style={{
						left: `${left + left * 1}em`,
						minHeight: `${height * SCALE_UNIT}rem`,
						height: `${height * SCALE_UNIT}rem`,
						backgroundColor: stageColors[stageIndex].main,
						color: active ? textColor.primary : textColor.secondary,
					}}
				>
					<StyledbtnTextContainer className={`${active}`}>
						<StyledbtnTitle>{name}</StyledbtnTitle>
						<div>{shows[day].stages[stageIndex].name}</div>
						<div>{startTimeString + ' - ' + endTimeString}</div>
					</StyledbtnTextContainer>
				</StyledtimelineBtn>
			</StyledtimelineBtnContainer>
		</ClickAwayListener>
	);
};

export default function TimeLineOfDay(props: {
	selectedShowsOfDay: ISelectedShows[];
	day: number;
	selected: number;
}) {
	const { selectedShowsOfDay, day, selected } = props;
	const [, rerender] = useState(null);
	const itemsRef = useRef([]);

	const megaStartTime = new Date(MEGA_START_TIME[day]);
	const megaEndTime = new Date(MEGA_END_TIME[day]);
	const height = (megaEndTime.getTime() - megaStartTime.getTime()) / MIN / 10;

	useEffect(() => {
		console.log('length', selectedShowsOfDay)
		if (selectedShowsOfDay.length === 0) {
			console.log('length is 0', selectedShowsOfDay.length)
			return;
		}

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
						currentItem.startTime.getTime() < item.endTime.getTime()) ||
					(currentItem.endTime.getTime() > item.startTime.getTime() &&
						currentItem.endTime.getTime() <= item.endTime.getTime())
				) {
					currentLayer = checkLayer(currentItem, currentLayer + 1);
				}
			});
			return currentLayer;
		};

		const setItemsInfo = () => {
			selectedShowsOfDay.forEach((show) => {
				console.log(show.stageIndex);
				// console.log(shows[day].stages[show.stageIndex])
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

		if (itemsRef.current.length > 0) {
			// avoid add itemRef repeatedly
			return;
		}
		setItemsInfo();
		rerender({});
	}, [day, selectedShowsOfDay]);

	return (
		<StyledtableOfDay
			style={{
				display: day === selected ? '' : 'none',
				height: `${height * SCALE_UNIT}rem`,
			}}
		>
			{itemsRef.current.map((item, index) => {
				return <TimeLineButton key={index} showInfo={item} day={day} />;
			})}
		</StyledtableOfDay>
	);
}
