'use client';
import { useMediaQuery, useTheme } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';

const useIsMobile = () => {
	const theme = useTheme();
	return !useMediaQuery(theme.breakpoints.up('md'));
};

export const useIsMobileNavEnable = () => {
	const isMobile = useIsMobile();

	if (!isMobile) {
		return false;
	}

	const router = useRouter();
	const pathname = usePathname();
	const isMegaport = pathname.includes('/megaport');

	if (!isMegaport) {
		return false;
	}

	return true;
};
