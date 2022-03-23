import { IArtist, IPerfDay, IProgramList } from 'types/show';

const day1: IPerfDay = {
	dayStartTime: '2022-03-26T11:30',
	dayEndTime: '2022-03-26T22:10',
	stages: [
		{
			name: '南霸天',
			artists: [
				new IArtist({
					id: '0:0:0',
					name: 'Empty ORio',
					startTime: '2022-03-26T12:20',
					endTime: '2022-03-26T13:00',
				}),
				new IArtist({
					id: '0:0:1',
					name: '閃閃閃閃',
					startTime: '2022-03-26T13:40',
					endTime: '2022-03-26T14:20',
				}),
				new IArtist({
					id: '0:0:2',
					name: '非人物種',
					startTime: '2022-03-26T15:00',
					endTime: '2022-03-26T15:40',
				}),
				new IArtist({
					id: '0:0:3',
					name: '大象體操 ft.9m88',
					startTime: '2022-03-26T16:20',
					endTime: '2022-03-26T17:10',
				}),
				new IArtist({
					id: '0:0:4',
					name: '大嘻哈時代 ALL STAR',
					startTime: '2022-03-26T17:50',
					endTime: '2022-03-26T18:30',
				}),
				new IArtist({
					id: '0:0:5',
					name: '滅火器 ft.楊烈',
					startTime: '2022-03-26T19:30',
					endTime: '2022-03-26T20:20',
				}),
				new IArtist({
					id: '0:0:6',
					name: '血肉果汁機 ft.炎亞綸',
					startTime: '2022-03-26T21:10',
					endTime: '2022-03-26T22:00',
				}),
			],
		},
		{
			name: '海龍王',
			artists: [
				new IArtist({
					id: '0:1:0',
					name: '麥琪麥琪',
					startTime: '2022-03-26T12:40',
					endTime: '2022-03-26T13:20',
				}),
				new IArtist({
					id: '0:1:1',
					name: '體熊專科',
					startTime: '2022-03-26T14:00',
					endTime: '2022-03-26T14:40',
				}),
				new IArtist({
					id: '0:1:2',
					name: '溫室雜草',
					startTime: '2022-03-26T15:20',
					endTime: '2022-03-26T16:00',
				}),
				new IArtist({
					id: '0:1:3',
					name: 'INFERNAL CHAOS',
					startTime: '2022-03-26T16:40',
					endTime: '2022-03-26T17:20',
				}),
				new IArtist({
					id: '0:1:4',
					name: '昏鴉',
					startTime: '2022-03-26T18:00',
					endTime: '2022-03-26T18:40',
				}),
				new IArtist({
					id: '0:1:5',
					name: 'OVDS',
					startTime: '2022-03-26T19:20',
					endTime: '2022-03-26T20:00',
				}),
				new IArtist({
					id: '0:1:6',
					name: '聲子蟲',
					startTime: '2022-03-26T20:40',
					endTime: '2022-03-26T21:20',
				}),
			],
		},
		{
			name: '女神龍',
			artists: [
				new IArtist({
					id: '0:2:0',
					name: '百合花 ft.張藝',
					startTime: '2022-03-26T11:30',
					endTime: '2022-03-26T12:20',
				}),
				new IArtist({
					id: '0:2:1',
					name: '淺堤',
					startTime: '2022-03-26T13:00',
					endTime: '2022-03-26T13:40',
				}),
				new IArtist({
					id: '0:2:2',
					name: '康士坦的變化球',
					startTime: '2022-03-26T14:20',
					endTime: '2022-03-26T15:00',
				}),
				new IArtist({
					id: '0:2:3',
					name: '陳惠婷',
					startTime: '2022-03-26T15:40',
					endTime: '2022-03-26T16:20',
				}),
				new IArtist({
					id: '0:2:4',
					name: 'Suming舒米恩',
					startTime: '2022-03-26T17:10',
					endTime: '2022-03-26T17:50',
				}),
				new IArtist({
					id: '0:2:5',
					name: '毀容姐妹會 ft.蔡閨',
					startTime: '2022-03-26T18:30',
					endTime: '2022-03-26T19:20',
				}),
				new IArtist({
					id: '0:2:6',
					name: '旺福 ft.李千那',
					startTime: '2022-03-26T20:10',
					endTime: '2022-03-26T21:00',
				}),
			],
		},
		{
			name: '卡魔麥',
			artists: [
				new IArtist({
					id: '0:3:0',
					name: 'Mong Tong',
					startTime: '2022-03-26T11:50',
					endTime: '2022-03-26T12:30',
				}),
				new IArtist({
					id: '0:3:1',
					name: 'LÜCY',
					startTime: '2022-03-26T13:20',
					endTime: '2022-03-26T14:00',
				}),
				new IArtist({
					id: '0:3:2',
					name: '問題總部',
					startTime: '2022-03-26T14:40',
					endTime: '2022-03-26T15:20',
				}),
				new IArtist({
					id: '0:3:3',
					name: 'Crispy脆樂團',
					startTime: '2022-03-26T16:00',
					endTime: '2022-03-26T16:40',
				}),
				new IArtist({
					id: '0:3:4',
					name: '春麵樂隊',
					startTime: '2022-03-26T17:20',
					endTime: '2022-03-26T18:00',
				}),
				new IArtist({
					id: '0:3:5',
					name: '雷擎',
					startTime: '2022-03-26T18:50',
					endTime: '2022-03-26T19:30',
				}),
				new IArtist({
					id: '0:3:6',
					name: '守夜人',
					startTime: '2022-03-26T20:10',
					endTime: '2022-03-26T20:50',
				}),
			],
		},
		{
			name: '出頭天',
			artists: [
				new IArtist({
					id: '0:4:0',
					name: '烏流',
					startTime: '2022-03-26T13:00',
					endTime: '2022-03-26T13:40',
				}),
				new IArtist({
					id: '0:4:1',
					name: '絕命青年',
					startTime: '2022-03-26T14:20',
					endTime: '2022-03-26T15:00',
				}),
				new IArtist({
					id: '0:4:2',
					name: '蘇明淵',
					startTime: '2022-03-26T15:40',
					endTime: '2022-03-26T16:20',
				}),
				new IArtist({
					id: '0:4:3',
					name: 'PUZZLEMAN',
					startTime: '2022-03-26T17:10',
					endTime: '2022-03-26T17:50',
				}),
			],
		},
		{
			name: '海波浪',
			artists: [
				new IArtist({
					id: '0:5:0',
					name: 'MassMan',
					startTime: '2022-03-26T13:10',
					endTime: '2022-03-26T13:50',
				}),
				new IArtist({
					id: '0:5:1',
					name: '島國未來主義',
					startTime: '2022-03-26T14:30',
					endTime: '2022-03-26T15:10',
				}),
				new IArtist({
					id: '0:5:2',
					name: '孩子王',
					startTime: '2022-03-26T15:50',
					endTime: '2022-03-26T16:30',
				}),
				new IArtist({
					id: '0:5:3',
					name: 'EMERGING FROM THE COCOON 破繭而出',
					startTime: '2022-03-26T17:10',
					endTime: '2022-03-26T17:50',
				}),
				new IArtist({
					id: '0:5:4',
					name: '恐龍的皮',
					startTime: '2022-03-26T18:30',
					endTime: '2022-03-26T19:10',
				}),
				new IArtist({
					id: '0:5:5',
					name: '火燒島',
					startTime: '2022-03-26T19:50',
					endTime: '2022-03-26T20:30',
				}),
			],
		},
		{
			name: '大雄丸',
			artists: [
				new IArtist({
					id: '0:6:0',
					name: 'Multiverse ft.Ku da Yeast',
					startTime: '2022-03-26T13:00',
					endTime: '2022-03-26T14:00',
				}),
				new IArtist({
					id: '0:6:1',
					name: '呂士軒 ft.LINION',
					startTime: '2022-03-26T15:00',
					endTime: '2022-03-26T16:00',
				}),
				new IArtist({
					id: '0:6:2',
					name: '恩熙俊 ft.美麗本人',
					startTime: '2022-03-26T17:00',
					endTime: '2022-03-26T18:00',
				}),
			],
		},
		{
			name: '藍寶石',
			artists: [
				new IArtist({
					id: '0:7:0',
					name: '漫才少爺',
					startTime: '2022-03-26T13:40',
					endTime: '2022-03-26T14:20',
				}),
				new IArtist({
					id: '0:7:1',
					name: '凱莉 x 黃豪平',
					startTime: '2022-03-26T15:00',
					endTime: '2022-03-26T15:40',
				}),
				new IArtist({
					id: '0:7:2',
					name: '黑狼 龍虎鮑翅 那卡西',
					startTime: '2022-03-26T16:20',
					endTime: '2022-03-26T17:00',
				}),
			],
		},
		{
			name: '青春夢',
			artists: [
				new IArtist({
					id: '0:8:0',
					name: '潮流新聲 Live Podcast 鄭宜農',
					startTime: '2022-03-26T14:00',
					endTime: '2022-03-26T14:40',
				}),
				new IArtist({
					id: '0:8:1',
					name: 'Codie',
					startTime: '2022-03-26T15:20',
					endTime: '2022-03-26T16:00',
				}),
				new IArtist({
					id: '0:8:2',
					name: '看日早晚',
					startTime: '2022-03-26T16:40',
					endTime: '2022-03-26T17:20',
				}),
				new IArtist({
					id: '0:8:3',
					name: '吳獻Osean',
					startTime: '2022-03-26T18:00',
					endTime: '2022-03-26T18:40',
				}),
			],
		},
		{
			name: '小港祭',
			artists: [
				new IArtist({
					id: '0:9:0',
					name: 'DJ DIN DIN',
					startTime: '2022-03-26T15:20',
					endTime: '2022-03-26T16:20',
				}),
				new IArtist({
					id: '0:9:1',
					name: 'DJ YU',
					startTime: '2022-03-26T16:20',
					endTime: '2022-03-26T17:20',
				}),
				new IArtist({
					id: '0:9:2',
					name: 'DJ ROMAN',
					startTime: '2022-03-26T17:20',
					endTime: '2022-03-26T18:20',
				}),
				new IArtist({
					id: '0:9:3',
					name: 'DJ Mykal a.k.a 林哲儀',
					startTime: '2022-03-26T18:20',
					endTime: '2022-03-26T19:20',
				}),
			],
		},
	],
};

