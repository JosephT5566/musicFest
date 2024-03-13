import { IArtist, IPerfDay, IProgramList } from 'types/show';
import { setArtistId, formatDate } from 'utils/tsHelpers';

const day1: IPerfDay = {
	dayIndex: 0,
	date: '2024-03-30',
	dayStartTime: '12:40',
	dayEndTime: '22:10',
	stages: [
		{
			name: '南霸天',
			artists: [
				new IArtist({ name: '大象體操 ft. 壞特', startTime: '12:40', endTime: '13:20' }),
				new IArtist({ name: 'Tizzy Bac', startTime: '14:20', endTime: '15:00' }),
				new IArtist({ name: 'Hanabie. [JP]', startTime: '16:00', endTime: '16:40' }),
				new IArtist({ name: 'SURL [KR]', startTime: '17:40', endTime: '18:20' }),
				new IArtist({
					name: 'Maximum the Hormone [JP]',
					startTime: '19:20',
					endTime: '20:00',
				}),
				new IArtist({ name: '草東沒有派對', startTime: '21:00', endTime: '21:50' }),
			],
		},
		{
			name: '海龍王',
			artists: [
				new IArtist({ name: '閃靈', startTime: '13:20', endTime: '14:00' }),
				new IArtist({ name: '非人物種', startTime: '14:40', endTime: '15:20' }),
				new IArtist({ name: 'GIGO', startTime: '16:00', endTime: '16:40' }),
				new IArtist({ name: '體熊專科', startTime: '17:20', endTime: '18:00' }),
				new IArtist({ name: 'BREIMEN [JP]', startTime: '18:40', endTime: '19:20' }),
				new IArtist({ name: '芒果醬Mango Jump', startTime: '20:20', endTime: '21:00' }),
			],
		},
		{
			name: '女神龍',
			artists: [
				new IArtist({ name: '麥琪麥琪 ft. HowHow', startTime: '12:40', endTime: '13:20' }),
				new IArtist({ name: '胖虎 punkhoo', startTime: '14:00', endTime: '14:40' }),
				new IArtist({ name: '好樂團 GoodBand', startTime: '15:20', endTime: '16:00' }),
				new IArtist({ name: '百合花 ft. 苗可麗', startTime: '16:40', endTime: '17:20' }),
				new IArtist({ name: 'Dizzy Dizzo 蔡詩芸', startTime: '18:10', endTime: '18:50' }),
				new IArtist({
					name: 'Frandé 法蘭黛 ft. 李英宏',
					startTime: '19:40',
					endTime: '20:20',
				}),
				new IArtist({
					name: '滿島光 x SOIL&”PIMP" SESSIONS [JP]',
					startTime: '21:10',
					endTime: '21:50',
				}),
			],
		},
		{
			name: '卡魔麥',
			artists: [
				new IArtist({ name: '餿水 Swill', startTime: '13:00', endTime: '13:40' }),
				new IArtist({ name: 'BB彈', startTime: '14:20', endTime: '15:00' }),
				new IArtist({ name: '午夜乒乓', startTime: '15:40', endTime: '16:20' }),
				new IArtist({
					name: 'US:WE 直到看到鯨魚的眼睛',
					startTime: '17:00',
					endTime: '17:40',
				}),
				new IArtist({ name: '皿內果汁機', startTime: '18:30', endTime: '19:10' }),
				new IArtist({ name: '烈鷹 ft. 葵剛', startTime: '20:00', endTime: '20:40' }),
			],
		},
		{
			name: '出頭天',
			artists: [
				new IArtist({ name: '宇宙資料庫', startTime: '13:20', endTime: '14:00' }),
				new IArtist({ name: '脆垢TRAEGO', startTime: '14:40', endTime: '15:20' }),
				new IArtist({ name: '榕幫Banyan Gang', startTime: '16:00', endTime: '16:40' }),
				new IArtist({ name: '桑尼 Sonnie', startTime: '17:20', endTime: '18:00' }),
			],
		},
		{
			name: '海波浪',
			artists: [
				new IArtist({ name: 'Manic Sheep', startTime: '13:30', endTime: '14:10' }),
				new IArtist({ name: '參劈TriPoets', startTime: '14:50', endTime: '15:30' }),
				new IArtist({ name: '粗大Band', startTime: '16:10', endTime: '16:50' }),
				new IArtist({ name: 'ゲシュタルト乙女', startTime: '17:30', endTime: '18:10' }),
				new IArtist({ name: '烤秋勤', startTime: '19:00', endTime: '19:40' }),
			],
		},
		{
			name: '大雄丸',
			artists: [
				new IArtist({ name: '[海盜電台] 馬世芳', startTime: '13:00', endTime: '14:00' }),
				new IArtist({ name: '[影人遐想] 巫建和', startTime: '15:00', endTime: '16:00' }),
				new IArtist({
					name: '摩羯戰隊[宇宙人小玉+麋先生聖皓+TRASH葵剛]',
					startTime: '17:00',
					endTime: '18:00',
				}),
			],
		},
		{
			name: '藍寶石',
			artists: [
				new IArtist({
					name: '羅妍婷 YenTing Lo ft. 大竹研',
					startTime: '14:00',
					endTime: '14:40',
				}),
				new IArtist({ name: '非/密閉空間', startTime: '15:20', endTime: '16:00' }),
				new IArtist({
					name: '丹丹貓貓=aDAN薛詒丹 X Miao Miao Flow',
					startTime: '16:40',
					endTime: '17:20',
				}),
				new IArtist({
					name: '妮可醬(Sandra) ft. Eko (AmazingTalker Show)',
					startTime: '18:00',
					endTime: '18:40',
				}),
			],
		},
		{
			name: '青春夢',
			artists: [
				new IArtist({ name: '龔德', startTime: '13:10', endTime: '13:50' }),
				new IArtist({ name: '必順鄉村', startTime: '14:30', endTime: '15:10' }),
				new IArtist({ name: 'EOS [HK]', startTime: '15:50', endTime: '16:30' }),
				new IArtist({ name: '最後大浪', startTime: '17:10', endTime: '17:50' }),
				new IArtist({
					name: '劉暐紀念演出 [勝利一族+孝順一族]',
					startTime: '18:30',
					endTime: '19:10',
				}),
			],
		},
		{
			name: '小港祭',
			artists: [
				new IArtist({
					name: 'DJ Litro + Brain Youth',
					startTime: '15:00',
					endTime: '16:00',
				}),
				new IArtist({
					name: 'DJ 億恩 lan Lin + Michael Farris [Jazzhead]',
					startTime: '16:00',
					endTime: '17:00',
				}),
				new IArtist({ name: '舞台大亂鬥', startTime: '17:00', endTime: '17:30' }),
				new IArtist({
					name: 'DJ BOKO + 鄭立偉 [Jazzhead]',
					startTime: '17:30',
					endTime: '18:30',
				}),
				new IArtist({ name: '舞台大亂鬥', startTime: '18:30', endTime: '19:00' }),
			],
		},
	],
};

