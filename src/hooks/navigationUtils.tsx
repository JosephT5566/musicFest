import { useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/router';

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
	const isMegaport = router.pathname.includes('/megaport');
    
	if (!isMegaport) {
		return false;
	}

	return true;
};
