import { IArtist, IPerfDay, IProgramList } from 'types/show';

const day1: IPerfDay = {
	stages: [
		{
			name: '南霸天',
			artists: [
				new IArtist({
					id: '0:0:0',
					name: 'INFERNAL CHAOS',
					startTime: '2021-03-27T12:20',
					endTime: '2021-03-27T13:00',
				}),
				new IArtist({
					id: '0:0:1',
					name: '康士坦的變化球',
					startTime: '2021-03-27T13:40',
					endTime: '2021-03-27T14:20',
				}),
				new IArtist({
					id: '0:0:2',
					name: '拍謝少年',
					startTime: '2021-03-27T15:00',
					endTime: '2021-03-27T15:40',
				}),
				new IArtist({
					id: '0:0:3',
					name: '羅時豐 ft.法蘭',
					startTime: '2021-03-27T16:20',
					endTime: '2021-03-27T17:00',
				}),
				new IArtist({
					id: '0:0:4',
					name: '血肉果汁機 ft.美麗本人',
					startTime: '2021-03-27T17:40',
					endTime: '2021-03-27T18:20',
				}),
				new IArtist({
					id: '0:0:5',
					name: 'Leo王',
					startTime: '2021-03-27T19:00',
					endTime: '2021-03-27T19:40',
				}),
				new IArtist({
					id: '0:0:6',
					name: '閃靈 ft.唐鳳',
					startTime: '2021-03-27T20:40',
					endTime: '2021-03-27T21:20',
				}),
			],
		},
		{
			name: '海龍王',
			artists: [
				new IArtist({
					id: '0:1:0',
					name: '落差草原WWWW',
					startTime: '2021-03-27T14:00',
					endTime: '2021-03-27T14:40',
				}),
				new IArtist({
					id: '0:1:1',
					name: '持修',
					startTime: '2021-03-27T15:20',
					endTime: '2021-03-27T16:00',
				}),
				new IArtist({
					id: '0:1:2',
					name: '春豔',
					startTime: '2021-03-27T16:40',
					endTime: '2021-03-27T17:20',
				}),
				new IArtist({
					id: '0:1:3',
					name: '鼓鼓 呂思緯 ft.老王(Green! Eyes)',
					startTime: '2021-03-27T18:00',
					endTime: '2021-03-27T18:40',
				}),
				new IArtist({
					id: '0:1:4',
					name: '台灣雅典娜 與她的 黃金聖鬥士 (Empty ORio + punkhoo胖虎)',
					startTime: '2021-03-27T19:40',
					endTime: '2021-03-27T21:00',
				}),
			],
		},
		{
			name: '女神龍',
			artists: [
				new IArtist({
					id: '0:2:0',
					name: '厭世少年',
					startTime: '2021-03-27T11:40',
					endTime: '2021-03-27T12:20',
				}),
				new IArtist({
					id: '0:2:1',
					name: '隨性',
					startTime: '2021-03-27T13:00',
					endTime: '2021-03-27T13:40',
				}),
				new IArtist({
					id: '0:2:2',
					name: '董事長樂團 ft.Lulu 黃路梓茵',
					startTime: '2021-03-27T14:20',
					endTime: '2021-03-27T15:00',
				}),
				new IArtist({
					id: '0:2:3',
					name: 'Beyond Cure ft.Ru味春捲',
					startTime: '2021-03-27T15:40',
					endTime: '2021-03-27T16:20',
				}),
				new IArtist({
					id: '0:2:4',
					name: '來吧!焙焙!',
					startTime: '2021-03-27T17:00',
					endTime: '2021-03-27T17:40',
				}),
				new IArtist({
					id: '0:2:5',
					name: '告五人',
					startTime: '2021-03-27T18:20',
					endTime: '2021-03-27T19:00',
				}),
				new IArtist({
					id: '0:2:6',
					name: 'Tizzy Bac',
					startTime: '2021-03-27T19:40',
					endTime: '2021-03-27T20:20',
				}),
			],
		},
		{
			name: '卡魔麥',
			artists: [
				new IArtist({
					id: '0:3:0',
					name: '一點生',
					startTime: '2021-03-27T12:10',
					endTime: '2021-03-27T12:50',
				}),
				new IArtist({
					id: '0:3:1',
					name: 'JADE',
					startTime: '2021-03-27T13:30',
					endTime: '2021-03-27T14:10',
				}),
				new IArtist({
					id: '0:3:2',
					name: 'Easy Shen Gang ft.周穆',
					startTime: '2021-03-27T14:50',
					endTime: '2021-03-27T15:30',
				}),
				new IArtist({
					id: '0:3:3',
					name: '2HRs',
					startTime: '2021-03-27T16:10',
					endTime: '2021-03-27T16:50',
				}),
				new IArtist({
					id: '0:3:4',
					name: 'LINION',
					startTime: '2021-03-27T17:30',
					endTime: '2021-03-27T18:10',
				}),
				new IArtist({
					id: '0:3:5',
					name: '昆蟲白',
					startTime: '2021-03-27T18:50',
					endTime: '2021-03-27T19:30',
				}),
				new IArtist({
					id: '0:3:6',
					name: 'Green!Eyes',
					startTime: '2021-03-27T20:10',
					endTime: '2021-03-27T20:50',
				}),
			],
		},
		{
			name: '出頭天',
			artists: [
				new IArtist({
					id: '0:4:0',
					name: '水源',
					startTime: '2021-03-27T12:40',
					endTime: '2021-03-27T13:20',
				}),
				new IArtist({
					id: '0:4:1',
					name: '緩緩',
					startTime: '2021-03-27T14:00',
					endTime: '2021-03-27T14:40',
				}),
				new IArtist({
					id: '0:4:2',
					name: 'The Tic Tac',
					startTime: '2021-03-27T15:20',
					endTime: '2021-03-27T16:00',
				}),
				new IArtist({
					id: '0:4:3',
					name: '柯泯薰',
					startTime: '2021-03-27T16:40',
					endTime: '2021-03-27T17:20',
				}),
			],
		},
		{
			name: '海波浪',
			artists: [
				new IArtist({
					id: '0:5:0',
					name: 'My Cat Eats My Hand',
					startTime: '2021-03-27T11:40',
					endTime: '2021-03-27T12:20',
				}),
				new IArtist({
					id: '0:5:1',
					name: '孩子王',
					startTime: '2021-03-27T13:00',
					endTime: '2021-03-27T13:40',
				}),
				new IArtist({
					id: '0:5:2',
					name: '萬隆',
					startTime: '2021-03-27T14:20',
					endTime: '2021-03-27T15:00',
				}),
				new IArtist({
					id: '0:5:3',
					name: '百合花',
					startTime: '2021-03-27T15:40',
					endTime: '2021-03-27T16:20',
				}),
				new IArtist({
					id: '0:5:4',
					name: '必順鄉村',
					startTime: '2021-03-27T17:00',
					endTime: '2021-03-27T17:40',
				}),
				new IArtist({
					id: '0:5:5',
					name: '熱寫生',
					startTime: '2021-03-27T18:20',
					endTime: '2021-03-27T19:00',
				}),
				new IArtist({
					id: '0:5:6',
					name: '當代電影大師',
					startTime: '2021-03-27T19:40',
					endTime: '2021-03-27T20:20',
				}),
			],
		},
		{
			name: '大雄丸',
			artists: [
				new IArtist({
					id: '0:6:0',
					name: '台北♡紐約 (Mia ft.9m88)',
					startTime: '2021-03-27T13:00',
					endTime: '2021-03-27T14:00',
				}),
				new IArtist({
					id: '0:6:1',
					name: 'Marz23 ft.DJ GROUND',
					startTime: '2021-03-27T15:00',
					endTime: '2021-03-27T16:00',
				}),
				new IArtist({
					id: '0:6:2',
					name: '台北柯公子 (家洋 ft.震東)',
					startTime: '2021-03-27T17:00',
					endTime: '2021-03-27T18:00',
				}),
			],
		},
		{
			name: '藍寶石',
			artists: [
				new IArtist({
					id: '0:7:0',
					name: '毀容姐妹會',
					startTime: '2021-03-27T13:40',
					endTime: '2021-03-27T14:20',
				}),
				new IArtist({
					id: '0:7:1',
					name: '開樂亭凡笑',
					startTime: '2021-03-27T15:00',
					endTime: '2021-03-27T15:40',
				}),
				new IArtist({
					id: '0:7:2',
					name: '黃豪平 x 凱莉(百靈果)',
					startTime: '2021-03-27T16:20',
					endTime: '2021-03-27T17:00',
				}),
			],
		},
		{
			name: '青春夢',
			artists: [
				new IArtist({
					id: '0:8:0',
					name: '楊士弘',
					startTime: '2021-03-27T13:00',
					endTime: '2021-03-27T13:40',
				}),
				new IArtist({
					id: '0:8:1',
					name: 'MIND THE GAP',
					startTime: '2021-03-27T14:20',
					endTime: '2021-03-27T15:00',
				}),
				new IArtist({
					id: '0:8:2',
					name: '煙雨飄渺',
					startTime: '2021-03-27T15:40',
					endTime: '2021-03-27T16:20',
				}),
				new IArtist({
					id: '0:8:3',
					name: '青虫aoi',
					startTime: '2021-03-27T17:00',
					endTime: '2021-03-27T17:40',
				}),
			],
		},
		{
			name: '小港祭',
			artists: [
				new IArtist({
					id: '0:9:0',
					name: 'T.F.L',
					startTime: '2021-03-27T15:20',
					endTime: '2021-03-27T16:20',
				}),
				new IArtist({
					id: '0:9:1',
					name: '勝野武士',
					startTime: '2021-03-27T16:20',
					endTime: '2021-03-27T17:10',
				}),
				new IArtist({
					id: '0:9:2',
					name: '沈髒三',
					startTime: '2021-03-27T17:10',
					endTime: '2021-03-27T17:50',
				}),
				new IArtist({
					id: '0:9:3',
					name: 'Mr. Kloud ft. FunkyMo',
					startTime: '2021-03-27T17:50',
					endTime: '2021-03-27T19:20',
				}),
			],
		},
	],
};

