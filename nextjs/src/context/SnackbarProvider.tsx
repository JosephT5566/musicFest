import React, { createContext, useContext, useState } from 'react';

export class SnackbarProps {
	open: boolean;
	message: string;
	severity: 'success' | 'warning' | 'error';

	constructor(open?: boolean) {
		this.open = !!open && true;
		this.message = '';
		this.severity = 'error';
	}
}

interface methodsContent {
	closeSnackbar: () => void;
	openSnackbar: (severity: SnackbarProps['severity'], message: string) => void;
}

const snackbarContext = createContext<SnackbarProps>({} as SnackbarProps);
const updateSnackbarContext = createContext<methodsContent>({} as methodsContent);

interface Props {
	children: React.ReactNode;
}

export default function SnackbarProvider({ children }: Props) {
	const [snackbarProps, setSnackbarProps] = useState(new SnackbarProps());

	const closeSnackbar: () => void = () => {
		setSnackbarProps((prev) => ({ ...prev, open: false }));
	};

	const openSnackbar = (severity: SnackbarProps['severity'], message: string) => {
		setSnackbarProps((prev) => ({
			...prev,
			severity: severity,
			open: true,
			message: message,
		}));
	};

	return (
		<snackbarContext.Provider value={snackbarProps}>
			<updateSnackbarContext.Provider value={{ openSnackbar, closeSnackbar }}>
				{children}
			</updateSnackbarContext.Provider>
		</snackbarContext.Provider>
	);
}

export const useSnackbarProps = () => useContext(snackbarContext);

export const useCloseSnackbar = () => useContext(updateSnackbarContext).closeSnackbar;
export const useOpenSnackbar = () => useContext(updateSnackbarContext).openSnackbar;
