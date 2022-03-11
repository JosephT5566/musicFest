import { styled } from '@mui/material/styles';
import ButtonGroup from '@mui/material/ButtonGroup';
import TableChartIcon from '@mui/icons-material/TableChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import Button from '@mui/material/Button';

import { IDisplayMode } from 'types/displayMode';

const StyledButton = styled(Button)(({ theme }) => ({
	fontFamily: theme.typography.fontFamily,
	fontWeight: 'bold',

	'&.MuiButton-contained': {
		color: theme.palette.common.white,
		boxShadow: 'none',
	},
}));

interface Props {
	mode: IDisplayMode;
	setMode: React.Dispatch<React.SetStateAction<IDisplayMode>>;
}

export default function DisplayModeSelector({ mode, setMode }: Props) {
	return (
		<ButtonGroup>
			<StyledButton
				variant={mode === 'timetable' ? 'contained' : 'outlined'}
				startIcon={<TableChartIcon />}
				onClick={() => {
					setMode('timetable');
				}}
				aria-label={'time table'}
			>
				{'時刻表'}
			</StyledButton>
			<StyledButton
				variant={mode === 'timeline' ? 'contained' : 'outlined'}
				startIcon={<TimelineIcon />}
				onClick={() => {
					setMode('timeline');
				}}
				aria-label={'time line'}
			>
				{'時間軸'}
			</StyledButton>
		</ButtonGroup>
	);
}
