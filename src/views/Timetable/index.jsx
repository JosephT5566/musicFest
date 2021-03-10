import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TimeScale from '../../components/TimeScale';
import StageColumn from '../../components/StageColumn';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { stages } from '../../data/shows.json';

const useStyle = makeStyles((theme) => ({
	timeTableContainer: {
		position: 'relative',
		width: 'fit-content',
	},
	select: {},
	timeTable: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'row',
		margin: '1em 0',
	},
}));

export default function TimeTable() {
	const classes = useStyle();
	const [day, setDay] = useState('day1');

	const handleChange = (event) => {
		setDay(event.target.value);
	};

	return (
		<div className={classes.timeTableContainer}>
			<Select value={day} onChange={handleChange} className={classes.select}>
				<MenuItem value={'day1'}>day1</MenuItem>
				<MenuItem value={'day2'}>day2</MenuItem>
			</Select>
			<div className={classes.timeTable}>
				<TimeScale />
				{stages.map((stage) => (
					<StageColumn key={stage.name} stage={stage.name} shows={stage[day]} day={day} />
				))}
			</div>
		</div>
	);
}
