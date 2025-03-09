import MaterialDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

type AlertDialogProps = {
	open: boolean;
	title: string;
	content: string;
	onClick?: () => void;
    handleClose: () => void;
};

export default function AlertDialog(props: AlertDialogProps) {
	const { open, title, content, onClick, handleClose } = props;

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
				<Button onClick={handleClose}>Disagree</Button>
				<Button onClick={onClick} autoFocus>
					Agree
				</Button>
			</DialogActions>
		</MaterialDialog>
	);
}
