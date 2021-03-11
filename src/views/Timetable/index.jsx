import React, { useState, useContext } from 'react';
import { useNavigation } from 'react-navi';
import { makeStyles } from '@material-ui/core/styles';
import ShowsContext from '../../contexts/ShowsContext';

import TimeScale from '../../components/TimeScale';
import TableOfDay from '../../components/TableOfDay';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
		right: '1em',
	},
}));

const SaveButton = () => {
	const { saveItemsForHashUrl } = useContext(ShowsContext);
	const navigation = useNavigation();

	const url = navigation.getCurrentValue().url;
	const hash = saveItemsForHashUrl();

	const handleClick = () => {
		navigation.navigate(`${url.pathname}#${hash}`);
	};

	return <button onClick={handleClick}>Save</button>;
};

const LoadButton = () => {
	const {} = useContext(ShowsContext);
	return <button>Load</button>;
};

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
				<LoadButton />
			</div>
		</div>
	);
}
