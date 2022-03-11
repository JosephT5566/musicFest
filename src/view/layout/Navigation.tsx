import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

import { ROUTE } from 'constants/static';
import { NavItem } from 'types/navigation';

const StyledLargeNav = styled('nav')({
	display: 'flex',
	gap: '1rem',
});

const StyledMediumNav = styled('nav')(({ theme }) => ({
	position: 'fixed',
	display: 'flex',
	zIndex: theme.zIndex.drawer,

	right: `-${theme.layout.navbar.width}`,
	top: 0,
	height: '100vh',
	width: theme.layout.navbar.width,
	backgroundColor: theme.palette.secondary.dark,
	transition: '0.6s',
	'&.true': {
		right: '0',
	},
}));

const StyledItemsContainer = styled('div')(({ theme }) => ({
	display: 'flex',
	width: '100%',
	gap: '1rem',

	[theme.breakpoints.down('sm')]: {
		paddingTop: theme.layout.header.height,
		flexDirection: 'column',
		paddingInline: '1em',
	},
}));

const StyledAnchor = styled('a')(({ theme }) => ({
	position: 'relative',
	display: 'flex',
	color: theme.palette.common.white,
	fontFamily: theme.typography.fontFamily,

	'&:focus': {
		outline: '0',
	},

	'&.active': {
		color: theme.palette.primary.main,
	},

	// add underline
	'&::after': {
		content: `''`,
		position: 'absolute',
		height: '2px',
		width: '0%',
		background: theme.palette.primary.main,

		transition: '200ms',
		bottom: '-0.5em',
	},
	'&:hover::after': {
		width: '90%',
		background: theme.palette.primary.main,
	},
	'&:focus::after': {
		width: '90%',
	},
	'&.active::after': {
		width: '90%',
	},
	'&.active:hover::after': {
		background: theme.palette.primary.main,
	},
}));

const MenuButtonContainer = styled('div')(({ theme }) => ({
	position: 'fixed',
	height: theme.layout.header.height,
	display: 'flex',
	top: 0,
	right: '1rem',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledMenuButton = styled(IconButton)(({ theme }) => ({
	color: theme.palette.primary.main,
	padding: '0.5em 0.8em',
	backgroundColor: `${theme.palette.secondary.main}BF`,
	borderRadius: '0.5em',

	'&:hover': {
		backgroundColor: `${theme.palette.secondary.main}E5`,
	},
}));

const navItems = [new NavItem('外部連結', ROUTE.links)];

const NavItems = (props: { navItems: NavItem[] }) => {
	const { navItems } = props;

	return (
		<>
			{navItems.map((n, index) => (
				<StyledAnchor href={n.route} key={index}>
					{n.label}
				</StyledAnchor>
			))}
		</>
	);
};

const NavigatorLg = () => {
	return (
		<StyledLargeNav>
			<StyledItemsContainer>
				<NavItems navItems={navItems} />
			</StyledItemsContainer>
		</StyledLargeNav>
	);
};

const NavigatorMd = () => {
	const [visible, setVisible] = useState(false);

	const handleClick = () => {
		setVisible((prev) => !prev);
	};

	const handleClickAway = () => {
		if (visible) {
			setVisible(false);
		}
	};

	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<StyledMediumNav className={`${visible}`}>
				<StyledItemsContainer>
					<MenuButtonContainer>
						<StyledMenuButton aria-label="menu" onClick={handleClick}>
							<MenuIcon />
						</StyledMenuButton>
					</MenuButtonContainer>
					<NavItems navItems={navItems} />
				</StyledItemsContainer>
			</StyledMediumNav>
		</ClickAwayListener>
	);
};

export default function Navigation() {
	const theme = useTheme();

	return useMediaQuery(theme.breakpoints.up('md')) ? <NavigatorLg /> : <NavigatorMd />;
}
