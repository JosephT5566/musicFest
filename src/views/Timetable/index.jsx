import React, { useState, useContext } from 'react';
import { useNavigation } from 'react-navi';
import { makeStyles } from '@material-ui/core/styles';
import ShowsContext from '../../contexts/ShowsContext';

import TimeScale from '../../components/TimeScale';
import TableOfDay from '../../components/TableOfDay';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

import { shows } from '../../data/shows.json';

const useStyle = makeStyles((theme) => ({
	timeTableContainer: {
		position: 'relative',
		width: 'fit-content',
	},
	select: {
		position: 'sticky',
		left: '50%',
		transform: 'translateX(-50%)',
		marginBottom: '1em',
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
}));

const SaveButton = () => {
	const { getEncodeData } = useContext(ShowsContext);
	const classes = useStyle();
	const navigation = useNavigation();

	const url = navigation.getCurrentValue().url;

	const handleClick = () => {
		const hash = getEncodeData();
		if (hash !== '') {
			navigation.navigate(`${url.pathname}#${hash}`);
		}
	};

	return (
		<IconButton className={classes.saveBtn} onClick={handleClick}>
			<SaveAltIcon />
		</IconButton>
	);
};

// const LoadButton = () => {
// 	const {} = useContext(ShowsContext);
// 	return <button>Load</button>;
// };

export default function TimeTable() {
	const classes = useStyle();
	const [selectedDay, setSelectedDay] = useState(0);

	const handleChange = (event) => {
		setSelectedDay(event.target.value);
	};

	return (
		<div className={classes.timeTableContainer}>
			<Select value={selectedDay} onChange={handleChange} className={classes.select}>
				<MenuItem value={0}>day1</MenuItem>
				<MenuItem value={1}>day2</MenuItem>
			</Select>
			<div className={classes.timeTable}>
				<TimeScale />
				{shows.map((showsOfDay, index) => {
					return <TableOfDay key={index} showsOfDay={showsOfDay.day} day={index} selected={selectedDay} />;
				})}
			</div>
			<div className={classes.btnContainer}>
				<SaveButton />
			</div>
		</div>
	);
}
