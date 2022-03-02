import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
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
		fontWeight: 'bold',

		color: theme.palette.background.default,

		[theme.breakpoints.down('sm')]: {
			flex: '0 1 0px',
			alignItems: 'flex-start',
			padding: '0.8em 0',
			marginBottom: '1em',
			'&::before': {
				content: `''`,
				position: 'absolute',
				height: '1px',
				width: '90%',
				background: theme.palette.background.default,
				bottom: '0',
			},
		},

		'&:focus': {
			outline: '0',
		},

		'&.active': {
			color: theme.palette.primary.main,
		},

		// add underline
		'&::after': {
			content: `''`,
			position: 'absolute',
			height: '2px',
			width: '0%',
			background: theme.palette.primary.main,

			transition: '200ms',
			[theme.breakpoints.up('md')]: {
				bottom: '-1em',
			},
			[theme.breakpoints.down('sm')]: {
				bottom: '0',
			},
		},
		'&:hover::after': {
			width: '90%',
			background: theme.palette.primary.main,
		},
		'&.active::after': {
			width: '90%',
		},
		'&.active:hover::after': {
			background: theme.palette.primary.main,
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
