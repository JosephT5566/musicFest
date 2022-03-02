import React from 'react';
import { makeStyles } from '@material-ui/styles';

import StageColumn from 'components/StageColumn';

const useStyle = makeStyles(() => ({
	tableOfDay: {
		display: 'flex',
		flexDirection: 'row',
	},
}));

export default function TableOfDay({ showsOfDay, day, selected }) {
	const classes = useStyle();

	return (
		<div className={classes.tableOfDay} style={{ display: day === selected ? '' : 'none' }}>
			{showsOfDay.map((stage, index) => {
				const { stage: stageName, artists } = stage;
				return <StageColumn key={stageName} stage={{ stageName, index }} shows={artists} day={day} />;
			})}
		</div>
	);
}
