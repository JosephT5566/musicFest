import { useEffect, useState } from 'react';
import { isInApp, isInPWA } from 'utils/detect-inapp';

export const useIsInApp = () => {
	const [isInAppBrowser, setIsInAppBrowser] = useState(false);

	useEffect(() => {
		const useragent = navigator.userAgent || navigator.vendor;
		const isInAppBrowser = isInApp(useragent);
		setIsInAppBrowser(isInAppBrowser);
	}, []);

	return isInAppBrowser;
};

export const useIsInPWA = () => {
	const [isInPWABrowser, setIsInPWABrowser] = useState(false);

	useEffect(() => {
		setIsInPWABrowser(isInPWA());
	}, []);

	return isInPWABrowser;
};
