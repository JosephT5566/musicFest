import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useGetSelectedShow, useResetShows } from 'providers/ShowsProvider';
import useLocation from 'hooks/useLocation';
import { useRouter } from 'next/router';

import TimeTable from 'view/payment/TimeTable';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import ReplayIcon from '@mui/icons-material/Replay';
import { PageContainer } from 'components/base/Container';

import programList from 'static/program/megaport2021';
import { STORAGE_KEY } from 'static';
import { useOpenSnackbar } from 'providers/SnackbarProvider';
import DaySelector from 'components/shared/DaySelector';

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

export default function Home() {
	const [selectedDay, setSelectedDay] = useState(0);
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
			<DaySelector days={['3/27', '3/28']} selectedDay={selectedDay} onClick={handleClick} />
			<TimeTable festival={programList} selectedDay={selectedDay} />
			<StyledBtnContainer>
				<SaveButton onOpenSnack={handleOpenSnack} />
				<ResetButton />
			</StyledBtnContainer>
		</PageContainer>
	);
}
