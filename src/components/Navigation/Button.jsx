import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CurrentIndexContext from './Context';

const useStyle = makeStyles((theme) => ({
	button: {
		display: 'flex',
		position: 'relative',
		alignItems: 'center',
		justifyContent: 'center',
		appearance: 'none',
		backgroundColor: 'inherit',
		border: '0',
		cursor: 'pointer',
		letterSpacing: '1px',
		flexDirection: 'column',
		minWidth: '6em',

		color: theme.palette.primary.light,

		[theme.breakpoints.down('md')]: {
			flex: '0 1 0px',
			alignItems: 'flex-start',
			padding: '0.8em 0',
			marginBottom: '1em',
			'&::before': {
				content: `''`,
				position: 'absolute',
				height: '1px',
				width: '90%',
				background: theme.palette.primary.light,
				bottom: '0',
			},
		},

		'&:focus': {
			outline: '0',
		},

		'&.active': {
			color: theme.palette.primary.dark,
		},

		// add underline
		'&::after': {
			content: `''`,
			position: 'absolute',
			height: '2px',
			width: '0%',
			background: theme.palette.primary.dark,

			transition: '200ms',
			[theme.breakpoints.up('lg')]: {
				bottom: '-1em',
			},
			[theme.breakpoints.down('md')]: {
				bottom: '0',
			},
		},
		'&:hover::after': {
			width: '90%',
			background: theme.palette.primary.light,
		},
		'&.active::after': {
			width: '90%',
		},
		'&.active:hover::after': {
			background: theme.palette.primary.dark,
		},
	},
}));

export default function Button({ index, onClick = null, children }) {
	const classes = useStyle();
	const currentIndexContext = useContext(CurrentIndexContext);
	const active = index === currentIndexContext.currentIndex ? 'active' : '';
	return (
		<button
			className={`${classes.button} ${active}`}
			onClick={() => {
				currentIndexContext.onIndexChange(index);
				if (onClick) onClick();
			}}
		>
			{children}
		</button>
	);
}
