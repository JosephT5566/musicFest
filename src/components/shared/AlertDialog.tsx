import {
	AlertDialog as ShadcnAlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

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
		<ShadcnAlertDialog open={open} onOpenChange={handleClose}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{content}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					{!hideDisagreeButton && (
						<AlertDialogCancel asChild>
							<Button onClick={handleClose} variant="outline">{disagreeButtonText}</Button>
						</AlertDialogCancel>
					)}
					<AlertDialogAction asChild>
						<Button onClick={handleConfirm} autoFocus>{confirmButtonText}</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</ShadcnAlertDialog>
	);
}