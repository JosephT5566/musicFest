import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useGetSelectedShow, useResetShows } from 'providers/ShowsProvider';
import useLocation from 'hooks/useLocation';
import { useRouter } from 'next/router';

import TimeTable from 'view/payment/TimeTable';
import TimeLine from 'view/payment/TimeLine';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import ReplayIcon from '@mui/icons-material/Replay';
import { PageContainer } from 'components/base/Container';
import DaySelector from 'components/shared/DaySelector';
import DisplayModeSelector from 'components/shared/DisplayModeSelector';

import { IDisplayMode } from 'types/displayMode';
import { useOpenSnackbar } from 'providers/SnackbarProvider';

import programList from 'assets/program/megaport2021';
import { STORAGE_KEY } from 'constants/static';

const SelectorsContainer = styled('div')(({ theme }) => ({
	width: '100%',
	display: 'flex',
	justifyContent: 'space-between',
	paddingInline: '2rem',

	[theme.breakpoints.down('md')]: {
		flexDirection: 'column',
		gap: '0.5rem',
		alignItems: 'center',
	},
}));

const StyledBtnContainer = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	position: 'fixed',
	right: '2em',
	bottom: '4em',
	[theme.breakpoints.up('sm')]: {
		flexDirection: 'row',
		bottom: '2em',
	},
}));

const StyledSaveBtn = styled(IconButton)(({ theme }) => ({
	backgroundColor: theme.palette.secondary.main,
	color: theme.palette.primary.main,
	boxShadow: '-5px 5px 10px',
	'&:focus': {
		backgroundColor: theme.palette.secondary.main,
	},
	[theme.breakpoints.up('sm')]: {
		margin: '0.2em',
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
		<StyledSaveBtn aria-label="share" onClick={handleClick}>
			<ShareIcon />
		</StyledSaveBtn>
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
		<StyledSaveBtn aria-label="reset" onClick={handleClick}>
			<ReplayIcon />
		</StyledSaveBtn>
	);
};

export default function Megaport2021() {
	const [selectedDay, setSelectedDay] = useState(0);
	const [mode, setMode] = useState<IDisplayMode>('timetable');
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
		<PageContainer>
			<SelectorsContainer>
				<DisplayModeSelector mode={mode} setMode={setMode} />
				<DaySelector
					days={['3/27', '3/28']}
					selectedDay={selectedDay}
					onClick={handleClick}
				/>
			</SelectorsContainer>
			{mode === 'timetable' ? (
				<>
					<TimeTable festival={programList} selectedDay={selectedDay} />
					<StyledBtnContainer>
						<SaveButton onOpenSnack={handleOpenSnack} />
						<ResetButton />
					</StyledBtnContainer>
				</>
			) : (
				<TimeLine programList={programList} selectedDay={selectedDay} />
			)}
		</PageContainer>
	);
}