const day2: IPerfDay = {
	dayStartTime: '2022-03-27T11:30',
	dayEndTime: '2022-03-27T22:00',
	stages: [
		{
			name: '南霸天',
			artists: [
				new IArtist({
					id: '1:0:0',
					name: 'OBSESS',
					startTime: '2022-03-27T12:20',
					endTime: '2022-03-27T13:00',
				}),
				new IArtist({
					id: '1:0:1',
					name: '潮州土狗+禁藥王&栗子',
					startTime: '2022-03-27T13:40',
					endTime: '2022-03-27T14:20',
				}),
				new IArtist({
					id: '1:0:2',
					name: '壞特?te',
					startTime: '2022-03-27T15:00',
					endTime: '2022-03-27T15:40',
				}),
				new IArtist({
					id: '1:0:3',
					name: '傷心欲絕',
					startTime: '2022-03-27T16:30',
					endTime: '2022-03-27T17:10',
				}),
				new IArtist({
					id: '1:0:4',
					name: '宇宙人 ft.Vivian 蔡昌憲',
					startTime: '2022-03-27T17:50',
					endTime: '2022-03-27T18:40',
				}),
				new IArtist({
					id: '1:0:5',
					name: '拍謝少年',
					startTime: '2022-03-27T19:20',
					endTime: '2022-03-27T20:00',
				}),
				new IArtist({
					id: '1:0:6',
					name: '美秀集團 ft.盧廣仲',
					startTime: '2022-03-27T21:00',
					endTime: '2022-03-27T21:50',
				}),
			],
		},
		{
			name: '海龍王',
			artists: [
				new IArtist({
					id: '1:1:0',
					name: '荷爾蒙少年',
					startTime: '2022-03-27T12:40',
					endTime: '2022-03-27T13:20',
				}),
				new IArtist({
					id: '1:1:1',
					name: '尋人啟事',
					startTime: '2022-03-27T14:00',
					endTime: '2022-03-27T14:40',
				}),
				new IArtist({
					id: '1:1:2',
					name: '李權哲',
					startTime: '2022-03-27T15:20',
					endTime: '2022-03-27T16:00',
				}),
				new IArtist({
					id: '1:1:3',
					name: '「絕代風華人生無碼限定」盧律銘電影配樂Live set',
					startTime: '2022-03-27T16:40',
					endTime: '2022-03-27T17:20',
				}),
				new IArtist({
					id: '1:1:4',
					name: 'Beyond Cure',
					startTime: '2022-03-27T18:00',
					endTime: '2022-03-27T18:40',
				}),
				new IArtist({
					id: '1:1:5',
					name: '海豚刑警',
					startTime: '2022-03-27T19:20',
					endTime: '2022-03-27T20:00',
				}),
				new IArtist({
					id: '1:1:6',
					name: '無妄合作社',
					startTime: '2022-03-27T20:40',
					endTime: '2022-03-27T21:20',
				}),
			],
		},
		{
			name: '女神龍',
			artists: [
				new IArtist({
					id: '1:2:0',
					name: 'Vast & Hazy',
					startTime: '2022-03-27T11:40',
					endTime: '2022-03-27T12:20',
				}),
				new IArtist({
					id: '1:2:1',
					name: '五五身',
					startTime: '2022-03-27T13:00',
					endTime: '2022-03-27T13:40',
				}),
				new IArtist({
					id: '1:2:2',
					name: '老王樂隊',
					startTime: '2022-03-27T14:20',
					endTime: '2022-03-27T15:00',
				}),
				new IArtist({
					id: '1:2:3',
					name: '黃玠',
					startTime: '2022-03-27T15:40',
					endTime: '2022-03-27T16:20',
				}),
				new IArtist({
					id: '1:2:4',
					name: '草屯囝仔 ft.曹雅雯',
					startTime: '2022-03-27T17:00',
					endTime: '2022-03-27T17:50',
				}),
				new IArtist({
					id: '1:2:5',
					name: '鄭宜農',
					startTime: '2022-03-27T18:50',
					endTime: '2022-03-27T19:30',
				}),
				new IArtist({
					id: '1:2:6',
					name: 'Kimberley陳芳語 ft.大支',
					startTime: '2022-03-27T20:10',
					endTime: '2022-03-27T21:00',
				}),
			],
		},
		{
			name: '卡魔麥',
			artists: [
				new IArtist({
					id: '1:3:0',
					name: '一點生',
					startTime: '2022-03-27T11:50',
					endTime: '2022-03-27T12:30',
				}),
				new IArtist({
					id: '1:3:1',
					name: '必順鄉村',
					startTime: '2022-03-27T13:30',
					endTime: '2022-03-27T14:00',
				}),
				new IArtist({
					id: '1:3:2',
					name: 'COLD DEW',
					startTime: '2022-03-27T14:40',
					endTime: '2022-03-27T15:20',
				}),
				new IArtist({
					id: '1:3:3',
					name: '葛西瓦',
					startTime: '2022-03-27T16:00',
					endTime: '2022-03-27T16:40',
				}),
				new IArtist({
					id: '1:3:4',
					name: 'icyball 冰球樂團',
					startTime: '2022-03-27T17:20',
					endTime: '2022-03-27T18:00',
				}),
				new IArtist({
					id: '1:3:5',
					name: '溫蒂漫步',
					startTime: '2022-03-27T18:40',
					endTime: '2022-03-27T19:20',
				}),
				new IArtist({
					id: '1:3:6',
					name: '大嘻哈時代 南部囝仔',
					startTime: '2022-03-27T20:00',
					endTime: '2022-03-27T20:40',
				}),
			],
		},
		{
			name: '出頭天',
			artists: [
				new IArtist({
					id: '1:4:0',
					name: 'Everydaze',
					startTime: '2022-03-27T13:00',
					endTime: '2022-03-27T13:40',
				}),
				new IArtist({
					id: '1:4:1',
					name: '黃宇寒',
					startTime: '2022-03-27T14:20',
					endTime: '2022-03-27T15:00',
				}),
				new IArtist({
					id: '1:4:2',
					name: 'Everfor',
					startTime: '2022-03-27T15:40',
					endTime: '2022-03-27T16:20',
				}),
				new IArtist({
					id: '1:4:3',
					name: 'blueburn',
					startTime: '2022-03-27T17:00',
					endTime: '2022-03-27T17:40',
				}),
			],
		},
		{
			name: '海波浪',
			artists: [
				new IArtist({
					id: '1:5:0',
					name: 'Greedy Black Hole',
					startTime: '2022-03-27T13:10',
					endTime: '2022-03-27T13:50',
				}),
				new IArtist({
					id: '1:5:1',
					name: '達摩樂隊',
					startTime: '2022-03-27T14:30',
					endTime: '2022-03-27T15:10',
				}),
				new IArtist({
					id: '1:5:2',
					name: '擊沈女孩',
					startTime: '2022-03-27T15:50',
					endTime: '2022-03-27T16:30',
				}),
				new IArtist({
					id: '1:5:3',
					name: '恕 ft.阿兄喬治',
					startTime: '2022-03-27T17:10',
					endTime: '2022-03-27T17:50',
				}),
				new IArtist({
					id: '1:5:4',
					name: '宋柏瑋',
					startTime: '2022-03-27T18:40',
					endTime: '2022-03-27T19:10',
				}),
				new IArtist({
					id: '1:5:5',
					name: 'A Piece of Cake 256',
					startTime: '2022-03-27T19:50',
					endTime: '2022-03-27T20:30',
				}),
			],
		},
		{
			name: '大雄丸',
			artists: [
				new IArtist({
					id: '1:6:0',
					name: 'The Crane ft.LÜCY',
					startTime: '2022-03-27T13:00',
					endTime: '2022-03-27T14:00',
				}),
				new IArtist({
					id: '1:6:1',
					name: 'Freddy林昶佐&黃蓉 ft.魁剛',
					startTime: '2022-03-27T15:00',
					endTime: '2022-03-27T16:00',
				}),
				new IArtist({
					id: '1:6:2',
					name: '小咪與石孝倫的哥哥',
					startTime: '2022-03-27T17:00',
					endTime: '2022-03-27T18:00',
				}),
			],
		},
		{
			name: '藍寶石',
			artists: [
				new IArtist({
					id: '1:7:0',
					name: 'CANDY☆STAR',
					startTime: '2022-03-27T13:40',
					endTime: '2022-03-27T14:20',
				}),
				new IArtist({
					id: '1:7:1',
					name: '品賢 x 歐K',
					startTime: '2022-03-27T15:00',
					endTime: '2022-03-27T15:40',
				}),
				new IArtist({
					id: '1:7:2',
					name: '義興閣掌中劇團',
					startTime: '2022-03-27T16:20',
					endTime: '2022-03-27T17:00',
				}),
			],
		},
		{
			name: '青春夢',
			artists: [
				new IArtist({
					id: '1:8:0',
					name: '薛詒丹 ft.Ponay的原式cover',
					startTime: '2022-03-27T14:00',
					endTime: '2022-03-27T14:40',
				}),
				new IArtist({
					id: '1:8:1',
					name: `MoonD'shake`,
					startTime: '2022-03-27T15:20',
					endTime: '2022-03-27T16:00',
				}),
				new IArtist({
					id: '1:8:2',
					name: 'hue',
					startTime: '2022-03-27T16:40',
					endTime: '2022-03-27T17:20',
				}),
				new IArtist({
					id: '1:8:3',
					name: '露波合唱團',
					startTime: '2022-03-27T18:00',
					endTime: '2022-03-27T18:40',
				}),
			],
		},
		{
			name: '小港祭',
			artists: [
				new IArtist({
					id: '1:9:0',
					name: 'DJ TAKA',
					startTime: '2022-03-27T15:20',
					endTime: '2022-03-27T16:20',
				}),
				new IArtist({
					id: '1:9:1',
					name: 'DJ AFURO GEORGE',
					startTime: '2022-03-27T16:20',
					endTime: '2022-03-27T17:20',
				}),
				new IArtist({
					id: '1:9:2',
					name: '國語作業簿: AUTO TUNE K歌大會',
					startTime: '2022-03-27T17:20',
					endTime: '2022-03-27T17:50',
				}),
				new IArtist({
					id: '1:9:3',
					name: 'DJ Mr. SKIN',
					startTime: '2022-03-27T17:50',
					endTime: '2022-03-27T19:20',
				}),
			],
		},
	],
};

const programList: IProgramList = {
	perfDays: [day1, day2],
};

export default programList;
