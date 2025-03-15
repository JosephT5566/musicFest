import { useEffect, useState } from 'react';

const useIsInAppWithoutLib = (): { isInApp: boolean; browserType: string } => {
	const [state, setState] = useState({ isInApp: false, browserType: '' });

	useEffect(() => {
		const ua = navigator.userAgent.toLowerCase();

		const browsers = {
			line: /\bline\b/i,
			facebook: /\b(fban|fbav|fbios)\b/i,
			instagram: /\binstagram\b/i,
			wechat: /\bmicromessenger\b/i,
			whatsapp: /\bwhatsapp\b/i,
			twitter: /\btwitter\b/i,
			kakao: /\bkakaotalk\b/i,
			// Add more as needed
		};

		// Check for standalone mode (PWA)
		const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

		if (!isStandalone) {
			for (const [name, regex] of Object.entries(browsers)) {
				if (regex.test(ua)) {
					setState({ isInApp: true, browserType: name });
					return;
				}
			}
		}

		setState({ isInApp: false, browserType: '' });
	}, []);

	return state;
};

export default useIsInAppWithoutLib;