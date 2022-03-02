import React from 'react';

import { styled } from '@mui/material/styles';

import { MEGA_START_TIME, SCALE_UNIT } from 'static';

const StyledtimeScale = styled('div')(({ theme }) => ({
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

const Styledtext = styled('div')(({ theme }) => ({
	backgroundColor: 'transparent',
	fontSize: '8px',
	position: 'absolute',
	top: '0',
	left: '0',
	transform: 'translate(0, -50%)',
}));

export default function TimeScale() {
	const start = new Date(MEGA_START_TIME[0]);

	let scale = [];
	for (let i = 0; i < 62; i++) {
		const time = new Date(start.getTime() + 10 * i * 60000);
		const hh = time.getHours();
		const mm = time.getMinutes() === 0 ? '00' : time.getMinutes();
		scale.push(
			<Styledscale key={i}>
				<Styledtext>
					{hh}:{mm}
				</Styledtext>
			</Styledscale>
		);
	}
	return <StyledtimeScale>{scale}</StyledtimeScale>;
}
