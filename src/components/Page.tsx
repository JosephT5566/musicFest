import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';

import TimeTable from 'view/payment/TimeTable';
import TimeLine from 'view/payment/TimeLine';
import MapIcon from '@mui/icons-material/Map';
import { PageContainer } from 'components/base/Container';
import { H1 } from 'components/base/Typography';
import DaySelector from 'components/shared/DaySelector';
import DisplayModeSelector from 'components/shared/DisplayModeSelector';
import { FixedButtonsContainer } from 'components/base/Container';
import { ShadowIconButton } from 'components/base/Button';

import ShowsProvider, { useGetSelectedShow } from 'providers/ShowsProvider';
import { useOpenSnackbar } from 'providers/SnackbarProvider';
import { IDisplayMode } from 'types/displayMode';
import { IProgramList } from 'types/show';

import { STORAGE_KEY } from 'constants/static';
import moment from 'moment';
import Head from 'next/head';

import ResetButton from './ResetButton';
import SaveButton from './SaveButton';
import NotificationButton from './NotificationButton';
import useSendNotification from 'hooks/useSendNotification';

const SelectorsContainer = styled('div')(({ theme }) => ({
	width: '100%',
	display: 'flex',
	justifyContent: 'space-between',
	paddingInline: '1rem',

	[theme.breakpoints.down('md')]: {
		flexDirection: 'column',
		paddingInline: '0',
		gap: '0.5rem',
		alignItems: 'start',
	},
}));

const getActiveShows = (programList: IProgramList, selectedShows: string[]) => {
	const activeShows = programList.perfDays
		.map((perfDay) => {
			return {
				stages: perfDay.stages.map((stage) => {
					return {
						artists: stage.artists.filter((artist) =>
							selectedShows.includes(artist.id)
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
	mapRoute: string;
	storageKey: string; // used to be root name
	programList: IProgramList;
};

const Page = ({ headerTitle, pageTitle, mapRoute, programList, storageKey }: PageProps) => {
	const [selectedDay, setSelectedDay] = useState(0);
	const [mode, setMode] = useState<IDisplayMode>('timetable');

	const router = useRouter();
	const openSnackbar = useOpenSnackbar();
	const selectedShows = useGetSelectedShow();
	const activeShows = getActiveShows(programList, selectedShows);
	const notificationKey = `${storageKey}_${STORAGE_KEY.notification}`;

	useSendNotification(activeShows, notificationKey);

	useEffect(() => {
		setSelectedDay(Number(localStorage.getItem(STORAGE_KEY.day)));

		Notification.requestPermission();
	}, []);

	const handleClick = (value: number) => {
		setSelectedDay(value);
		localStorage.setItem(STORAGE_KEY.day, value.toString());
	};

	const handleOpenSnack = () => {
		openSnackbar('success', '已複製網址，可加到書籤儲存。');
	};

	return (
		<PageContainer>
			<Head>
				<title>{headerTitle}</title>
			</Head>

			<H1>{pageTitle}</H1>
			<SelectorsContainer>
				<DisplayModeSelector mode={mode} setMode={setMode} />
				<DaySelector
					days={programList.perfDays.map((d) => moment(d.dayStartTime).format('MM/DD'))}
					selectedDay={selectedDay}
					onClick={handleClick}
				/>
			</SelectorsContainer>
			{mode === 'timetable' ? (
				<TimeTable programList={programList} selectedDay={selectedDay} />
			) : (
				<TimeLine programList={programList} selectedDay={selectedDay} />
			)}
			<FixedButtonsContainer>
				<NotificationButton />
				<SaveButton onOpenSnack={handleOpenSnack} />
				<ResetButton />
				<ShadowIconButton
					size={'large'}
					onClick={() => {
						router.push(mapRoute);
					}}
				>
					{<MapIcon />}
				</ShadowIconButton>
			</FixedButtonsContainer>
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
