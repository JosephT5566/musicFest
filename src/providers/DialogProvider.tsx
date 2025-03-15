import React, { createContext, useContext, useState } from 'react';

export class DialogProps {
	open: boolean;
	title: string;
	content: string;
	onClick?: () => void;

	constructor(open?: boolean) {
		this.open = !!open && true;
		this.title = '';
		this.content = '';
		this.onClick = undefined;
	}
}

interface methodsContent {
	closeDialog: () => void;
	openDialog: (
		title: DialogProps['title'],
		content: DialogProps['content'],
		onClick: DialogProps['onClick']
	) => void;
}

const dialogContext = createContext<DialogProps>({} as DialogProps);
const updateDialogContext = createContext<methodsContent>({} as methodsContent);

interface Props {
	children: React.ReactNode;
}

export default function DialogProvider({ children }: Props) {
	const [snackbarProps, setDialogProps] = useState(new DialogProps());

	const closeDialog: () => void = () => {
		setDialogProps((prev) => ({ ...prev, open: false }));
	};

	const openDialog = (
		title: DialogProps['title'],
		content: DialogProps['content'],
		onClick: DialogProps['onClick']
	) => {
		setDialogProps((prev) => ({
			...prev,
			title,
			content,
			onClick,
			open: true,
		}));
	};

	return (
		<dialogContext.Provider value={snackbarProps}>
			<updateDialogContext.Provider value={{ openDialog, closeDialog }}>
				{children}
			</updateDialogContext.Provider>
		</dialogContext.Provider>
	);
}

export const useDialogProps = () => useContext(dialogContext);

export const useCloseDialog = () => useContext(updateDialogContext).closeDialog;
export const useOpenDialog = () => useContext(updateDialogContext).openDialog;
