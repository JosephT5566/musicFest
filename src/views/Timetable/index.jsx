import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TimeScale from '../../components/TimeScale';
import StageColumn from '../../components/StageColumn';

import { stages } from '../../data/shows.json';

const useStyle = makeStyles((theme) => ({
	timeTable: {
		display: 'flex',
		flexDirection: 'row',
		padding: '1em 0',
	},
}));

export default function TimeTable() {
	const classes = useStyle();
	const [day, setDay] = useState('day1');
	return (
		<div className={classes.timeTable}>
			<TimeScale />
			<StageColumn stage={stages[0].name} shows={stages[0][day]} />
			<StageColumn stage={stages[1].name} shows={stages[1][day]} />
		</div>
	);
}
