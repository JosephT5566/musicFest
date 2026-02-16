'use client';
import MaterialSnackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import WarningIcon from '@mui/icons-material/Error';
import CheckIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Cancel';
import { styled } from '@mui/material/styles';
import { useCloseSnackbar, useSnackbarProps } from 'providers/SnackbarProvider';

const StyledSnackbar = styled(MaterialSnackbar)({
	'& > div': {
		borderRadius: '0.5em',
	},
});
const StyledContent = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	width: '100%',
	fontWeight: 'bold',
	color: theme.palette.common.white,
	backgroundColor: theme.palette.success.main,
	padding: '1em',
	'&.success': {
		backgroundColor: theme.palette.success.main,
	},
	'&.warning': {
		backgroundColor: theme.palette.warning.main,
	},
	'&.error': {
		backgroundColor: theme.palette.error.main,
	},
}));

export default function Snackbar() {
	const snackbarProps = useSnackbarProps();
	const handleClose = useCloseSnackbar();

	const Icon = () => {
		switch (snackbarProps.severity) {
			case 'success':
				return <CheckIcon sx={{ marginRight: '0.5em' }} />;
			case 'warning':
				return <WarningIcon sx={{ marginRight: '0.5em' }} />;
			case 'error':
				return <ErrorIcon sx={{ marginRight: '0.5em' }} />;
			default:
				return null;
		}
	};

	return (
		<StyledSnackbar
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			open={snackbarProps.open}
			onClose={handleClose}
			autoHideDuration={1500}
			TransitionComponent={Slide}
		>
			<StyledContent className={`${snackbarProps.severity}`}>
				<Icon />
				{snackbarProps.message}
			</StyledContent>
		</StyledSnackbar>
	);
}