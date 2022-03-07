import React from 'react';
import { styled } from '@mui/material/styles';

const StyledButtonsContainer = styled('div')(({ theme }) => ({
	position: 'relative',
	display: 'flex',
	'&::after': {
		content: `''`,
		position: 'absolute',
		backgroundColor: theme.palette.primary.main,
		borderRadius: '1em',
		width: '1em',
		height: '4px',
		bottom: '0',
		transition: '500ms',
	},
	'&.day0::after': {
		left: '0%',
	},
	'&.day1::after': {
		left: '50%',
	},
}));

const StyledDayBtn = styled('button')(({ theme }) => ({
	fontFamily: theme.typography.fontFamily,
	position: 'relative',
	border: 'none',
	fontSize: '1em',
	backgroundColor: theme.palette.background.default,
	borderRadius: '0.6em',
	padding: '0.5em 0',
	marginRight: '1.5em',
	'&:hover': {
		cursor: 'pointer',
		color: theme.palette.primary.main,
	},
	'&:focus': {
		outline: '0',
	},
	'&.true': {
		color: theme.palette.primary.main,
	},
}));

interface Props {
	days: string[];
	selectedDay: number;
	onClick: (day: number) => void;
}

export default function DaySelector({ days, selectedDay, onClick }: Props) {
	return (
		<StyledButtonsContainer className={`${'day' + selectedDay}`}>
			{days.map((day, index) => (
				<StyledDayBtn
					value={index}
					className={`${index === selectedDay}`}
					onClick={(e) => {
						// console.log(Number((e.target as HTMLButtonElement).value));
						onClick(Number((e.target as HTMLButtonElement).value));
					}}
				>
					{day}
				</StyledDayBtn>
			))}
		</StyledButtonsContainer>
	);
}
