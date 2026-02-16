'use client';
import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { PageContainer } from 'components/base/Container';
import { H1, H2 } from 'components/base/Typography';
import { palette } from 'styles/palette';

const PreviewLink = (props: {
	url: string;
	title: string;
	description: string;
	image: string;
	icon?: string;
}) => {
	const { url, title, description, image, icon } = props;

	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className="min-h-[10em] w-full flex flex-col sm:flex-row-reverse justify-between text-secondary-main bg-paper rounded-md no-underline"
		>
			<img
				src={image}
				alt={title}
				className="w-full sm:w-[30%] object-cover object-center rounded-t-md sm:rounded-none sm:rounded-r-md h-[15em] sm:h-auto"
			/>
			<div className="content max-w-full sm:max-w-[70%] flex flex-col justify-between gap-2 p-4 rounded-b-md sm:rounded-none sm:rounded-l-md">
				<div className="title text-lg font-bold pb-2 border-b border-black">{title}</div>
				<div className="description text-secondary-light">{description}</div>
				<div className="icon flex text-xs text-secondary-light">
					{icon ? <img src={icon} alt="icon" className="h-4 w-4 mr-2" /> : null}
					<p className="overflow-hidden text-ellipsis">{url}</p>
				</div>
			</div>
		</a>
	);
};

const LiveBlock = (props: { url: string; label: string; color: string }) => {
	const { url, label, color } = props;

	return (
		<a
			href={url}
			className="flex justify-center flex-grow text-white rounded-md p-4 font-bold text-h1"
			style={{ backgroundColor: color }}
			target="_blank"
			rel="noopener noreferrer"
		>
			{label}
		</a>
	);
};

export default function Links() {
	return (
		<PageContainer>
			<H1 className="font-bold">{'外部連結'}</H1>
			<div
				className="w-full pb-4 mb-4 border-b border-background-paper lg:px-40"
			>
				<H2>{'官方連結'}</H2>
				<div className="flex flex-col gap-4">
					<PreviewLink
						url={'https://www.megaportfest.com/index.php'}
						image={
							'https://megaportfest.com/wp-content/uploads/2021/12/title-lineup.png'
						}
						title={'大港開唱 官方網站'}
						description={`即將邁入第十三屆的《大港開唱》，是每年於高雄舉辦的大型音樂祭典，近年已是台灣最具指標性的大型戶外音樂祭活動。2022大港開唱即將再度開催，3/26－27日於高雄駁二藝術特區，不見不散！`}
						icon={'http://formoz.com/megaport/icon2.ico'}
					/>
				</div>
			</div>
			<div
				className="w-full pb-4 mb-4 border-b border-background-paper lg:px-40"
			>
				<H2>{'LINE TODAY 直播'}</H2>
				<div className="flex flex-col gap-4">
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
					<div className="flex gap-4">
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
				</div>
			</div>
			<div
				className="w-full pb-4 mb-4 border-b border-background-paper lg:px-40"
			>
				<H2>{'其他文章'}</H2>
				<div className="flex flex-col gap-4">
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
							'https://www.biosmonthly.com/article_list/389?utm_source=Facebook&utm_medium=Social&utm_medium=Social&utm_campaign=Kaoshung&utm_term=TheMedium&utm_content=20220222'
						}
						image={
							'https://www.biosmonthly.com/storage/upload/article/article_classCoverPhoto_20220210125749_txe.jpeg'
						}
						title={'要 chill 高雄｜我把打開高雄夜生活的方法，都放在這裡了'}
						description={`南台灣水姑娘陳溫蒂 suckdidi、DJ 賴皮與小犬工作室的插畫家 Steffy 帶路，商圈美食、酒吧、鹽埕小吃，高雄夜晚三條景點路線，一網打盡。`}
						icon={'https://www.biosmonthly.com/assets/images/favicon.ico'}
					/>
				</div>
			</div>
			<a
				href="https://github.com/JosephT5566/musicFest"
				target="_blank"
				rel="noopener noreferrer"
			>
				<FaGithub className="text-primary-main" />
			</a>
		</PageContainer>
	);
}
