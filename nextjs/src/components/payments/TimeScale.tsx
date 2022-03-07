import React from 'react';

import { styled } from '@mui/material/styles';

import moment from 'moment';
import { SCALE_UNIT } from 'static';
import programList from 'static/program/megaport2021';

const TimeScaleContainer = styled('div')(({ theme }) => ({
	paddingTop: `calc(${theme.layout.tableHeadHeight} + ${theme.layout.tableHeadMarginBottom})`,
	paddingRight: '0.5em',
	zIndex: 10,
	position: 'sticky',
	left: '-1em',
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

export default function TimeScale() {
	return (
		<TimeScaleContainer>
			{new Array(62).fill(undefined).map((_, index) => {
				const time = moment(programList.perfDays[0].dayStartTime).add(10 * index, 'm');

				return (
					<Styledscale key={index}>
						<Styledtext>{time.format('HH:mm')}</Styledtext>
					</Styledscale>
				);
			})}
		</TimeScaleContainer>
	);
}
