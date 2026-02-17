import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from 'lib/utils';

interface Props {
	days: string[];
	selectedDay: number;
	onClick: (day: number) => void;
}

export default function DaySelector({ days, selectedDay, onClick }: Props) {
	return (
		<div
			className={cn(
				"relative flex after:content-[''] after:absolute after:bg-primary after:rounded-xl after:w-4 after:h-1 after:bottom-0 after:transition-all after:duration-500",
				selectedDay === 0 && 'after:left-0',
				selectedDay === 1 && 'after:left-1/2'
			)}
		>
			{days.map((day, index) => (
				<Button
					variant="ghost"
					className={cn(
						'relative border-none text-base rounded-lg p-2 mr-6 hover:bg-transparent hover:text-primary focus:outline-none',
						index === selectedDay ? 'text-primary' : 'text-muted-foreground'
					)}
					onClick={() => {
						onClick(index);
					}}
					key={index}
				>
					{day}
				</Button>
			))}
		</div>
	);
}
