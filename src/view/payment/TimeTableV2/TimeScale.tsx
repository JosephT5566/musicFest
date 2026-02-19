import React from 'react';
import moment, { Moment } from 'moment';

import { SCALE_UNIT } from 'constants/static';

interface Props {
	startTime: Moment;
	endTime: Moment;
}

export default function TimeScale({ startTime, endTime }: Props) {
	const scales = moment.duration(endTime.diff(startTime)).asMinutes() / 10;

	return (
		<div className="pt-20 pr-[0.5em] z-10 sticky left-0">
			{new Array(scales).fill(undefined).map((_, index) => {
				const time = moment(startTime).add(10 * index, 'm');

				return (
					<div
						key={index}
						style={{ height: `${SCALE_UNIT}rem` }}
						className="bg-background relative min-w-[35px] after:content-[''] after:absolute after:bg-primary after:h-[1px] after:w-[30%] after:-top-[0.5px] after:-right-[0.5em]"
					>
						<div className="bg-transparent text-[8px] absolute top-0 left-0 -translate-y-1/2">
							{time.format('HH:mm')}
						</div>
					</div>
				);
			})}
		</div>
	);
}