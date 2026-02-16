'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import TableChartIcon from '@mui/icons-material/TableChart';
import MapIcon from '@mui/icons-material/Map';
import { useRouter, usePathname } from 'next/navigation';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { PageRoutes } from 'types/navigation';
import { useIsMobileNavEnable } from 'hooks/navigationUtils';

const StyledBottomNav = styled(BottomNavigation)(({ theme }) => ({
	position: 'fixed',
	bottom: 0,
	left: 0,
	right: 0,
	width: '100%',
	height: '64px',
	backgroundColor: theme.palette.secondary.dark,
	borderTop: `1px solid ${theme.palette.divider}`,
	zIndex: theme.zIndex.drawer,

	[theme.breakpoints.up('md')]: {
		display: 'none',
	},
}));

const StyledBottomNavAction = styled(BottomNavigationAction)(({ theme }) => ({
	color: theme.palette.grey[500],
	'&.Mui-selected': {
		color: theme.palette.primary.main,
	},
}));

interface MobileBottomNavProps {
	routes: PageRoutes;
}

const MobileBottomNav = ({ routes }: MobileBottomNavProps) => {
	const isMobileNavEnable = useIsMobileNavEnable();
	const router = useRouter();
    const pathname = usePathname();

	// Only show on mobile and in Megaport pages
	if (!isMobileNavEnable) {
		return null;
	}

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		router.push(newValue);
	};

	// Determine current value based on the path
	const getNavValue = () => {
		if (pathname.endsWith('/map')) return routes.map;
		if (pathname.endsWith('/lineup')) return routes.lineup;
		return routes.root;
	};

	return (
		<StyledBottomNav value={getNavValue()} onChange={handleChange} showLabels>
			{routes.lineup && (
				<StyledBottomNavAction
					label="Lineup"
					value={routes.lineup}
					icon={<QueueMusicIcon />}
				/>
			)}
			<StyledBottomNavAction
				label="Timetable"
				value={routes.root}
				icon={<TableChartIcon />}
			/>
			<StyledBottomNavAction label="Map" value={routes.map} icon={<MapIcon />} />
		</StyledBottomNav>
	);
};

export default MobileBottomNav;