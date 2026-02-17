'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useMediaQuery } from 'usehooks-ts';

export const useIsMobile = () => {
	// 對應 Tailwind 的 md 斷點 (768px)
	// 當螢幕寬度 < 768px 時返回 true
	const isMobile = useMediaQuery('(max-width: 767px)');

	return isMobile;
};

export const useIsMobileNavEnable = () => {
	const isMobile = useIsMobile();

	if (!isMobile) {
		return false;
	}

	// const router = useRouter();
	const pathname = usePathname();
	const isMegaport = pathname.includes('/megaport');

	if (!isMegaport) {
		return false;
	}

	return true;
};
