import React, { useState, useEffect } from 'react';
import { useIsIDExist, useSelectShow } from 'context/ShowsProvider';

import { styled } from '@mui/material/styles';

import { palette } from 'styles/palette';
import { MEGA_START_TIME, MEGA_END_TIME, MIN, SCALE_UNIT } from 'static';
import moment, { Moment } from 'moment';
import { IArtist, IStage } from 'types/show';

const ColumnContainer = styled('div')(({ theme }) => ({
	textAlign: 'center',
	width: '7.4em',
	[theme.breakpoints.down('md')]: {
		width: '5.8em',
	},
	[theme.breakpoints.down('sm')]: {
		width: '4.8em',
	},
}));
const Styledhead = styled('div')(({ theme }) => ({
	height: theme.layout.tableHeadHeight,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	fontWeight: 'bold',
	marginBottom: theme.layout.tableHeadMarginBottom,
	letterSpacing: theme.layout.letterSpacing,
}));
const StyledshowButton = styled('button')(({ theme }) => ({
	fontFamily: theme.typography.fontFamily,
	width: '100%',
	borderRadius: '0.5em',
	border: 'none',
	letterSpacing: theme.layout.letterSpacing,
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
}));
const StyledFreeTimeScale = styled('div')(({ theme }) => ({
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
}));

const MovingTime = (props: { prevEndTime: Moment; startTime: Moment }) => {
	const { prevEndTime, startTime } = props;

	const duration = moment.duration(startTime.diff(prevEndTime)).asMinutes();
	const prevEndTimeMin = prevEndTime.minutes();
	const height = duration / 10;

	console.log(prevEndTime.format('HH:mm:ss'), startTime.format('HH:mm:ss'));

	if (duration === 0) {
		return null;
	}

	return (
		<>
			{new Array(height).fill(undefined).map((_, index) => {
				const theHour =
					(prevEndTimeMin + 10 + index * 10) % 60 === 0
						? 'theHour'
						: '';
				return (
					<StyledFreeTimeScale
						className={`${theHour}`}
						key={index}
					></StyledFreeTimeScale>
				);
			})}
		</>
	);
};

const ShowButton = (props: {
	show: IArtist;
	day: number;
	stageIndex: number;
	showIndex: number;
}) => {
	const { show, day, stageIndex, showIndex } = props;

	const [active, setActive] = useState(false);
	const handleSelectShow = useSelectShow();
	const isIDExist = useIsIDExist();
	const id = `${day}:${stageIndex}:${showIndex}`;
	const {
		stage: stageColors,
		text: textColor,
		background: bgColor,
	} = palette;

	const startTime = moment(show.start);
	const endTime = moment(show.end);
	const height = moment.duration(endTime.diff(startTime)).asMinutes() / 10;

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
		handleSelectShow(id, active);
	}, [id, active]);

	return (
		<StyledshowButton
			className={`${id}`}
			style={{
				height: `${height * SCALE_UNIT}rem`,
				backgroundColor: active
					? stageColors[stageIndex].main
					: bgColor.paper,
				color: active ? textColor.secondary : textColor.primary,
			}}
			onClick={handleClick}
		>
			{show.name}
		</StyledshowButton>
	);
};

export default function StageColumn(props: {
	stage: IStage & { stageIndex: number };
	shows: IArtist[];
	day: number;
}) {
	const { stage, shows, day } = props;

	const finalEndTime = moment(MEGA_END_TIME[day]);
	const prevEndTimes = [
		moment(MEGA_START_TIME[day]),
		...shows.map((s) => moment(s.end)),
	];
	const stageColors = palette.stage;

	if (shows) {
		return (
			<ColumnContainer>
				<Styledhead
					sx={{
						backgroundColor: `${
							stageColors[stage.stageIndex].main
						}`,
					}}
				>
					{stage.name}
				</Styledhead>
				{shows.map((show, index) => {
					const start = moment(show.start);

					return (
						<div key={index}>
							<MovingTime
								prevEndTime={prevEndTimes[index]}
								startTime={start}
							/>
							<ShowButton
								show={show}
								day={day}
								stageIndex={stage.stageIndex}
								showIndex={index}
							/>
						</div>
					);
				})}
				<MovingTime
					prevEndTime={moment(shows[shows.length - 1].end)}
					startTime={finalEndTime}
				/>
			</ColumnContainer>
		);
	}
}
