import React, { useState, useEffect } from 'react';
import { useNavigation } from 'react-navi';
import { CurrentIndexStore } from './Context';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Button from './Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import { debounce } from '../../utils/helpers';

const useStyle = makeStyles((theme) => ({
	navigation_lg: {
		position: 'fixed',
		display: 'flex',
		zIndex: '100',

		top: '0em',
		left: '50%',
		transform: 'translate(-50%, 0)',
		padding: '1em 0',
		transition: '0.6s',
		'&.false': {
			top: '-4em',
		},
	},
	navigation_md: {
		position: 'fixed',
		display: 'flex',
		zIndex: '100',

		right: `-${theme.navWidth}`,
		height: '100vh',
		width: theme.navWidth,
		backgroundColor: theme.palette.bg.light,
		transition: '0.6s',
		'&.true': {
			right: '0',
		},
	},
	itemsContainer: {
		display: 'flex',
		width: '100%',
		padding: '0 0.5em',

		[theme.breakpoints.up('lg')]: {
			justifyContent: 'center',
		},
		[theme.breakpoints.down('md')]: {
			paddingTop: theme.headerHeight,
			flexDirection: 'column',
		},
	},
	navButton: {
		position: 'fixed',
		top: '0',
		right: '0',
		padding: '1em',
		[theme.breakpoints.up('lg')]: {
			display: 'none',
		},
	},
}));

const Items = () => {
	const navigation = useNavigation();

	return (
		<CurrentIndexStore>
			<Button
				index={1}
				onClick={() => {
					navigation.navigate(`/`);
				}}
			>
				{/* <HomeIcon className="icon" /> */}
				Time Table
			</Button>
			<Button
				index={2}
				onClick={() => {
					// navigation.navigate(`/otc`);
				}}
			>
				{/* <DataUsageIcon className="icon" /> */}
				Time Line
			</Button>
			<Button
				index={3}
				onClick={() => {
					// navigation.navigate(`/profile`);
				}}
			>
				{/* <AssistantIcon className="icon" /> */}
				Links
			</Button>
		</CurrentIndexStore>
	);
};

const NavigatorLg = () => {
	const classes = useStyle();

	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [visible, setVisible] = useState(true);

	const handleScroll = debounce(() => {
		// find current scroll position
		const currentScrollPos = window.pageYOffset;

		// set state based on location info (explained in more detail below)
		setVisible(
			(prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 30) || currentScrollPos < 10
		);

		// set state to new scroll position
		setPrevScrollPos(currentScrollPos);
	}, 100);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, [prevScrollPos, visible, handleScroll]);

	return (
		<nav className={`${classes.navigation_lg} ${visible}`}>
			<div className={classes.itemsContainer}>
				<Items />
			</div>
		</nav>
	);
};

const NavigatorMd = () => {
	const classes = useStyle();
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
			<nav className={`${classes.navigation_md} ${visible}`}>
				<div className={classes.itemsContainer}>
					<IconButton className={classes.navButton} onClick={handleClick}>
						<MenuIcon />
					</IconButton>
					<Items />
				</div>
			</nav>
		</ClickAwayListener>
	);
};

export default function Navigator() {
	const theme = useTheme();
	if (useMediaQuery(theme.breakpoints.up('lg'))) {
		return <NavigatorLg />;
	}
	return <NavigatorMd />;
}
