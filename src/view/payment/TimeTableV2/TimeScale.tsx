import React from 'react';
import { differenceInMinutes, addMinutes, format } from 'date-fns';

import { SCALE_UNIT } from 'constants/static';

interface Props {
	startTime: Date;
	endTime: Date;
}

export default function TimeScale({ startTime, endTime }: Props) {
	const scales = differenceInMinutes(endTime, startTime) / 10;

	return (
		<div className="pt-20 pr-[0.5em] z-10 sticky left-0">
			{Array.from({ length: Math.ceil(scales) }, (_, index) => {
				const time = addMinutes(startTime, 10 * index);

				return (
					<div
						key={index}
						style={{ height: `${SCALE_UNIT}rem` }}
						className="bg-background relative min-w-[35px] after:content-[''] after:absolute after:bg-primary after:h-[1px] after:w-[30%] after:-top-[0.5px] after:-right-[0.5em]"
					>
						<div className="bg-transparent text-[8px] absolute top-0 left-0 -translate-y-1/2">
							{format(time, 'HH:mm')}
						</div>
					</div>
				);
			})}
		</div>
	);
}