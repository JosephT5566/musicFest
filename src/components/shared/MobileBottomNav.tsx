'use client';
import React from 'react';
import { ScrollText, Sheet, Map } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { PageRoutes } from 'types/navigation';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';

interface MobileBottomNavProps {
	routes: PageRoutes;
}

const MobileBottomNav = ({ routes }: MobileBottomNavProps) => {
	const router = useRouter();
	const pathname = usePathname();

	const handleChange = (newValue: string) => {
		router.push(newValue);
	};

	// Determine current value based on the path
	const getNavValue = () => {
		if (pathname.endsWith('/map')) return routes.map;
		if (pathname.endsWith('/lineup')) return routes.lineup;
		return routes.root;
	};

	const currentValue = getNavValue();

	return (
		<nav className="fixed bottom-0 left-0 right-0 w-full h-16 bg-secondary border-t border-border z-50 md:hidden flex justify-around items-center">
			{routes.lineup && (
				<Button
					variant="ghost"
					className={clsx(
						'flex flex-col items-center justify-center h-full text-muted-foreground hover:text-primary',
						{
							'text-primary': currentValue === routes.lineup,
						},
					)}
					onClick={() => routes.lineup && handleChange(routes.lineup)}
				>
					<ScrollText className="w-6 h-6" />
					<span className="text-xs">Lineup</span>
				</Button>
			)}
			<Button
				variant="ghost"
				className={clsx(
					'flex flex-col items-center justify-center h-full text-muted-foreground hover:text-primary font-bold',
					{
						'text-primary': currentValue === routes.root,
					},
				)}
				onClick={() => handleChange(routes.root)}
			>
				<Sheet className="w-6 h-6" />
				<span className="text-xs">Timetable</span>
			</Button>
			<Button
				variant="ghost"
				className={clsx(
					'flex flex-col items-center justify-center h-full text-muted-foreground hover:text-primary',
					{
						'text-primary': currentValue === routes.map,
					},
				)}
				onClick={() => handleChange(routes.map)}
			>
				<Map className="w-6 h-6" />
				<span className="text-xs">Map</span>
			</Button>
		</nav>
	);
};

export default MobileBottomNav;
