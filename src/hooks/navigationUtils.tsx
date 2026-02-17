'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useMediaQuery } from 'usehooks-ts';

export const useIsMobile = () => {
	// 對應 Tailwind 的 md 斷點 (768px)
	// 當螢幕寬度 < 768px 時返回 true
	const matches = useMediaQuery('(max-width: 767px)');
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		setIsMobile(matches);
	}, [matches]);

	return isMobile;
};

export const useIsMobileNavEnable = () => {
	const isMobile = useIsMobile();
	const pathname = usePathname();

	if (!isMobile) {
		return false;
	}

	const isMegaport = pathname.includes('/megaport');

	if (!isMegaport) {
		return false;
	}

	return true;
};
