import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useGetSelectedShow, useResetShows } from 'providers/ShowsProvider';
import useLocation from 'hooks/useLocation';
import { useRouter } from 'next/router';

import TimeTable from 'view/payment/TimeTable';
import TimeLine from 'view/payment/TimeLine';
import ShareIcon from '@mui/icons-material/Share';
import ReplayIcon from '@mui/icons-material/Replay';
import MapIcon from '@mui/icons-material/Map';
import { SelectPageContainer } from 'components/base/Container';
import { H1 } from 'components/base/Typography';
import DaySelector from 'components/shared/DaySelector';
import DisplayModeSelector from 'components/shared/DisplayModeSelector';
import { FixedButtonsContainer } from 'components/base/Container';
import { ShadowIconButton } from 'components/base/Button';

import { IDisplayMode } from 'types/displayMode';
import { useOpenSnackbar } from 'providers/SnackbarProvider';

import programList from 'assets/program/megaport2021';
import { APP_NAME, ROUTE, STORAGE_KEY } from 'constants/static';
import moment from 'moment';
import Head from 'next/head';

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

const SaveButton = (props: { onOpenSnack: () => void }) => {
	const { onOpenSnack } = props;
	const selectedShows = useGetSelectedShow();

	const router = useRouter();
	const url = useLocation();

	const handleClick = async () => {
		const data = btoa(JSON.stringify(selectedShows));
		try {
			await navigator.clipboard.writeText(`${url.host}${url.pathname}#${data}`); // copy to clipboard
			if (data !== '' || url.hash.substring(1) !== '') {
				router.push(`${url.pathname}#${data}`);
			}
			onOpenSnack();
		} catch (error) {
			console.error('Could not copy text: ', error);
		}
	};

	return (
		<ShadowIconButton aria-label="share" onClick={handleClick}>
			<ShareIcon />
		</ShadowIconButton>
	);
};

const ResetButton = () => {
	const resetData = useResetShows();
	// const url = useLocation();

	const handleClick = () => {
		resetData();
		// window.history.pushState(null, '', `${url.pathname}`);
		// window.location.reload();
	};

	return (
		<ShadowIconButton aria-label="reset" onClick={handleClick}>
			<ReplayIcon />
		</ShadowIconButton>
	);
};

export default function Megaport2021() {
	const [selectedDay, setSelectedDay] = useState(0);
	const [mode, setMode] = useState<IDisplayMode>('timetable');
	const router = useRouter();
	const openSnackbar = useOpenSnackbar();

	useEffect(() => {
		setSelectedDay(Number(localStorage.getItem(STORAGE_KEY.day)));
	}, []);

	const handleClick = (value: number) => {
		setSelectedDay(value);
		localStorage.setItem(STORAGE_KEY.day, value.toString());
	};

	const handleOpenSnack = () => {
		openSnackbar('success', '已複製網址，可加到書籤儲存。');
	};

	return (
		<SelectPageContainer>
			<Head>
				<title>{`${APP_NAME} | 2021`}</title>
			</Head>

			<H1>{'2021 MEGAPORT'}</H1>
			<SelectorsContainer>
				<DisplayModeSelector mode={mode} setMode={setMode} />
				<DaySelector
					days={programList.perfDays.map((d) => moment(d.dayStartTime).format('MM/DD'))}
					selectedDay={selectedDay}
					onClick={handleClick}
				/>
			</SelectorsContainer>
			{mode === 'timetable' ? (
				<TimeTable festival={programList} selectedDay={selectedDay} />
			) : (
				<TimeLine programList={programList} selectedDay={selectedDay} />
			)}
			<FixedButtonsContainer>
				<SaveButton onOpenSnack={handleOpenSnack} />
				<ResetButton />
				<ShadowIconButton
					size={'large'}
					onClick={() => {
						router.push(ROUTE.megaport2021.map);
					}}
				>
					{<MapIcon />}
				</ShadowIconButton>
			</FixedButtonsContainer>
		</SelectPageContainer>
	);
}
