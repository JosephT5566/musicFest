import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import GitHubIcon from '@material-ui/icons/GitHub';

import { GApageView } from '../../../src';

const useStyle = makeStyles((theme) => ({
	linkPage: {
		display: 'flex',
		flexDirection: 'column',
		padding: '1em 0',
		minHeight: `calc(100vh - ${theme.headerHeight} - 2em)`,
	},
	previewContainer: {
		paddingBottom: '1em',
		borderBottom: `solid 1px ${theme.palette.bg.dark}`,
		marginBottom: '1em',
		[theme.breakpoints.up('md')]: {
			padding: '0 10em 1em',
		},
		'& .preview': {
			marginBottom: '1em',
		},
	},
	iconsContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	icon: {
		color: theme.palette.primary.main,
	},
	preview: {
		minHeight: '10em',
		width: '100%',
		display: 'flex',
		flexDirection: 'row-reverse',
		justifyContent: 'space-between',
		color: theme.palette.secondary.main,
		backgroundColor: theme.palette.bg.dark,
		borderRadius: '0.5em',
		textDecoration: 'none',
		[theme.breakpoints.down('xs')]: {
			height: 'auto',
			flexDirection: 'column',
		},
		'& .content': {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			padding: '1em',
			borderRadius: '0.5em 0 0 0.5em',
			'& .title': {
				fontSize: '20px',
				fontWeight: 'bold',
				paddingBottom: '0.5em',
				marginBottom: '0.5em',
				borderBottom: 'solid 1px black',
			},
			'& .description': {
				marginBottom: '0.5em',
				color: theme.palette.secondary.light,
			},
			'& .icon': {
				display: 'flex',
				fontSize: '8px',
				marginBottom: '0.5em',
				color: theme.palette.secondary.light,
				'& img': {
					height: '1rem',
					width: '1rem',
					marginRight: '0.5rem',
				},
			},
		},
		'& img': {
			width: '30%',
			objectFit: 'cover',
			borderRadius: '0 0.5em 0.5em 0',
			[theme.breakpoints.down('xs')]: {
				height: '15em',
				width: '100%',
				borderRadius: '0.5em 0.5em 0 0',
			},
		},
	},
}));

const PreviewLink = ({ url, title, description, image, icon }) => {
	const classes = useStyle();
	const IconImg = () => (icon ? <img src={icon} alt="icon" /> : null);

	return (
		<a className={classes.preview} href={url} target="_blank" rel="noopener noreferrer">
			<img src={image} alt={title} />
			<div className="content">
				<div className="title">{title}</div>
				<div className="description">{description}</div>
				<div className="icon">
					<IconImg />
					<div>{url}</div>
				</div>
			</div>
		</a>
	);
};

export default function Links() {
	const classes = useStyle();

	useEffect(() => {
		GApageView(window.location.hostname + window.location.pathname);
	}, []);

	return (
		<div className={classes.linkPage}>
			<div className={classes.previewContainer}>
				<div className="preview">
					<PreviewLink
						url={'https://www.megaportfest.com/index.php'}
						image={'http://www.megaportfest.com/300x300a.jpg'}
						title={'Megaport Festival 大港開唱 2021'}
						description={`【2021大港，確定開唱！】❤一張票一世情，望你牽成❤3月27-28日 | 高雄駁二藝術特區`}
						icon={'http://formoz.com/megaport/icon2.ico'}
					/>
				</div>
				<div className="preview">
					<PreviewLink
						url={'https://everylittled.com/article/148696'}
						image={
							'https://image4.thenewslens.com/2021/3/eteziiox4sda23d2iy3ooh0u9esyjl.jpg?auto=compress&fit=crop&h=450&q=85&updated_at=2021-03-24-18-20-31&w=750'
						}
						title={
							'鹽埕散步地圖｜大港開唱先別喝太醉，這些不用走太遠的小店，是你探險的好地方 - every little d'
						}
						description={`放心，我知道宿醉的你可能不會想走太遠，身為在鹽埕區工作過一段時間的高雄人，我精選了7個在大港開唱場地周遭，走路上一小段路就可以到達的在地小吃，以及幾個有趣的地方。-28日 | 高雄駁二藝術特區`}
					/>
				</div>
			</div>
			<div className={classes.iconsContainer}>
				<a href="https://github.com/JosephT5566/musicFest" target="_blank" rel="noopener noreferrer">
					<GitHubIcon className={classes.icon} />
				</a>
			</div>
		</div>
	);
}
