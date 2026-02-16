'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useIsInApp } from 'hooks/useCheckDevice';
import { setLSWithExpiry, getLSWithExpiry } from 'utils/localStorageUtils';
import { STORAGE_KEY } from 'constants/static';
import AlertDialog from 'components/shared/AlertDialog';

export default function AppInitializer() {
	const [openDialog, setOpenDialog] = useState(false);
	const isInApp = useIsInApp();
	const router = useRouter();
    const pathname = usePathname();

	useEffect(() => {
		if (!localStorage.getItem(STORAGE_KEY.day)) {
			localStorage.setItem(STORAGE_KEY.day, '0');
		}
	}, []);

	useEffect(() => {
		const isIgnoreDialog = getLSWithExpiry(STORAGE_KEY.ignoreDialog) === 'true';
		if (!isIgnoreDialog) {
			setOpenDialog(isInApp);
		}
	}, [isInApp]);

	useEffect(() => {
		const savedPath = localStorage.getItem(STORAGE_KEY.lastVisitedPath);
		const isHomepage = pathname === '/';

        // in-app browser will always be treated as a new user
		const isNavigationFromExternalSite =
			document.referrer === '' || !document.referrer.includes(window.location.origin);

		// Save current path when route changes
		const savePath = () => {
			localStorage.setItem(STORAGE_KEY.lastVisitedPath, pathname);
		};

		// Navigate to last visit path on initial load
		const navigateToLastVisitPath = () => {
			// redirection only happened on the main page.
			const isNavigationEnable =
				isHomepage && savedPath && savedPath !== '/' && isNavigationFromExternalSite;

			if (isNavigationEnable) {
				router.push(savedPath);
			}
		};

		savePath();

		// Run check on mount
		if (savedPath) {
			navigateToLastVisitPath();
			return;
		}
	}, [pathname, router]);

	const handleCloseDialog = () => {
		const tenMinutesInMs = 10 * 60 * 1000;
		setLSWithExpiry(STORAGE_KEY.ignoreDialog, 'true', tenMinutesInMs);

		setOpenDialog(false);
	};

	return (
		<AlertDialog
			open={openDialog}
			title={'瀏覽器切換'}
			content={'使用預設瀏覽器開啟，以獲得較好體驗。'}
			confirmButtonText={'關閉'}
			hideDisagreeButton={true}
			handleConfirm={handleCloseDialog}
			handleClose={handleCloseDialog}
		/>
	);
}