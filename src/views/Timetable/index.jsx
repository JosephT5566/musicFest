import React, { useState, useContext } from 'react';
import { useNavigation } from 'react-navi';
import { makeStyles } from '@material-ui/core/styles';
import ShowsContext from '../../contexts/ShowsContext';

import TimeScale from '../../components/TimeScale';
import TableOfDay from '../../components/TableOfDay';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import ReplayIcon from '@material-ui/icons/Replay';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { shows } from '../../data/shows.json';
import { APP_NAME, STORAGE_KEY } from '../../utils/static';

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
		backgroundColor: theme.palette.bg.main,
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
		bottom: '1em',
		right: '2em',
	},
	saveBtn: {
		backgroundColor: theme.palette.secondary.main,
		color: theme.palette.primary.main,
		boxShadow: '-5px 5px 10px',
		'&:focus': {
			backgroundColor: theme.palette.secondary.main,
		},
	},
	alertBar: {
		fontFamily: theme.fontFamily,
	},
}));

const SaveButton = ({ onOpenSnack }) => {
	const { getData } = useContext(ShowsContext);
	const classes = useStyle();
	const navigation = useNavigation();

	const url = navigation.getCurrentValue().url;

	const handleClick = () => {
		const data = btoa(getData());
		if (data !== '' || url.hash !== '') {
			navigation.navigate(`${url.pathname}#${data}`);
			onOpenSnack();
		}
	};

	return (
		<IconButton className={classes.saveBtn} onClick={handleClick}>
			<ShareIcon />
		</IconButton>
	);
};

const ResetButton = () => {
	const { resetData } = useContext(ShowsContext);
	const classes = useStyle();
	const navigation = useNavigation();

	const handleClick = () => {
		resetData();
		localStorage.removeItem(STORAGE_KEY);

		navigation.navigate(`${APP_NAME}/`);
		window.location.reload();
	};

	return (
		<IconButton className={classes.saveBtn} onClick={handleClick}>
			<ReplayIcon />
		</IconButton>
	);
};

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

export default function TimeTable() {
	const classes = useStyle();
	const [openSnack, setOpenSnack] = useState(false);
	const [selectedDay, setSelectedDay] = useState(0);

	const handleClick = (value) => {
		setSelectedDay(value);
	};

	const handleOpenSnack = () => setOpenSnack(true);

	const handleCloseSnack = () => setOpenSnack(false);

	return (
		<div className={classes.timeTableContainer}>
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
				<SaveButton onOpenSnack={handleOpenSnack} />
				<ResetButton />
			</div>
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				open={openSnack}
				autoHideDuration={3000}
				onClose={handleCloseSnack}
			>
				<MuiAlert className={classes.alertBar} variant="filled" severity="success">
					已儲存至網址，可直接加到書籤，或是分享網址。
				</MuiAlert>
			</Snackbar>
		</div>
	);
}
