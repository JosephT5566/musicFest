'use client';
import React, { useState, useEffect } from 'react';
import useLocation from 'hooks/useLocation';
import { useRouter } from 'next/navigation';

import TimeTable from 'view/payment/TimeTable';
import TimeLine from 'view/payment/TimeLine';
import { Share, RotateCcw, Map } from 'lucide-react';
import { PageContainer } from 'components/base/Container';
import { H1 } from 'components/base/Typography';
import DaySelector from 'components/shared/DaySelector';
import DisplayModeSelector from 'components/shared/DisplayModeSelector';
import { FixedButtonsContainer } from 'components/base/Container';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import ShowsProvider, { useGetSelectedShow, useResetShows } from 'providers/ShowsProvider';

import { IDisplayMode } from 'types/displayMode';

import programList from 'assets/program/megaport2022';
import { ROUTE, FEST_NAME, STORAGE_KEY } from 'constants/static';
import moment from 'moment';

const SaveButton = () => {
	const selectedShows = useGetSelectedShow();

	const router = useRouter();
	const url = useLocation();

	const handleClick = async () => {
		const data = btoa(JSON.stringify(selectedShows));
		try {
			await navigator.clipboard.writeText(`${url?.host}${url?.pathname}#${data}`); // copy to clipboard
			if (data !== '' || url?.hash.substring(1) !== '') {
				router.push(`${url?.pathname}#${data}`);
			}
			toast.success('已複製網址', {
				description: '可加到書籤儲存。',
			});
		} catch (error) {
			console.error('Could not copy text: ', error);
			toast.error('複製失敗', {
				description: '請手動複製網址。',
			});
		}
	};

	return (
		<Button aria-label="share" onClick={handleClick} size="lg" className="shadow-md">
			<Share />
		</Button>
	);
};

const ResetButton = () => {
	const resetData = useResetShows();

	const handleClick = () => {
		resetData();
	};

	return (
		<Button aria-label="reset" onClick={handleClick} size="lg" className="shadow-md">
			<RotateCcw />
		</Button>
	);
};

const header = `${FEST_NAME.MEGAPORT} - 2022`;

export default function Megaport2022() {
	const [selectedDay, setSelectedDay] = useState(0);
	const [mode, setMode] = useState<IDisplayMode>('timetable');
	const router = useRouter();

	useEffect(() => {
		setSelectedDay(Number(localStorage.getItem(STORAGE_KEY.day)));
	}, []);

	const handleClick = (value: number) => {
		setSelectedDay(value);
		localStorage.setItem(STORAGE_KEY.day, value.toString());
	};

	return (
		<ShowsProvider storageKey={ROUTE.megaport[2022].root}>
			<PageContainer>
				<H1>{header}</H1>
				<div
					className="w-full flex justify-between px-4 flex-col md:flex-row gap-2 items-start"
				>
					<DisplayModeSelector mode={mode} setMode={setMode} />
					<DaySelector
						days={programList.perfDays.map((d) =>
							moment(d.dayStartTime).format('MM/DD')
						)}
						selectedDay={selectedDay}
						onClick={handleClick}
					/>
				</div>
				{mode === 'timetable' ? (
					<TimeTable programList={programList} selectedDay={selectedDay} />
				) : (
					<TimeLine programList={programList} selectedDay={selectedDay} />
				)}
				<FixedButtonsContainer>
					<SaveButton />
					<ResetButton />
					<Button
						size={'lg'}
						onClick={() => {
							router.push(ROUTE.megaport[2022].map);
						}}
						className="shadow-md"
					>
						<Map />
					</Button>
				</FixedButtonsContainer>
			</PageContainer>
		</ShowsProvider>
	);
}
