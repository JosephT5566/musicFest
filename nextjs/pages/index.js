import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ShowsContext from '../src/context/ShowsContext';

import TimeScale from '../src/components/TimeScale';
import TableOfDay from '../src/components/TableOfDay';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import ReplayIcon from '@material-ui/icons/Replay';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { shows } from '../src/assets/data/shows.json';
// import { STORAGE_KEY } from '../src/utils/static';

const useStyle = makeStyles((theme) => ({
	timeTableContainer: {
		position: 'relative',
		width: 'fit-content',
	},
	dayBtnContainer: {
		position: 'sticky',
		display: 'flex',
		width: 'fit-content',
		left: '50%',
		transform: 'translateX(-50%)',
		margin: '0.5em 0 1em',
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
	},
	dayBtn: {
		fontFamily: theme.fontFamily,
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
	},
	timeTable: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'row',
		marginBottom: '1em',
	},
	btnContainer: {
		display: 'flex',
		flexDirection: 'column',
		position: 'fixed',
		right: '2em',
		bottom: '4em',
		[theme.breakpoints.up('sm')]: {
			flexDirection: 'row',
			bottom: '2em',
		},
	},
	saveBtn: {
		backgroundColor: theme.palette.secondary.main,
		color: theme.palette.primary.main,
		boxShadow: '-5px 5px 10px',
		'&:focus': {
			backgroundColor: theme.palette.secondary.main,
		},
		[theme.breakpoints.up('sm')]: {
			margin: '0.2em',
		},
	},
	alertBar: {
		fontFamily: theme.fontFamily,
	},
}));

// const SaveButton = ({ onOpenSnack }) => {
// 	const { getData } = useContext(ShowsContext);
// 	const classes = useStyle();
// 	const navigation = useNavigation();

// 	const url = navigation.getCurrentValue().url;

// 	const handleClick = async () => {
// 		const data = btoa(getData());
// 		console.log(url);
// 		try {
// 			await navigator.clipboard.writeText(`${window.location.host}${url.pathname}#${data}`); // copy to clipboard
// 			if (data !== '' || url.hash.substring(1) !== '') {
// 				navigation.navigate(`${url.pathname}#${data}`);
// 				localStorage.setItem(STORAGE_KEY.defaultHash, data);
// 			}
// 			onOpenSnack();
// 		} catch (error) {
// 			console.error('Could not copy text: ', error);
// 		}
// 	};

// 	return (
// 		<IconButton className={classes.saveBtn} aria-label="share" onClick={handleClick}>
// 			<ShareIcon />
// 		</IconButton>
// 	);
// };

// const ResetButton = () => {
// 	const { resetData } = useContext(ShowsContext);
// 	const classes = useStyle();
// 	const navigation = useNavigation();

// 	const handleClick = () => {
// 		resetData();
// 		localStorage.removeItem(STORAGE_KEY.shows);

// 		window.history.pushState(null, '', `${navigation.getCurrentValue().url.pathname}`);
// 		window.location.reload();
// 		localStorage.removeItem(STORAGE_KEY.defaultHash);
// 	};

// 	return (
// 		<IconButton className={classes.saveBtn} aria-label="reset" onClick={handleClick}>
// 			<ReplayIcon />
// 		</IconButton>
// 	);
// };

const DayButton = ({ day, selectedDay, onClick, ...props }) => {
	const classes = useStyle();
	const active = day === selectedDay ? true : false;

	const handleClick = () => onClick(day);

	return (
		<button className={`${classes.dayBtn} ${active}`} onClick={handleClick}>
			{props.children}
		</button>
	);
};

export default function Home() {
	const classes = useStyle();
	const [openSnack, setOpenSnack] = useState(false);
	// const [selectedDay, setSelectedDay] = useState(Number(localStorage.getItem(STORAGE_KEY.day)));
	const [selectedDay, setSelectedDay] = useState(1);

	const handleClick = (value) => {
		setSelectedDay(value);
		localStorage.setItem(STORAGE_KEY.day, value);
	};

	const handleOpenSnack = () => setOpenSnack(true);

	const handleCloseSnack = () => setOpenSnack(false);

	return (
		<Container className={classes.timeTableContainer}>
			<div className={`${classes.dayBtnContainer} ${'day' + selectedDay}`}>
				<DayButton day={0} selectedDay={selectedDay} onClick={handleClick}>
					3/27
				</DayButton>
				<DayButton day={1} selectedDay={selectedDay} onClick={handleClick}>
					3/28
				</DayButton>
			</div>
			<div className={classes.timeTable}>
				<TimeScale />
				{shows.map((showsOfDay, index) => {
					return <TableOfDay key={index} showsOfDay={showsOfDay.stages} day={index} selected={selectedDay} />;
				})}
			</div>
			<div className={classes.btnContainer}>
				{/* <SaveButton onOpenSnack={handleOpenSnack} /> */}
				{/* <ResetButton /> */}
			</div>
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				open={openSnack}
				autoHideDuration={1500}
				onClose={handleCloseSnack}
			>
				<MuiAlert className={classes.alertBar} variant="filled" severity="success">
					已複製網址，可加到書籤儲存。
				</MuiAlert>
			</Snackbar>
		</Container>
	);
}
