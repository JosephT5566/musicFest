import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useGetShowsString, useResetShows } from 'context/ShowsProvider';
import useLocation from 'hooks/useLocation';
import { useRouter } from 'next/router';

import TimeScale from 'components/payments/TimeScale';
import TableOfDay from 'components/payments/TableOfDay';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import ReplayIcon from '@mui/icons-material/Replay';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import programList from 'static/program/megaport2021';
import { STORAGE_KEY } from 'static';

const StyledContainer = styled(Container)(({ theme }) => ({
	position: 'relative',
	backgroundColor: theme.palette.background.default,
}));

const StyledButtonsContainer = styled('div')(({ theme }) => ({
	position: 'sticky',
	display: 'flex',
	width: 'fit-content',
	left: '50%',
	transform: 'translateX(-50%)',
	margin: '0.5em 0 1em',
	'&::after': {
		content: `''`,
		position: 'absolute',
		backgroundColor: theme.palette.primary.main,
		borderRadius: '1em',
		width: '1em',
		height: '4px',
		bottom: '0',
		transition: '500ms',
	},
	'&.day0::after': {
		left: '0%',
	},
	'&.day1::after': {
		left: '50%',
	},
}));

const StyledDayBtn = styled('button')(({ theme }) => ({
	fontFamily: theme.typography.fontFamily,
	position: 'relative',
	border: 'none',
	fontSize: '1em',
	backgroundColor: theme.palette.background.default,
	borderRadius: '0.6em',
	padding: '0.5em 0',
	marginRight: '1.5em',
	'&:hover': {
		cursor: 'pointer',
		color: theme.palette.primary.main,
	},
	'&:focus': {
		outline: '0',
	},
	'&.true': {
		color: theme.palette.primary.main,
	},
}));

const StyledTimeTable = styled('div')({
	position: 'relative',
	display: 'flex',
	flexDirection: 'row',
	marginBottom: '1em',
	overflowX: 'scroll',
	overflowY: 'hidden',
});

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

const StyledAlertBar = styled(MuiAlert)(({ theme }) => ({
	fontFamily: theme.typography.fontFamily,
}));

const SaveButton = ({ onOpenSnack }) => {
	const getData = useGetShowsString();
	const router = useRouter();
	const url = useLocation();

	const handleClick = async () => {
		const data = btoa(getData());
		try {
			await navigator.clipboard.writeText(`${url.host}${url.pathname}#${data}`); // copy to clipboard
			if (data !== '' || url.hash.substring(1) !== '') {
				router.push(`${url.pathname}#${data}`);
				localStorage.setItem(STORAGE_KEY.defaultHash, data);
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
	const url = useLocation();

	const handleClick = () => {
		resetData();
		localStorage.removeItem(STORAGE_KEY.shows);

		window.history.pushState(null, '', `${url.pathname}`);
		window.location.reload();
		localStorage.removeItem(STORAGE_KEY.defaultHash);
	};

	return (
		<StyledSaveBtn aria-label="reset" onClick={handleClick}>
			<ReplayIcon />
		</StyledSaveBtn>
	);
};

const DayButton = ({ day, selectedDay, onClick, ...props }) => {
	const active = day === selectedDay ? true : false;

	const handleClick = () => onClick(day);

	return (
		<StyledDayBtn className={`${active}`} onClick={handleClick}>
			{props.children}
		</StyledDayBtn>
	);
};

export default function Home() {
	const [openSnack, setOpenSnack] = useState(false);
	const [selectedDay, setSelectedDay] = useState(0);

	useEffect(() => {
		setSelectedDay(Number(localStorage.getItem(STORAGE_KEY.day)));
	}, []);

	const handleClick = (value) => {
		setSelectedDay(value);
		localStorage.setItem(STORAGE_KEY.day, value);
	};

	const handleOpenSnack = () => setOpenSnack(true);

	const handleCloseSnack = () => setOpenSnack(false);

	return (
		<StyledContainer>
			<StyledButtonsContainer className={`${'day' + selectedDay}`}>
				<DayButton day={0} selectedDay={selectedDay} onClick={handleClick}>
					3/27
				</DayButton>
				<DayButton day={1} selectedDay={selectedDay} onClick={handleClick}>
					3/28
				</DayButton>
			</StyledButtonsContainer>
			<StyledTimeTable>
				<TimeScale />
				{programList.perfDays.map((perfDay, index) => {
					return (
						<TableOfDay
							key={index}
							perfDay={perfDay}
							day={index}
							selected={selectedDay}
						/>
					);
				})}
			</StyledTimeTable>
			<StyledBtnContainer>
				<SaveButton onOpenSnack={handleOpenSnack} />
				<ResetButton />
			</StyledBtnContainer>
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				open={openSnack}
				autoHideDuration={1500}
				onClose={handleCloseSnack}
			>
				<StyledAlertBar variant="filled" severity="success">
					已複製網址，可加到書籤儲存。
				</StyledAlertBar>
			</Snackbar>
		</StyledContainer>
	);
}
