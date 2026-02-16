import React from 'react';
import { Button } from '@/components/ui/button';

interface Props {
	days: string[];
	selectedDay: number;
	onClick: (day: number) => void;
}

export default function DaySelector({ days, selectedDay, onClick }: Props) {
	return (
		<div
			className={`relative flex ${'day' + selectedDay} after:content-[''] after:absolute after:bg-primary-main after:rounded-xl after:w-4 after:h-1 after:bottom-0 after:transition-all after:duration-500
				${selectedDay === 0 ? 'after:left-0' : ''}
				${selectedDay === 1 ? 'after:left-1/2' : ''}
			`}
		>
			{days.map((day, index) => (
				<Button
					value={index}
					className={`relative border-none text-base bg-background rounded-lg p-2 mr-6
						hover:cursor-pointer hover:text-primary-main focus:outline-none
						${index === selectedDay ? 'text-primary-main' : ''}
					`}
					onClick={(e) => {
						onClick(Number((e.currentTarget as HTMLButtonElement).value));
					}}
					key={index}
				>
					{day}
				</Button>
			))}
		</div>
	);
}
