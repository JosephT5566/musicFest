'use client';
import { useCloseSnackbar, useSnackbarProps } from 'providers/SnackbarProvider';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import {
	Toast,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from 'components/ui/toast';

export default function CustomSnackbar() {
	const snackbarProps = useSnackbarProps();
	const handleClose = useCloseSnackbar();

	const Icon = () => {
		switch (snackbarProps.severity) {
			case 'success':
				return <CheckCircle className="mr-2 h-5 w-5" />;
			case 'warning':
				return <AlertCircle className="mr-2 h-5 w-5" />;
			case 'error':
				return <XCircle className="mr-2 h-5 w-5" />;
			default:
				return null;
		}
	};

	return (
		<ToastProvider>
			<Toast
				open={snackbarProps.open}
				onOpenChange={handleClose}
				duration={1500}
				className="top-0 flex fixed inset-x-0 mx-auto w-fit md:top-4 md:right-4 md:left-auto md:max-w-md"
			>
				<div
					className={`flex items-center w-full font-bold text-white p-4 rounded-md
						${snackbarProps.severity === 'success' ? 'bg-green-500' : ''}
						${snackbarProps.severity === 'warning' ? 'bg-orange-500' : ''}
						${snackbarProps.severity === 'error' ? 'bg-red-500' : ''}
					`}
				>
					<Icon />
					<ToastTitle>{snackbarProps.message}</ToastTitle>
					<ToastClose />
				</div>
			</Toast>
			<ToastViewport />
		</ToastProvider>
	);
}