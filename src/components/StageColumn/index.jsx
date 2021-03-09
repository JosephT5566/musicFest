import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const min = 60000; // 60 sec * 1000 milliseconds

const useStyle = makeStyles((theme) => ({
	column: {
		textAlign: 'center',
		maxWidth: '7em',
	},
	head: {
		height: theme.tableHeadHeight,
	},
	showButton: {
		width: '100%',
	},
}));

export default function StageColumn({stage, shows}) {
	const classes = useStyle();
	if (shows) {
		return (
			<div className={classes.column}>
				<div className={classes.head}>{stage}</div>
				{shows.map((show, index) => {
					const start = new Date(show.start);
					const end = new Date(show.end);
					const height = (end.getTime() - start.getTime()) / min / 10;
					return (
						<div key={index}>
							<button className={classes.showButton} style={{ height: `${height}rem` }}>
								{show.name}
							</button>
						</div>
					);
				})}
			</div>
		);
	}
}
