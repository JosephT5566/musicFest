'use client';
import React, { useState, useEffect } from 'react';

import TimeTableV2 from 'view/payment/TimeTableV2';
import TimeLineV2 from 'view/payment/TimeLineV2';
import { PageContainer, FixedButtonsContainer } from 'components/base/Container';
import { H1 } from 'components/base/Typography';
import DaySelector from 'components/shared/DaySelector';
import DisplayModeSelector from 'components/shared/DisplayModeSelector';
import { toast } from 'sonner';

import { useGetSelectedShow } from 'providers/ShowsProvider';
import { IDisplayMode } from 'types/displayMode';
import { ISchedule, IArtistV2 } from 'types/show';

import { STORAGE_KEY } from 'constants/static';
import moment from 'moment';

import ResetButton from 'components/ResetButton';
import SaveButton from 'components/SaveButton';
import NotificationButton from 'components/NotificationButton';
import useSendNotification from 'hooks/useSendNotification';
import { PageRoutes } from 'types/navigation';

const getActiveShows = (artists: IArtistV2[], selectedShows: string[]): IArtistV2[] => {
	return artists.filter((artist) => selectedShows.includes(artist.id));
};

type PageProps = {
	pageRoutes: PageRoutes;
	storageKey: string; // used to be root name
	schedule: ISchedule;
	artists: IArtistV2[];
};

const Page = ({ schedule, artists, storageKey }: PageProps) => {
	const [selectedDay, setSelectedDay] = useState(0);
	const [mode, setMode] = useState<IDisplayMode>('timetable');

	const selectedShows = useGetSelectedShow();
	const activeShows = getActiveShows(artists, selectedShows);
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
			<div className="w-full flex justify-between px-0 md:px-4 flex-col md:flex-row gap-2 items-start md:items-center">
				<DisplayModeSelector mode={mode} setMode={setMode} />
				<DaySelector
					days={schedule.map((d) => moment(d.date).format('MM/DD'))}
					selectedDay={selectedDay}
					onClick={handleClick}
				/>
			</div>
			{mode === 'timetable' ? (
				<TimeTableV2 programList={schedule} selectedDay={selectedDay} artists={artists} />
			) : (
				<TimeLineV2 programList={schedule} selectedDay={selectedDay} artists={artists} />
			)}
			<FixedButtonsContainer>
				<NotificationButton />
				<SaveButton onOpenSnack={handleOpenSnack} />
				<ResetButton />
			</FixedButtonsContainer>
		</PageContainer>
	);
};

export default Page;