const day2: IPerfDay = {
	stages: [
		{
			name: '南霸天',
			artists: [
				new IArtist({
					id: '1:0:0',
					name: '東京中央線',
					startTime: '2021-03-28T12:20',
					endTime: '2021-03-28T13:00',
				}),
				new IArtist({
					id: '1:0:1',
					name: '非人物種',
					startTime: '2021-03-28T13:40',
					endTime: '2021-03-28T14:20',
				}),
				new IArtist({
					id: '1:0:2',
					name: '傷心欲絕',
					startTime: '2021-03-28T15:00',
					endTime: '2021-03-28T15:40',
				}),
				new IArtist({
					id: '1:0:3',
					name: '美秀集團',
					startTime: '2021-03-28T16:20',
					endTime: '2021-03-28T17:00',
				}),
				new IArtist({
					id: '1:0:4',
					name: '麋先生 ft.Vivian 徐若瑄',
					startTime: '2021-03-28T17:50',
					endTime: '2021-03-28T18:50',
				}),
				new IArtist({
					id: '1:0:5',
					name: '滅火器',
					startTime: '2021-03-28T19:50',
					endTime: '2021-03-28T20:30',
				}),
				new IArtist({
					id: '1:0:6',
					name: '茄子蛋',
					startTime: '2021-03-28T21:10',
					endTime: '2021-03-28T21:50',
				}),
			],
		},
		{
			name: '海龍王',
			artists: [
				new IArtist({
					id: '1:1:0',
					name: 'OBSESS',
					startTime: '2021-03-28T12:40',
					endTime: '2021-03-28T13:20',
				}),
				new IArtist({
					id: '1:1:1',
					name: '五五身',
					startTime: '2021-03-28T14:00',
					endTime: '2021-03-28T14:40',
				}),
				new IArtist({
					id: '1:1:2',
					name: '風籟坊',
					startTime: '2021-03-28T15:20',
					endTime: '2021-03-28T16:00',
				}),
				new IArtist({
					id: '1:1:3',
					name: '聲子蟲',
					startTime: '2021-03-28T16:40',
					endTime: '2021-03-28T17:20',
				}),
				new IArtist({
					id: '1:1:4',
					name: 'The Fur',
					startTime: '2021-03-28T18:00',
					endTime: '2021-03-28T18:40',
				}),
				new IArtist({
					id: '1:1:5',
					name: 'FUTURE AFTER',
					startTime: '2021-03-28T19:20',
					endTime: '2021-03-28T20:00',
				}),
				new IArtist({
					id: '1:1:6',
					name: '陳珊妮 ft.呂士軒',
					startTime: '2021-03-28T20:40',
					endTime: '2021-03-28T21:20',
				}),
			],
		},
		{
			name: '女神龍',
			artists: [
				new IArtist({
					id: '1:2:0',
					name: '海豚刑警',
					startTime: '2021-03-28T11:40',
					endTime: '2021-03-28T12:20',
				}),
				new IArtist({
					id: '1:2:1',
					name: '阿飛西雅',
					startTime: '2021-03-28T13:00',
					endTime: '2021-03-28T13:40',
				}),
				new IArtist({
					id: '1:2:2',
					name: 'AKB48 Team TP ft.黃西田',
					startTime: '2021-03-28T14:20',
					endTime: '2021-03-28T15:00',
				}),
				new IArtist({
					id: '1:2:3',
					name: '大象體操 ft.高雄市管樂團',
					startTime: '2021-03-28T15:50',
					endTime: '2021-03-28T16:30',
				}),
				new IArtist({
					id: '1:2:4',
					name: '鄭宜農',
					startTime: '2021-03-28T17:20',
					endTime: '2021-03-28T18:00',
				}),
				new IArtist({
					id: '1:2:5',
					name: 'YELLOW',
					startTime: '2021-03-28T18:50',
					endTime: '2021-03-28T19:30',
				}),
				new IArtist({
					id: '1:2:6',
					name: '9m88 ft.奕碩',
					startTime: '2021-03-28T20:30',
					endTime: '2021-03-28T21:10',
				}),
			],
		},
		{
			name: '卡魔麥',
			artists: [
				new IArtist({
					id: '1:3:0',
					name: '謎路人',
					startTime: '2021-03-28T13:30',
					endTime: '2021-03-28T14:10',
				}),
				new IArtist({
					id: '1:3:1',
					name: '逃走鮑伯',
					startTime: '2021-03-28T14:50',
					endTime: '2021-03-28T15:30',
				}),
				new IArtist({
					id: '1:3:2',
					name: '林以樂',
					startTime: '2021-03-28T16:10',
					endTime: '2021-03-28T16:50',
				}),
				new IArtist({
					id: '1:3:3',
					name: 'Cresent Lament 恆月三途',
					startTime: '2021-03-28T17:30',
					endTime: '2021-03-28T18:10',
				}),
				new IArtist({
					id: '1:3:4',
					name: '吳柏蒼',
					startTime: '2021-03-28T18:50',
					endTime: '2021-03-28T19:30',
				}),
				new IArtist({
					id: '1:3:5',
					name: '莫宰羊',
					startTime: '2021-03-28T20:10',
					endTime: '2021-03-28T20:50',
				}),
			],
		},
		{
			name: '出頭天',
			artists: [
				new IArtist({
					id: '1:4:0',
					name: 'Yaway-Mawring 雅維.茉芮',
					startTime: '2021-03-28T12:40',
					endTime: '2021-03-28T13:20',
				}),
				new IArtist({
					id: '1:4:1',
					name: '南西肯恩',
					startTime: '2021-03-28T14:00',
					endTime: '2021-03-28T14:40',
				}),
				new IArtist({
					id: '1:4:2',
					name: '米莎與戇仔',
					startTime: '2021-03-28T15:20',
					endTime: '2021-03-28T16:00',
				}),
				new IArtist({
					id: '1:4:3',
					name: '黃子軒與山平快',
					startTime: '2021-03-28T16:40',
					endTime: '2021-03-28T17:20',
				}),
			],
		},
		{
			name: '海波浪',
			artists: [
				new IArtist({
					id: '1:5:0',
					name: 'Rain and Picture',
					startTime: '2021-03-28T11:40',
					endTime: '2021-03-28T12:20',
				}),
				new IArtist({
					id: '1:5:1',
					name: '麥琪麥琪',
					startTime: '2021-03-28T13:00',
					endTime: '2021-03-28T13:40',
				}),
				new IArtist({
					id: '1:5:2',
					name: '魚條',
					startTime: '2021-03-28T14:20',
					endTime: '2021-03-28T15:00',
				}),
				new IArtist({
					id: '1:5:3',
					name: 'Lazy Habits',
					startTime: '2021-03-28T15:40',
					endTime: '2021-03-28T16:20',
				}),
				new IArtist({
					id: '1:5:4',
					name: '彼岸曙光',
					startTime: '2021-03-28T17:00',
					endTime: '2021-03-28T17:40',
				}),
				new IArtist({
					id: '1:5:5',
					name: '眠腦',
					startTime: '2021-03-28T18:20',
					endTime: '2021-03-28T19:00',
				}),
				new IArtist({
					id: '1:5:6',
					name: '倒車入庫',
					startTime: '2021-03-28T19:40',
					endTime: '2021-03-28T20:20',
				}),
			],
		},
		{
			name: '大雄丸',
			artists: [
				new IArtist({
					id: '1:6:0',
					name: '台灣通勤第一品牌',
					startTime: '2021-03-28T13:00',
					endTime: '2021-03-28T14:00',
				}),
				new IArtist({
					id: '1:6:1',
					name: 'YALLOW 黃宣 ft. Ku da Yeast',
					startTime: '2021-03-28T15:00',
					endTime: '2021-03-28T16:00',
				}),
				new IArtist({
					id: '1:6:2',
					name: '國國 ft. 喬瑟夫ChillSeph',
					startTime: '2021-03-28T17:00',
					endTime: '2021-03-28T18:00',
				}),
			],
		},
		{
			name: '藍寶石',
			artists: [
				new IArtist({
					id: '1:7:0',
					name: 'Ponay的原式Cover',
					startTime: '2021-03-28T13:40',
					endTime: '2021-03-28T14:20',
				}),
				new IArtist({
					id: '1:7:1',
					name: '東區德 x RayRay',
					startTime: '2021-03-28T15:00',
					endTime: '2021-03-28T15:40',
				}),
				new IArtist({
					id: '1:7:2',
					name: '黑狼 遠看像朵花 那卡西',
					startTime: '2021-03-28T16:20',
					endTime: '2021-03-28T17:00',
				}),
			],
		},
		{
			name: '青春夢',
			artists: [
				new IArtist({
					id: '1:8:0',
					name: '吾橋有水',
					startTime: '2021-03-28T13:00',
					endTime: '2021-03-28T13:40',
				}),
				new IArtist({
					id: '1:8:1',
					name: '白鐵仔',
					startTime: '2021-03-28T14:20',
					endTime: '2021-03-28T15:00',
				}),
				new IArtist({
					id: '1:8:2',
					name: 'Dudu King & 萬能麥斯',
					startTime: '2021-03-28T15:40',
					endTime: '2021-03-28T16:20',
				}),
				new IArtist({
					id: '1:8:3',
					name: 'TOBE',
					startTime: '2021-03-28T17:00',
					endTime: '2021-03-28T17:40',
				}),
			],
		},
		{
			name: '小港祭',
			artists: [
				new IArtist({
					id: '1:9:0',
					name: 'Da Wang',
					startTime: '2021-03-28T15:00',
					endTime: '2021-03-28T15:50',
				}),
				new IArtist({
					id: '1:9:1',
					name: '億思 lan Lin ft. 詹士賢',
					startTime: '2021-03-28T15:50',
					endTime: '2021-03-28T17:00',
				}),
				new IArtist({
					id: '1:9:2',
					name: 'Litro',
					startTime: '2021-03-28T17:00',
					endTime: '2021-03-28T17:50',
				}),
				new IArtist({
					id: '1:9:3',
					name: '賴皮 Mr. Skin ft. 浩庭',
					startTime: '2021-03-28T17:50',
					endTime: '2021-03-28T19:00',
				}),
			],
		},
	],
};

const programList: IProgramList = {
	perfDays: [day1, day2],
};

export default programList;
