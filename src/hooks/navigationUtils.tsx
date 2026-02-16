'use client';
import { useRouter, usePathname } from 'next/navigation';

export const useIsMobileNavEnable = () => {
	const router = useRouter();
	const pathname = usePathname();
	const isMegaport = pathname.includes('/megaport');

	if (!isMegaport) {
		return false;
	}

	return false; // Simplified for now, will use Tailwind CSS responsive utilities later
};