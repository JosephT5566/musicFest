import React from 'react';
import { useGetSelectedShow, useSelectShow } from 'providers/ShowsProvider';
import { SimplePaletteColorOptions } from '@mui/material/styles/createPalette';

import { styled } from '@mui/material/styles';

import { palette } from 'styles/palette';
import { SCALE_UNIT } from 'constants/static';
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
	// console.log(startTime.format('YYYY-MM-DD HH:mm:ss'))

	const height = moment.duration(startTime.diff(prevEndTime)).asMinutes() / 10;
	const prevEndTimeMin = prevEndTime.minutes();

	if (height <= 0) {
		return null;
	}

	return (
		<>
			{new Array(height).fill(undefined).map((_, index) => {
				const theHour = (prevEndTimeMin + 10 + index * 10) % 60 === 0 ? 'theHour' : '';
				return (
					<StyledFreeTimeScale className={`${theHour}`} key={index}></StyledFreeTimeScale>
				);
			})}
		</>
	);
};

const ShowButton = (props: {
	show: IArtist;
	buttonColor: SimplePaletteColorOptions;
	active: boolean;
	onClick: () => void;
}) => {
	const { show, buttonColor, active, onClick } = props;

	const { text: textColor, background: bgColor } = palette;

	const startTime = moment(show.startTime);
	const endTime = moment(show.endTime);
	const height = moment.duration(endTime.diff(startTime)).asMinutes() / 10;

	return (
		<StyledshowButton
			style={{
				height: `${height * SCALE_UNIT}rem`,
				backgroundColor: active ? buttonColor.main : bgColor.paper,
				color: active ? textColor.secondary : textColor.primary,
			}}
			onClick={onClick}
		>
			{show.name}
		</StyledshowButton>
	);
};

export default function StageColumn(props: {
	dayStartTime: Moment;
	dayEndTime: Moment;
	stage: IStage;
	stageColor: SimplePaletteColorOptions;
	day: number;
}) {
	const { dayStartTime, dayEndTime, stage, stageColor, day } = props;
	const { artists } = stage;
	const selectedIds = useGetSelectedShow();
	const selectShow = useSelectShow();

	const finalEndTime = dayEndTime;
	const prevEndTimes = [dayStartTime, ...artists.map((s) => moment(s.endTime))];

	const handleClickButton = (id: string) => {
		selectShow(id);
	};

	// console.log(prevEndTimes.map((t) => t.format('MM/DD HH:mm:ss')));

	return (
		<ColumnContainer>
			<Styledhead
				sx={{
					backgroundColor: `${stageColor.main}`,
				}}
			>
				{stage.name}
			</Styledhead>
			{artists.map((artist, index) => {
				const start = moment(artist.startTime);

				return (
					<div key={index}>
						<MovingTime prevEndTime={prevEndTimes[index]} startTime={start} />
						<ShowButton
							show={artist}
							buttonColor={stageColor}
							active={selectedIds.includes(artist.id)}
							onClick={() => {
								handleClickButton(artist.id);
							}}
						/>
					</div>
				);
			})}
			<MovingTime
				prevEndTime={moment(artists[artists.length - 1].endTime)}
				startTime={finalEndTime}
			/>
		</ColumnContainer>
	);
}
