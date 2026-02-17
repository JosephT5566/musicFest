import { Button } from '@/components/ui/button';
import { Sheet, ChartNetwork } from 'lucide-react';

import { IDisplayMode } from 'types/displayMode';

interface Props {
	mode: IDisplayMode;
	setMode: React.Dispatch<React.SetStateAction<IDisplayMode>>;
}

export default function DisplayModeSelector({ mode, setMode }: Props) {
	return (
		<div className="flex rounded-md shadow-sm" role="group">
			<Button
				variant={mode === 'timetable' ? 'default' : 'outline'}
				className="rounded-r-none font-bold"
				onClick={() => {
					setMode('timetable');
				}}
				aria-label={'time table'}
			>
				<Sheet className="mr-2 h-4 w-4" />
				{'時刻表'}
			</Button>
			<Button
				variant={mode === 'timeline' ? 'default' : 'outline'}
				className="rounded-l-none font-bold"
				onClick={() => {
					setMode('timeline');
				}}
				aria-label={'time line'}
			>
				<ChartNetwork className="mr-2 h-4 w-4" />
				{'時間軸'}
			</Button>
		</div>
	);
}