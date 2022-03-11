import React from 'react';

import { styled } from '@mui/material/styles';

import moment, { Moment } from 'moment';
import { SCALE_UNIT } from 'constants/static';

const TimeScaleContainer = styled('div')(({ theme }) => ({
	paddingTop: `calc(${theme.layout.tableHeadHeight} + ${theme.layout.tableHeadMarginBottom})`,
	paddingRight: '0.5em',
	zIndex: 10,
	position: 'sticky',
	left: '0',
}));

const Styledscale = styled('div')(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	position: 'relative',
	height: `${SCALE_UNIT}rem`,
	minWidth: '35px',
	'&::after': {
		content: `''`,
		position: 'absolute',
		background: theme.palette.primary.main,
		height: '1px',
		width: '30%',
		top: '-0.5px',
		right: '-0.5em',
	},
}));

const Styledtext = styled('div')({
	backgroundColor: 'transparent',
	fontSize: '8px',
	position: 'absolute',
	top: '0',
	left: '0',
	transform: 'translate(0, -50%)',
});

interface Props {
	startTime: Moment;
	endTime: Moment;
}

export default function TimeScale({ startTime, endTime }: Props) {
	const scales = moment.duration(endTime.diff(startTime)).asMinutes() / 10;

	return (
		<TimeScaleContainer>
			{new Array(scales).fill(undefined).map((_, index) => {
				const time = moment(startTime).add(10 * index, 'm');

				return (
					<Styledscale key={index}>
						<Styledtext>{time.format('HH:mm')}</Styledtext>
					</Styledscale>
				);
			})}
		</TimeScaleContainer>
	);
}