const day2: IPerfDay = {
	dayIndex: 1,
	date: '2024-03-31',
	dayStartTime: '11:30',
	dayEndTime: '22:00',
	stages: [
		{
			name: '南霸天',
			artists: [
				new IArtist({
					name: 'OBSESS',
					startTime: '12:20',
					endTime: '13:00',
				}),
				new IArtist({
					name: '潮州土狗+禁藥王&栗子',
					startTime: '13:40',
					endTime: '14:20',
				}),
				new IArtist({
					name: '壞特?te',
					startTime: '15:00',
					endTime: '15:40',
				}),
				new IArtist({
					name: '傷心欲絕',
					startTime: '16:30',
					endTime: '17:10',
				}),
				new IArtist({
					name: '宇宙人 ft.Vivian 蔡昌憲',
					startTime: '17:50',
					endTime: '18:40',
				}),
				new IArtist({
					name: '拍謝少年',
					startTime: '19:20',
					endTime: '20:00',
				}),
				new IArtist({
					name: '美秀集團 ft.盧廣仲',
					startTime: '21:00',
					endTime: '21:50',
				}),
			],
		},
		{
			name: '海龍王',
			artists: [
				new IArtist({
					name: '荷爾蒙少年',
					startTime: '12:40',
					endTime: '13:20',
				}),
				new IArtist({
					name: '尋人啟事',
					startTime: '14:00',
					endTime: '14:40',
				}),
				new IArtist({
					name: '李權哲',
					startTime: '15:20',
					endTime: '16:00',
				}),
				new IArtist({
					name: '「絕代風華人生無碼限定」盧律銘電影配樂Live set',
					startTime: '16:40',
					endTime: '17:20',
				}),
				new IArtist({
					name: 'Beyond Cure',
					startTime: '18:00',
					endTime: '18:40',
				}),
				new IArtist({
					name: '海豚刑警',
					startTime: '19:20',
					endTime: '20:00',
				}),
				new IArtist({
					name: '無妄合作社',
					startTime: '20:40',
					endTime: '21:20',
				}),
			],
		},
		{
			name: '女神龍',
			artists: [
				new IArtist({
					name: 'Vast & Hazy',
					startTime: '11:40',
					endTime: '12:20',
				}),
				new IArtist({
					name: '五五身',
					startTime: '13:00',
					endTime: '13:40',
				}),
				new IArtist({
					name: '老王樂隊',
					startTime: '14:20',
					endTime: '15:00',
				}),
				new IArtist({
					name: '黃玠',
					startTime: '15:40',
					endTime: '16:20',
				}),
				new IArtist({
					name: '草屯囝仔 ft.曹雅雯',
					startTime: '17:00',
					endTime: '17:50',
				}),
				new IArtist({
					name: '鄭宜農',
					startTime: '18:50',
					endTime: '19:30',
				}),
				new IArtist({
					name: 'Kimberley陳芳語 ft.大支',
					startTime: '20:10',
					endTime: '21:00',
				}),
			],
		},
		{
			name: '卡魔麥',
			artists: [
				new IArtist({
					name: '一點生',
					startTime: '11:50',
					endTime: '12:30',
				}),
				new IArtist({
					name: '必順鄉村',
					startTime: '13:30',
					endTime: '14:00',
				}),
				new IArtist({
					name: 'COLD DEW',
					startTime: '14:40',
					endTime: '15:20',
				}),
				new IArtist({
					name: '葛西瓦',
					startTime: '16:00',
					endTime: '16:40',
				}),
				new IArtist({
					name: 'icyball 冰球樂團',
					startTime: '17:20',
					endTime: '18:00',
				}),
				new IArtist({
					name: '溫蒂漫步',
					startTime: '18:40',
					endTime: '19:20',
				}),
				new IArtist({
					name: '大嘻哈時代 南部囝仔',
					startTime: '20:00',
					endTime: '20:40',
				}),
			],
		},
		{
			name: '出頭天',
			artists: [
				new IArtist({
					name: 'Everydaze',
					startTime: '13:00',
					endTime: '13:40',
				}),
				new IArtist({
					name: '黃宇寒',
					startTime: '14:20',
					endTime: '15:00',
				}),
				new IArtist({
					name: 'Everfor',
					startTime: '15:40',
					endTime: '16:20',
				}),
				new IArtist({
					name: 'blueburn',
					startTime: '17:00',
					endTime: '17:40',
				}),
			],
		},
		{
			name: '海波浪',
			artists: [
				new IArtist({
					name: 'Greedy Black Hole',
					startTime: '13:10',
					endTime: '13:50',
				}),
				new IArtist({
					name: '達摩樂隊',
					startTime: '14:30',
					endTime: '15:10',
				}),
				new IArtist({
					name: '擊沈女孩',
					startTime: '15:50',
					endTime: '16:30',
				}),
				new IArtist({
					name: '恕 ft.阿兄喬治',
					startTime: '17:10',
					endTime: '17:50',
				}),
				new IArtist({
					name: '宋柏瑋',
					startTime: '18:40',
					endTime: '19:10',
				}),
				new IArtist({
					name: 'A Piece of Cake 256',
					startTime: '19:50',
					endTime: '20:30',
				}),
			],
		},
		{
			name: '大雄丸',
			artists: [
				new IArtist({
					name: 'The Crane ft.LÜCY',
					startTime: '13:00',
					endTime: '14:00',
				}),
				new IArtist({
					name: 'Freddy林昶佐&黃蓉 ft.魁剛',
					startTime: '15:00',
					endTime: '16:00',
				}),
				new IArtist({
					name: '小咪與石孝倫的哥哥',
					startTime: '17:00',
					endTime: '18:00',
				}),
			],
		},
		{
			name: '藍寶石',
			artists: [
				new IArtist({
					name: 'CANDY☆STAR',
					startTime: '13:40',
					endTime: '14:20',
				}),
				new IArtist({
					name: '品賢 x 歐K',
					startTime: '15:00',
					endTime: '15:40',
				}),
				new IArtist({
					name: '義興閣掌中劇團',
					startTime: '16:20',
					endTime: '17:00',
				}),
			],
		},
		{
			name: '青春夢',
			artists: [
				new IArtist({
					name: '薛詒丹 ft.Ponay的原式cover',
					startTime: '14:00',
					endTime: '14:40',
				}),
				new IArtist({
					name: `MoonD'shake`,
					startTime: '15:20',
					endTime: '16:00',
				}),
				new IArtist({
					name: 'hue',
					startTime: '16:40',
					endTime: '17:20',
				}),
				new IArtist({
					name: '露波合唱團',
					startTime: '18:00',
					endTime: '18:40',
				}),
			],
		},
		{
			name: '小港祭',
			artists: [
				new IArtist({
					name: 'DJ TAKA',
					startTime: '15:20',
					endTime: '16:20',
				}),
				new IArtist({
					name: 'DJ AFURO GEORGE',
					startTime: '16:20',
					endTime: '17:20',
				}),
				new IArtist({
					name: '國語作業簿: AUTO TUNE K歌大會',
					startTime: '17:20',
					endTime: '17:50',
				}),
				new IArtist({
					name: 'DJ Mr. SKIN',
					startTime: '17:50',
					endTime: '19:20',
				}),
			],
		},
	],
};

const programList: IProgramList = {
	perfDays: [formatDate(setArtistId(day1)), formatDate(setArtistId(day2))],
};

export default programList;
