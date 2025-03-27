import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { SimplePaletteColorOptions } from '@mui/material/styles/createPalette';
import { palette } from 'styles/palette';
import { SCALE_UNIT } from 'constants/static';
import { IArtist, IStage } from 'types/show';
import moment, { Moment } from 'moment';

import { useSelectShow } from 'providers/ShowsProvider';
import { generateGoogleCalendarLink, toUTCFormat } from 'utils/googleUtils';

const TimelineContainer = styled(Box)(({ theme }) => ({
	width: `calc(100vw - 1em - 3.8em)`,
	display: 'flex',
	position: 'relative',
	flexDirection: 'column',
}));

const TimelineBtnContainer = styled(Box)({
	position: 'absolute',
	display: 'flex',
	flexDirection: 'row',
	width: '100%',
});

const TimelineBtn = styled(Button)(({ theme }) => ({
	position: 'absolute',
	border: 'none',
	borderRadius: theme.shape.borderRadius,
	padding: theme.spacing(1),
	zIndex: 1,
	textTransform: 'none',
	'&:hover': {
		cursor: 'pointer',
		filter: 'brightness(0.95)',
	},
}));

const BtnContent = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: theme.spacing(0.5),
	color: theme.palette.text.primary,
}));

interface ShowItem extends IArtist {
	stageName: string;
	layer: number;
	itemColor: SimplePaletteColorOptions;
	overlappingCount: number;
}

interface TimeLineButtonProps {
	megaStartTime: Moment;
	showInfo: ShowItem;
	id: string;
}

const DrawerPuller = styled(Box)(({ theme }) => ({
	width: 30,
	height: 6,
	backgroundColor: theme.palette.secondary.main,
	borderRadius: 3,
	position: 'absolute',
	top: 8,
	left: '50%',
	transform: 'translateX(-50%)',
}));

const TimeLineButton: React.FC<TimeLineButtonProps> = ({ megaStartTime, showInfo, id }) => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const { name, startTime, endTime, itemColor, stageName, layer, overlappingCount } = showInfo;
	const startMoment = moment(startTime);
	const endMoment = moment(endTime);
	const selectShow = useSelectShow();

	const top = moment.duration(startMoment.diff(megaStartTime)).asMinutes() / 10;
	const height = moment.duration(endMoment.diff(startMoment)).asMinutes() / 10;

	// Calculate width based on overlapping events
	const width = 100 / overlappingCount;
	// The left position is now based on the layer number (0, 1, 2, etc.)
	const leftPosition = layer * width;

	const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
		if (
			event &&
			event.type === 'keydown' &&
			((event as React.KeyboardEvent).key === 'Tab' ||
				(event as React.KeyboardEvent).key === 'Shift')
		) {
			return;
		}
		setDrawerOpen(open);
	};

	return (
		<>
			<TimelineBtnContainer
				className="timeline-button-wrapper"
				sx={{
					top: `calc(${top * SCALE_UNIT}rem + 0.5rem)`,
				}}
			>
				<TimelineBtn
					className={`timeline-button timeline-button-${name
						.toLowerCase()
						.replace(/\s+/g, '-')}`}
					onClick={toggleDrawer(true)}
					sx={{
						left: `${leftPosition}%`,
						width: `${width}%`,
						minHeight: `${height * SCALE_UNIT}rem`,
						height: `${height * SCALE_UNIT}rem`,
						backgroundColor: itemColor.main,
					}}
				>
					<BtnContent className="timeline-button-content">
						<Typography
							variant="body1"
							color="text.secondary"
							className="timeline-button-title"
						>
							{name}
						</Typography>
						<Typography variant="body2" className="timeline-button-stage-name">
							{stageName}
						</Typography>
						{/* <Typography
                            variant="body2"
                            className="timeline-button-time"
                        >
                            {startMoment.format('HH:mm') + ' - ' + endMoment.format('HH:mm')}
                        </Typography>
                        <Typography
                            variant="body2"
                            className="debug-info"
                        >
                            {`Layer: ${layer}, Total: ${overlappingCount}`}
                        </Typography> */}
					</BtnContent>
				</TimelineBtn>
			</TimelineBtnContainer>
			<SwipeableDrawer
				anchor="bottom"
				open={drawerOpen}
				onClose={toggleDrawer(false)}
				onOpen={toggleDrawer(true)}
				PaperProps={{
					sx: {
						borderTopLeftRadius: 16,
						borderTopRightRadius: 16,
						backgroundColor: (theme) => theme.palette.background.default,
					},
				}}
			>
				<Box
					sx={{
						padding: 2,
						minHeight: '30vh',
						borderTopLeftRadius: 16,
						borderTopRightRadius: 16,
						position: 'relative',
						paddingTop: 4, // Add more padding at top to accommodate the puller
					}}
				>
					<DrawerPuller />
					<Typography variant="h6" gutterBottom textAlign="center">
						{name}
					</Typography>
					<Typography variant="body1">
						{startMoment.format('YYYY/M/D(ddd) HH:mm')} - {endMoment.format('HH:mm')}
					</Typography>
					<Typography variant="subtitle1" gutterBottom fontWeight="bold">
						{stageName}
					</Typography>
					<Box
						sx={{
							position: 'absolute',
							bottom: 32,
							left: 16,
						}}
						display="flex"
                        flexDirection="column"
                        gap="8px"
					>
						<Button
							variant="contained"
							onClick={() => {
								const formattedStartTime = toUTCFormat(startTime);
								const formattedEndTime = toUTCFormat(endTime);

								const calendarLink = generateGoogleCalendarLink({
									title: `${stageName} - ${name}`,
									startDateTime: formattedStartTime,
									endDateTime: formattedEndTime,
									details: stageName,
									location: '',
								});
								window.open(calendarLink, '_blank');
							}}
							color="success"
						>
							新增到 Google 日曆
						</Button>
						<Button
							variant="outlined"
							onClick={() => {
								selectShow(id);
							}}
							color="error"
						>
							移除選擇
						</Button>
					</Box>
				</Box>
			</SwipeableDrawer>
		</>
	);
};

