import { useEffect, useState } from 'react';
import { isInApp } from 'utils/detect-inapp';

const useIsInApp = () => {
	const [isInAppBrowser, setIsInAppBrowser] = useState(false);

	useEffect(() => {
		const useragent = navigator.userAgent || navigator.vendor;
		const isInAppBrowser = isInApp(useragent);
		console.log("isInAppBrowser: ", isInAppBrowser, useragent);
		setIsInAppBrowser(isInAppBrowser);
	}, []);

	return isInAppBrowser;
};

export default useIsInApp;
