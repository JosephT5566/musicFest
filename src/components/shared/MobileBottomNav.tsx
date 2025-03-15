import React from 'react';
import { styled } from '@mui/material/styles';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import TableChartIcon from '@mui/icons-material/TableChart';
import MapIcon from '@mui/icons-material/Map';
import { useRouter } from 'next/router';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { PageRoutes } from 'types/navigation';

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
	const theme = useTheme();
	const isMobile = !useMediaQuery(theme.breakpoints.up('md'));
	const router = useRouter();

	// Only show on mobile and in Megaport pages
	if (!isMobile || !router.pathname.includes('/megaport')) return null;

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		router.push(newValue);
	};

	// Determine current value based on the path
	const getNavValue = () => {
		if (router.pathname.endsWith('/map')) return routes.map;
		if (router.pathname.endsWith('/timetable')) return routes.lineup;
		return routes.root;
	};

	return (
		<StyledBottomNav value={getNavValue()} onChange={handleChange} showLabels>
			{routes.lineup && (
				<StyledBottomNavAction
					label="Timetable"
					value={routes.lineup}
					icon={<TableChartIcon />}
				/>
			)}
			<StyledBottomNavAction label="Lineup" value={routes.root} icon={<QueueMusicIcon />} />
			<StyledBottomNavAction label="Map" value={routes.map} icon={<MapIcon />} />
		</StyledBottomNav>
	);
};

export default MobileBottomNav;
