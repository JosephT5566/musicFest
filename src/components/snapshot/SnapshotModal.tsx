'use client';
import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { Download, X, ArrowLeft, Loader2, BadgeInfo } from 'lucide-react';
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
	/**
	 * If true, activates developer mode. In dev mode, the modal shows the live
	 * component and a manual capture button. Otherwise, it automatically captures
	 * and displays the image for the user.
	 */
	devMode?: boolean;
}

/**
 * A modal component for generating and displaying a snapshot of the timetable.
 * Supports a normal user-facing mode (auto-capture) and a developer mode (manual capture).
 */
export default function SnapshotModal({
	schedule,
	artists,
	selectedDay,
	children,
	devMode = false, // Default to false for user-facing behavior
}: SnapshotModalProps) {
	// Ref to the DOM element that will be captured by html2canvas.
	const captureRef = useRef<HTMLDivElement>(null);
	// Stores the Base64 data URL of the captured image.
	const [imageData, setImageData] = useState<string | null>(null);
	const [isCapturing, setIsCapturing] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	/**
	 * Handles the manual image capture process, typically triggered in devMode.
	 */
	const handleManualCapture = () => {
		if (captureRef.current) {
			setIsCapturing(true);
			const { width, height } = captureRef.current.getBoundingClientRect();
			html2canvas(captureRef.current, {
				scale: 3, // Increased scale for better resolution of the captured image
				width,
				height,
				windowWidth: width,
				windowHeight: height,
			}).then((canvas) => {
				const data = canvas.toDataURL('image/png');
				setImageData(data);
				setIsCapturing(false);
			});
		}
	};

	/**
	 * Effect hook to automatically trigger image capture when in user mode (not devMode)
	 * and the modal is open, but no image has been captured yet.
	 * A setTimeout is used to ensure the component to be captured is fully rendered
	 * in the DOM before html2canvas attempts to capture it.
	 */
	useEffect(() => {
		if (!devMode && isOpen && isCapturing && !imageData) {
			const timer = setTimeout(() => {
				if (captureRef.current) {
					const { width, height } = captureRef.current.getBoundingClientRect();
					html2canvas(captureRef.current, {
						scale: 3,
						width,
						height,
						windowWidth: width,
						windowHeight: height,
					}).then((canvas) => {
						setImageData(canvas.toDataURL('image/png'));
						setIsCapturing(false);
					});
				}
			}, 100); // Small delay to allow DOM to settle after rendering off-screen
			return () => clearTimeout(timer); // Cleanup timeout on unmount or re-run
		}
	}, [devMode, isOpen, isCapturing, imageData]);

	/**
	 * Manages the open/close state of the dialog and resets capture-related states
	 * when the modal is closed. In user mode, it also triggers the auto-capture.
	 */
	const handleOpenChange = (open: boolean) => {
		setIsOpen(open);
		if (open && !devMode) {
			// In user mode, start capturing automatically when modal opens
			setIsCapturing(true);
		}
		if (!open) {
			// Reset all states when modal closes, preparing for next open
			setImageData(null);
			setIsCapturing(false);
		}
	};

	/**
	 * A wrapper component for TimeTableSnapshot to facilitate conditional rendering
	 * and passing of the captureRef.
	 */
	const ToBeCaptured = () => (
		<TimeTableSnapshot
			schedule={schedule}
			selectedDay={selectedDay}
			artists={artists}
			captureRef={captureRef}
		/>
	);

	return (
		<>
			{/*
				Renders the TimeTableSnapshot component off-screen when in user mode
				and during the capture process. This allows html2canvas to capture it
				without it being visible to the user.
			*/}
			{!devMode && isOpen && isCapturing && !imageData && (
				<div style={{ position: 'fixed', left: '-9999px', top: 0 }}>
					<ToBeCaptured />
				</div>
			)}
			<Dialog open={isOpen} onOpenChange={handleOpenChange}>
				<DialogTrigger asChild>{children}</DialogTrigger>
				<DialogContent className="w-[90dvw] h-[90dvh] max-w-full p-2 flex flex-col">
					<DialogHeader>
						{/* Dialog title, shows '(dev)' in developer mode */}
						<DialogTitle>
							單頁檢視{' '}
							{devMode && (
								<span className="text-xs text-muted-foreground">(dev)</span>
							)}
						</DialogTitle>
						<DialogClose className="absolute top-2 right-2">
							<X className="h-6 w-6 bg-white rounded-full p-1"></X>
						</DialogClose>
					</DialogHeader>

					<div className="overflow-auto h-full">
						{/* Conditional rendering based on imageData presence and devMode */}
						{imageData ? (
							<div className="relative flex justify-center items-center h-full">
								{/* Hint card for saving the image, fixed at the top */}
								<div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1 items-center bg-accent text-secondary backdrop-blur-sm p-2 rounded-lg shadow-lg z-10">
									<BadgeInfo className="h-4 w-4 text-primary"/>
									<p className="text-sm">長按圖片即可儲存</p>
								</div>
								<img
									src={imageData}
									alt="Timetable Screenshot"
									className="max-w-full max-h-full object-contain"
								/>
							</div>
						) : devMode ? ( // In dev mode, show the live component
							<ToBeCaptured />
						) : ( // In user mode, show a loading spinner during capture
							<div className="flex justify-center items-center h-full">
								<Loader2 className="animate-spin h-10 w-10" />
							</div>
						)}
					</div>

					{/* Conditional buttons for developer mode */}
					{devMode &&
						(imageData ? ( // If image is captured, show 'Back' button
							<Button
								onClick={() => setImageData(null)}
								variant="outline"
								size="icon"
								className="absolute bottom-4 left-4"
							>
								<ArrowLeft />
							</Button>
						) : ( // If no image, show 'Download' button to trigger capture
							<Button
								onClick={handleManualCapture}
								variant="outline"
								size="icon"
								className="absolute bottom-4 right-4"
								disabled={isCapturing}
							>
								{isCapturing ? <Loader2 className="animate-spin" /> : <Download />}
							</Button>
						))}
				</DialogContent>
			</Dialog>
		</>
	);
}
