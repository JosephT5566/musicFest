import MaterialDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

type AlertDialogProps = {
	open: boolean;
	title: string;
	content: string;
	confirmButtonText?: string;
	disagreeButtonText?: string;
	hideDisagreeButton?: boolean;
	handleConfirm?: () => void;
	handleClose: () => void;
};

export default function AlertDialog(props: AlertDialogProps) {
	const {
		open,
		title,
		content,
		confirmButtonText = 'Confirm',
		disagreeButtonText = 'Disagree',
		hideDisagreeButton = false,
		handleConfirm,
		handleClose,
	} = props;

	return (
		<MaterialDialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">{content}</DialogContentText>
			</DialogContent>
			<DialogActions>
				{!hideDisagreeButton && <Button onClick={handleClose}>{disagreeButtonText}</Button>}
				<Button onClick={handleConfirm} autoFocus>
					{confirmButtonText}
				</Button>
			</DialogActions>
		</MaterialDialog>
	);
}
