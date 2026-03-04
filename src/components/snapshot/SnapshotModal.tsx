'use client';
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { Camera, X } from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import TimeTableSnapshot from './TimeTableSnapshot';
import { ISchedule, IArtistV2 } from 'types/show';

interface SnapshotModalProps {
	schedule: ISchedule;
	artists: IArtistV2[];
	selectedDay: number;
	children: React.ReactNode;
}

export default function SnapshotModal({
	schedule,
	artists,
	selectedDay,
	children,
}: SnapshotModalProps) {
	const captureRef = useRef<HTMLDivElement>(null);

	const handleCapture = () => {
		if (captureRef.current) {
			html2canvas(captureRef.current, { scale: 2 }).then((canvas) => {
				const link = document.createElement('a');
				link.download = 'timetable.png';
				link.href = canvas.toDataURL('image/png');
				link.click();
			});
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="w-[90vw] h-[90vh] max-w-full p-2">
				<DialogHeader>
					<DialogTitle>全畫面預覽</DialogTitle>
					<DialogClose className="absolute top-2 right-2">
						<X className="h-6 w-6 bg-white rounded-full p-1"></X>
					</DialogClose>
				</DialogHeader>
				<div className="overflow-auto">
					<TimeTableSnapshot
						schedule={schedule}
						selectedDay={selectedDay}
						artists={artists}
						captureRef={captureRef}
					/>
				</div>
				<Button
					onClick={handleCapture}
					variant="outline"
					size="icon"
					className="absolute bottom-4 right-4"
				>
					<Camera />
				</Button>
			</DialogContent>
		</Dialog>
	);
}
