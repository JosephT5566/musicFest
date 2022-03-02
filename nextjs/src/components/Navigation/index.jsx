import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CurrentIndexStore } from './Context';
import useLocation from 'hooks/useLocation';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Button from './Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import { debounce } from 'utils/helpers';
import { BACKEND_URL } from 'config';

const useStyle = makeStyles((theme) => ({
	navigation_lg: {
		position: 'fixed',
		display: 'flex',
		zIndex: '100',

		top: '0.5em',
		left: '50%',
		transform: 'translate(-50%, 0)',
		padding: '1em 0',
		backgroundColor: theme.palette.secondary.main,
		borderRadius: '0.5em',
		transition: '0.6s',
		'&.false': {
			top: '-4.5em',
		},
	},
	navigation_md: {
		position: 'fixed',
		display: 'flex',
		zIndex: '100',

		right: `-${theme.typography.navWidth}`,
		height: '100vh',
		width: theme.typography.navWidth,
		backgroundColor: theme.palette.secondary.dark,
		transition: '0.6s',
		'&.true': {
			right: '0',
		},
	},
	itemsContainer: {
		display: 'flex',
		width: '100%',
		padding: '0 0.5em',

		[theme.breakpoints.up('md')]: {
			justifyContent: 'center',
		},
		[theme.breakpoints.down('sm')]: {
			paddingTop: theme.typography.headerHeight,
			flexDirection: 'column',
		},
	},
	navButton: {
		position: 'fixed',
		top: '0.4em',
		right: '0.2em',
		color: theme.palette.primary.main,
		padding: '0.5em 0.8em',
		backgroundColor: `${theme.palette.secondary.main}BF`,
		borderRadius: '0.5em',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},

		'&:hover': {
			backgroundColor: `${theme.palette.secondary.main}E5`,
		},
	},
}));

const Items = ({ btnClicked }) => {
	const router = useRouter();
	const url = useLocation();

	return (
		<CurrentIndexStore>
			<Button
				index={1}
				onClick={() => {
					router.push(`${BACKEND_URL}/${url.hash}`);
					if (btnClicked) btnClicked();
				}}
			>
				Time Table
			</Button>
			<Button
				index={2}
				onClick={() => {
					router.push(`${BACKEND_URL}/timeline/${url.hash}`);
					if (btnClicked) btnClicked();
				}}
			>
				Time Line
			</Button>
			<Button
				index={3}
				onClick={() => {
					router.push(`${BACKEND_URL}/map/${url.hash}`);
					if (btnClicked) btnClicked();
				}}
			>
				Map
			</Button>
			<Button
				index={4}
				onClick={() => {
					router.push(`${BACKEND_URL}/links/${url.hash}`);
					if (btnClicked) btnClicked();
				}}
			>
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

	const handleButtonClicked = () => {
		setVisible(false);
	};

	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<nav className={`${classes.navigation_md} ${visible}`}>
				<div className={classes.itemsContainer}>
					<IconButton className={classes.navButton} aria-label="menu" onClick={handleClick}>
						<MenuIcon />
					</IconButton>
					<Items btnClicked={handleButtonClicked} />
				</div>
			</nav>
		</ClickAwayListener>
	);
};

export default function Navigator() {
	const theme = useTheme();
	if (useMediaQuery(theme.breakpoints.up('md'))) {
		return <NavigatorLg />;
	}
	return <NavigatorMd />;
}
