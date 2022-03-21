import React from 'react';
import Head from 'next/head';
import { styled } from '@mui/material/styles';

import GitHubIcon from '@mui/icons-material/GitHub';
import { PageContainer } from 'components/base/Container';
import { H1, H2 } from 'components/base/Typography';
import { APP_NAME } from 'constants/static';
import { palette } from 'styles/palette';

const LinksSection = styled('section')(({ theme }) => ({
	width: 'inherit',
	paddingBottom: '1em',
	marginBottom: '1em',
	borderBottom: `solid 1px ${theme.palette.background.paper}`,
	[theme.breakpoints.up('lg')]: {
		paddingInline: '10em',
	},
}));

const PreviewContainer = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	gap: '1em',
});

const StyledGitHubIcon = styled(GitHubIcon)(({ theme }) => ({
	color: theme.palette.primary.main,
}));

const StyledPreview = styled('a')(({ theme }) => ({
	minHeight: '10em',
	width: '100%',
	display: 'flex',
	flexDirection: 'row-reverse',
	justifyContent: 'space-between',
	color: theme.palette.secondary.main,
	backgroundColor: theme.palette.background.paper,
	borderRadius: '0.5em',
	textDecoration: 'none',
	[theme.breakpoints.down('sm')]: {
		height: 'auto',
		flexDirection: 'column',
	},
	'& .content': {
		maxWidth: '70%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		gap: '0.5em',
		padding: '1em',
		borderRadius: '0.5em 0 0 0.5em',
		[theme.breakpoints.down('sm')]: {
			maxWidth: '100%',
		},
		'& .title': {
			fontSize: '20px',
			fontWeight: 'bold',
			paddingBottom: '0.5em',
			borderBottom: 'solid 1px black',
		},
		'& .description': {
			color: theme.palette.secondary.light,
		},
		'& .icon': {
			display: 'flex',
			fontSize: '8px',
			color: theme.palette.secondary.light,
			'& img': {
				height: '1rem',
				width: '1rem',
				marginRight: '0.5rem',
			},
			'& p': {
				overflow: 'hidden',
				textOverflow: 'ellipsis',
			},
		},
	},
	'& img': {
		width: '30%',
		objectFit: 'cover',
		objectPosition: 'center',
		borderRadius: '0 0.5em 0.5em 0',
		[theme.breakpoints.down('sm')]: {
			height: '15em',
			width: '100%',
			borderRadius: '0.5em 0.5em 0 0',
		},
	},
}));

const StyledLiveBlock = styled('a')(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	flexGrow: 1,
	color: theme.palette.common.white,
	borderRadius: '0.5em',
	padding: '1em',
}));

const PreviewLink = (props: {
	url: string;
	title: string;
	description: string;
	image: string;
	icon?: string;
}) => {
	const { url, title, description, image, icon } = props;

	return (
		<StyledPreview href={url} target="_blank" rel="noopener noreferrer">
			<img src={image} alt={title} />
			<div className="content">
				<div className="title">{title}</div>
				<div className="description">{description}</div>
				<div className="icon">
					{icon ? <img src={icon} alt="icon" /> : null}
					<p>{url}</p>
				</div>
			</div>
		</StyledPreview>
	);
};

const LiveBlock = (props: { url: string; label: string; color: string }) => {
	const { url, label, color } = props;

	return (
		<StyledLiveBlock
			href={url}
			sx={{ background: color }}
			target="_blank"
			rel="noopener noreferrer"
		>
			<H1 sx={{ fontWeight: 'bold' }}>{label}</H1>
		</StyledLiveBlock>
	);
};

export default function Links() {
	return (
		<PageContainer>
			<Head>
				<title>{`${APP_NAME} | 外部連結`}</title>
			</Head>

			<H1 sx={{ fontWeight: 'bold' }}>{'外部連結'}</H1>
			<LinksSection>
				<H2>{'官方連結'}</H2>
				<PreviewContainer>
					<PreviewLink
						url={'https://www.megaportfest.com/index.php'}
						image={
							'https://megaportfest.com/wp-content/uploads/2021/12/title-lineup.png'
						}
						title={'大港開唱 官方網站'}
						description={`即將邁入第十三屆的《大港開唱》，是每年於高雄舉辦的大型音樂祭典，近年已是台灣最具指標性的大型戶外音樂祭活動。2022大港開唱即將再度開催，3/26－27日於高雄駁二藝術特區，不見不散！`}
						icon={'http://formoz.com/megaport/icon2.ico'}
					/>
				</PreviewContainer>
			</LinksSection>
			<LinksSection>
				<H2>{'LINE TODAY 直播'}</H2>
				<PreviewContainer>
					<PreviewLink
						url={
							'https://today.line.me/tw/v2/page/TOPIC-Megaportw?fbclid=IwAR2Cmpo7ci6jxfnfP4lpXIyohDo8Qaq8FH6G1qOXC3kbcvcnPBfR8Gwh2ac'
						}
						image={
							'https://obs.line-scdn.net/0haK0mwc_DPmQNFCozQCBBM1tCPQs-eC1naSJvZ056YwB1JSk7NCZtAigUaEglIH0wLXomVi4IZlUgd3w0NiV3VS8UYFx1JXA6NHY0A38TMlMmIHs/w1200'
						}
						title={'2022 大港開唱 | LINE TODAY'}
						description={`一年一度的台灣音樂盛事「大港開唱」即將在3/26、3/27於高雄駁二藝術特區登場，多組獨家超強卡司，鎖定LINE TODAY直播，帶你臨場體驗最熱血的音樂祭！`}
						icon={'https://today.line.me/dist/9449bd8b/static/meta/icon64.ico'}
					/>
					<div style={{ display: 'flex', gap: '1em' }}>
						<LiveBlock
							url={'https://today.line.me/tw/v2/article/60ZoG16'}
							label={'南霸天'}
							color={palette.stage[0].main}
						/>
						<LiveBlock
							url={'https://today.line.me/tw/v2/article/LXOeRrM'}
							label={'女神龍'}
							color={palette.stage[2].main}
						/>
					</div>
				</PreviewContainer>
			</LinksSection>
			<LinksSection>
				<H2>{'其他文章'}</H2>
				<PreviewContainer>
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
					<PreviewLink
						url={
							'https://www.biosmonthly.com/article_list/389?utm_source=Facebook&utm_medium=Social&utm_campaign=Kaoshung&utm_term=TheMedium&utm_content=20220222'
						}
						image={
							'https://www.biosmonthly.com/storage/upload/article/article_classCoverPhoto_20220210125749_txe.jpeg'
						}
						title={'要 chill 高雄｜我把打開高雄夜生活的方法，都放在這裡了'}
						description={`南台灣水姑娘陳溫蒂 suckdidi、DJ 賴皮與小犬工作室的插畫家 Steffy 帶路，商圈美食、酒吧、鹽埕小吃，高雄夜晚三條景點路線，一網打盡。`}
						icon={'https://www.biosmonthly.com/assets/images/favicon.ico'}
					/>
				</PreviewContainer>
			</LinksSection>
			<a
				href="https://github.com/JosephT5566/musicFest"
				target="_blank"
				rel="noopener noreferrer"
			>
				<StyledGitHubIcon />
			</a>
		</PageContainer>
	);
}
