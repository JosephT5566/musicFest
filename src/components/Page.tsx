'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import TimeTable from 'view/payment/TimeTable';
import TimeLine from 'view/payment/TimeLine';
import { Map } from 'lucide-react';
import { PageContainer } from 'components/base/Container';
import { H1 } from 'components/base/Typography';
import DaySelector from 'components/shared/DaySelector';
import DisplayModeSelector from 'components/shared/DisplayModeSelector';
import { FixedButtonsContainer } from 'components/base/Container';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import ShowsProvider, { useGetSelectedShow } from 'providers/ShowsProvider';
import { IDisplayMode } from 'types/displayMode';
import { IProgramList } from 'types/show';

import { STORAGE_KEY } from 'constants/static';
import moment from 'moment';

import ResetButton from 'components/ResetButton';
import SaveButton from 'components/SaveButton';
import NotificationButton from 'components/NotificationButton';
import useSendNotification from 'hooks/useSendNotification';
import MobileBottomNav from 'components/shared/MobileBottomNav';
import { PageRoutes } from 'types/navigation';
import { useIsMobileNavEnable } from 'hooks/navigationUtils';

const getActiveShows = (programList: IProgramList, selectedShows: string[]) => {
	const activeShows = programList.perfDays
		.map((perfDay) => {
			return {
				stages: perfDay.stages.map((stage) => {
					return {
						artists: stage.artists.filter((artist) =>
							selectedShows.includes(artist.id),
						),
					};
				}),
			};
		})
		.flatMap((stage) => stage.stages.flatMap((stage) => stage.artists))
		.filter((artist) => artist.id !== undefined);

	return activeShows;
};

type PageProps = {
	headerTitle: string;
	pageTitle: string;
	pageRoutes: PageRoutes;
	storageKey: string; // used to be root name
	programList: IProgramList;
};

const Page = ({ headerTitle, pageTitle, pageRoutes, programList, storageKey }: PageProps) => {
	const [selectedDay, setSelectedDay] = useState(0);
	const [mode, setMode] = useState<IDisplayMode>('timetable');
	const isMobileNavEnable = useIsMobileNavEnable();

	const router = useRouter();
	const selectedShows = useGetSelectedShow();
	const activeShows = getActiveShows(programList, selectedShows);
	const notificationKey = `${storageKey}_${STORAGE_KEY.notification}`;

	useSendNotification(activeShows, notificationKey);

	useEffect(() => {
		setSelectedDay(Number(localStorage.getItem(STORAGE_KEY.day)));

		if ('Notification' in window) {
			Notification.requestPermission();
		}
	}, []);

	const handleClick = (value: number) => {
		setSelectedDay(value);
		localStorage.setItem(STORAGE_KEY.day, value.toString());
	};

	const handleOpenSnack = () => {
		toast.success('已複製網址', {
			description: '可加到書籤儲存。',
		});
	};

	return (
		<PageContainer>
			<H1>{pageTitle}</H1>
			<div className="w-full flex justify-between px-0 md:px-4 flex-col md:flex-row gap-2 items-start md:items-center">
				<DisplayModeSelector mode={mode} setMode={setMode} />
				<DaySelector
					days={programList.perfDays.map((d) => moment(d.dayStartTime).format('MM/DD'))}
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
				<NotificationButton />
				<SaveButton onOpenSnack={handleOpenSnack} />
				<ResetButton />
				{/* The MobileBottomNav handles its own visibility */}
				<Button
					size={'lg'}
					onClick={() => {
						router.push(pageRoutes.map);
					}}
					className="shadow-md"
				>
					<Map />
				</Button>
			</FixedButtonsContainer>
			<MobileBottomNav routes={pageRoutes} />
		</PageContainer>
	);
};

export default function WrappedPage(pageProps: PageProps) {
	return (
		<ShowsProvider storageKey={pageProps.storageKey}>
			<Page {...pageProps} />
		</ShowsProvider>
	);
}
