import React from 'react';
import StageColumn from '../StageColumn';

export default function TableOfDay({ showsOfDay, day }) {
	return (
		<>
			{showsOfDay.map((stage, index) => {
				const { stage: stageName, artists } = stage;
				return <StageColumn key={stageName} stage={{ stageName, index }} shows={artists} day={day} />;
			})}
		</>
	);
}