interface TimeLineOfDayV2Props {
	startTime: Moment;
	endTime: Moment;
	stages: IStage[];
	day: number;
	selectedDay: number;
}

export default function TimeLineOfDayV2(props: TimeLineOfDayV2Props) {
	const { startTime, endTime, stages, day, selectedDay } = props;
	const height = moment.duration(endTime.diff(startTime)).asMinutes() / 10;

	// Initialize stages with basic info
	const processedStages: ShowItem[][] = stages
		.map((stage, index) =>
			stage.artists.map((artist) => ({
				stageName: stage.name,
				itemColor: palette.stage[index as keyof typeof palette.stage],
				layer: 0,
				overlappingCount: 1,
				...artist,
			}))
		)
		.filter((items) => items.length > 0);

	// Flatten all artists into a single array
	const allArtists = processedStages.flat();

	// Function to check if two time ranges overlap
	const isOverlapping = (event1: ShowItem, event2: ShowItem) => {
		const start1 = moment(event1.startTime);
		const end1 = moment(event1.endTime);
		const start2 = moment(event2.startTime);
		const end2 = moment(event2.endTime);
		return start1 < end2 && start2 < end1;
	};

	// Find overlapping groups
	const overlappingGroups: ShowItem[][] = [];
	const processedIds = new Set<string>();

	allArtists.forEach((artist) => {
		if (processedIds.has(artist.id)) {
			return;
		}

		const overlappingGroup = [artist];
		processedIds.add(artist.id);

		// Find all artists that overlap with the current group
		allArtists.forEach((otherArtist) => {
			if (artist.id === otherArtist.id) {
				return;
			}

			// Check if the other artist overlaps with any artist in the current group
			const hasOverlap = overlappingGroup.some((groupArtist) =>
				isOverlapping(groupArtist, otherArtist)
			);

			if (hasOverlap && !overlappingGroup.some((a) => a.id === otherArtist.id)) {
				overlappingGroup.push(otherArtist);
			}
		});

		if (overlappingGroup.length > 0) {
			// Sort by start time within group
			overlappingGroup.sort((a, b) => moment(a.startTime).diff(moment(b.startTime)));

			// Assign layers and overlapping count
			overlappingGroup.forEach((artist, index) => {
				artist.layer = index;
				artist.overlappingCount = overlappingGroup.length;
			});

			overlappingGroups.push(overlappingGroup);
		}
	});

	return (
		<TimelineContainer
			className={`timeline-container timeline-day-${day}`}
			sx={{
				display: day === selectedDay ? 'flex' : 'none',
				height: `${height * SCALE_UNIT}rem`,
			}}
		>
			{allArtists.map((item) => (
				<TimeLineButton
					megaStartTime={startTime}
					key={item.id}
					showInfo={item}
					id={item.id}
				/>
			))}
		</TimelineContainer>
	);
}
