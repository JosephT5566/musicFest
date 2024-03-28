import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { SimplePaletteColorOptions } from '@mui/material/styles/createPalette';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import { palette } from 'styles/palette';
import { SCALE_UNIT } from 'constants/static';
import { IArtist, IStage } from 'types/show';
import moment, { Moment } from 'moment';

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

const StyledTimelineBtn = styled('button')({
	position: 'absolute',
	border: 'none',
	borderRadius: '0.5em',
	transition: '500ms ease-out',
	width: '1.2rem',
	zIndex: 1,
	'&:hover': {
		cursor: 'pointer',
	},
	'&:focus': {
		outline: '0',
	},
	'&.true': {
		width: '15rem',
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
	width: '15rem',
	'&.true': {
		display: 'flex',
	},
}));

const StyledbtnTitle = styled('div')({
	fontWeight: 'bold',
	fontSize: '16px',
	width: '100%',
});

type ShowItem = IArtist & {
	stageName: string;
	layer: number;
	itemColor: SimplePaletteColorOptions;
};

const TimeLineButton = (props: { megaStartTime: Moment; showInfo: ShowItem; day: number }) => {
	const { megaStartTime, showInfo, day } = props;
	const [active, setActive] = useState(false);

	const { text: textColor } = palette;
	const { name, startTime, endTime, layer, itemColor, stageName } = showInfo;
	const startMoment = moment(startTime);
	const endMoment = moment(endTime);

	const top = moment.duration(startMoment.diff(megaStartTime)).asMinutes() / 10;
	const height = moment.duration(endMoment.diff(startMoment)).asMinutes() / 10;
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
			<StyledtimelineBtnContainer
				style={{
					top: `calc(${top * SCALE_UNIT}rem + 0.5rem)`,
				}}
			>
				<StyledshowText className={`${active}`}>{name}</StyledshowText>
				<StyledTimelineBtn
					className={`${active}`}
					onClick={handleClick}
					style={{
						left: `${left + left * 1}em`,
						minHeight: `${height * SCALE_UNIT}rem`,
						height: `${height * SCALE_UNIT}rem`,
						backgroundColor: itemColor.main,
						color: active ? textColor.primary : textColor.secondary,
					}}
				>
					<StyledbtnTextContainer className={`${active}`}>
						<StyledbtnTitle>{name}</StyledbtnTitle>
						<div>{stageName}</div>
						<div>{startMoment.format('HH:mm') + ' - ' + endMoment.format('HH:mm')}</div>
					</StyledbtnTextContainer>
				</StyledTimelineBtn>
			</StyledtimelineBtnContainer>
		</ClickAwayListener>
	);
};

export default function TimeLineOfDay(props: {
	startTime: Moment;
	endTime: Moment;
	stages: IStage[];
	day: number;
	selectedDay: number;
}) {
	const { startTime, endTime, stages, day, selectedDay } = props;

	const height = moment.duration(endTime.diff(startTime)).asMinutes() / 10;
	const layerHashRef = useRef<number[]>(new Array(Math.floor(height)).fill(0));

	useEffect(() => {
		// reset layerHashRef every re-render
		layerHashRef.current = new Array(Math.floor(height)).fill(0);
	});

	const filteredStages: ShowItem[][] = stages
		.map((stage, index) =>
			stage.artists.map((artist) => ({
				stageName: stage.name,
				itemColor: palette.stage[index as keyof typeof palette.stage],
				layer: 0,
				...artist,
			}))
		)
		.filter((item) => item.length !== 0)
		.map((stages) => {
			return stages.map((item) => {
				const startMoment = moment(item.startTime);
				const endMoment = moment(item.endTime);
				const top = moment.duration(startMoment.diff(startTime)).asMinutes() / 10;
				const height = moment.duration(endMoment.diff(startMoment)).asMinutes() / 10;
				let layer = 0;

				for (let i = top; i <= top + height; i++) {
					layerHashRef.current[i] += 1;
					if (layerHashRef.current[i] > layer) {
						layer = layerHashRef.current[i];
					}
				}
				// console.log('layerHashRef.current', layerHashRef.current);

				return {
					...item,
					layer: layer - 1,
				};
			});
		});

	return (
		<StyledtableOfDay
			style={{
				display: day === selectedDay ? '' : 'none',
				height: `${height * SCALE_UNIT}rem`,
			}}
		>
			{filteredStages.map((stage) => {
				return stage.map((item) => (
					<TimeLineButton
						megaStartTime={startTime}
						key={item.id}
						showInfo={item}
						day={day}
					/>
				));
			})}
		</StyledtableOfDay>
	);
}
