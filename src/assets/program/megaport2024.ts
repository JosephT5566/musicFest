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
				new IArtist({ name: '台灣通勤第一品牌', startTime: '20:30', endTime: '21:10' }),
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
	dayStartTime: '12:40',
	dayEndTime: '21:50',
	stages: [
		{
			name: '南霸天',
			artists: [
				new IArtist({ name: '李權哲', startTime: '12:40', endTime: '13:20' }),
				new IArtist({ name: '滅火器 Fire EX', startTime: '14:20', endTime: '15:00' }),
				new IArtist({ name: '康士坦的變化球', startTime: '16:00', endTime: '16:40' }),
				new IArtist({ name: '"Avantgardey [JP]"', startTime: '17:40', endTime: '18:20' }),
				new IArtist({ name: '拍謝少年 Sorry Youth', startTime: '19:20', endTime: '20:00' }),
				new IArtist({
					name: 'ASIAN KUNG-FU GENERATION [JP]',
					startTime: '21:00',
					endTime: '21:50',
				}),
			],
		},
		{
			name: '海龍王',
			artists: [
				new IArtist({ name: 'JADE', startTime: '13:20', endTime: '14:00' }),
				new IArtist({ name: 'OBSESS', startTime: '14:40', endTime: '15:20' }),
				new IArtist({
					name: '八十八顆芭樂籽 ft. Wing Stars',
					startTime: '16:00',
					endTime: '16:40',
				}),
				new IArtist({ name: '謎路人', startTime: '17:20', endTime: '18:00' }),
				new IArtist({
					name: '欠你幽魂之我的忍道 毀容姐妹會 ft. Ponay 卜耐',
					startTime: '18:40',
					endTime: '19:20',
				}),
				new IArtist({ name: 'DEPT [TH]', startTime: '20:10', endTime: '20:50' }),
			],
		},
		{
			name: '女神龍',
			artists: [
				new IArtist({ name: '葉穎 Leaf Yeh', startTime: '12:40', endTime: '13:20' }),
				new IArtist({ name: '溫蒂漫步', startTime: '14:00', endTime: '14:40' }),
				new IArtist({
					name: '那屋瓦少女隊 ft. ABAO 阿爆',
					startTime: '15:20',
					endTime: '16:00',
				}),
				new IArtist({ name: 'ZAZEN BOYS', startTime: '16:40', endTime: '17:20' }),
				new IArtist({ name: '洪佩瑜 ft. 葛西瓦', startTime: '18:10', endTime: '18:50' }),
				new IArtist({ name: 'JABBERLOOP [JP]', startTime: '19:40', endTime: '20:20' }),
				new IArtist({ name: '鄭宜農', startTime: '20:50', endTime: '21:50' }),
			],
		},
		{
			name: '卡魔麥',
			artists: [
				new IArtist({ name: '庸俗救星', startTime: '13:00', endTime: '13:40' }),
				new IArtist({ name: 'Dope Purple', startTime: '14:20', endTime: '15:00' }),
				new IArtist({ name: '河豚子', startTime: '15:40', endTime: '16:20' }),
				new IArtist({ name: '2HRs', startTime: '17:00', endTime: '17:40' }),
				new IArtist({
					name: '破地獄 Scattered Purgatory',
					startTime: '18:30',
					endTime: '19:10',
				}),
				new IArtist({ name: '溫室雜草', startTime: '20:00', endTime: '20:40' }),
			],
		},
		{
			name: '出頭天',
			artists: [
				new IArtist({ name: '邱淑蟬', startTime: '13:20', endTime: '14:00' }),
				new IArtist({ name: '深深一擊', startTime: '14:40', endTime: '15:20' }),
				new IArtist({ name: '心頭肉', startTime: '16:00', endTime: '16:40' }),
				new IArtist({ name: '禪波ZENBØ ft. Andr"', startTime: '17:20', endTime: '18:00' }),
			],
		},
		{
			name: '海波浪',
			artists: [
				new IArtist({ name: '阿飛西雅', startTime: '13:30', endTime: '14:10' }),
				new IArtist({ name: 'Robot Swing', startTime: '14:50', endTime: '15:30' }),
				new IArtist({ name: '五五身 ft. 黑龍', startTime: '16:10', endTime: '16:50' }),
				new IArtist({ name: '"EmptyORio"', startTime: '17:30', endTime: '18:10' }), // Ensure the artist's name is correctly represented with quotes
				new IArtist({
					name: '我是機車少女 I’m difficult',
					startTime: '19:00',
					endTime: '19:40',
				}),
				new IArtist({ name: 'Green!Eyes', startTime: '20:30', endTime: '21:10' }),
			],
		},
		{
			name: '大雄丸',
			artists: [
				new IArtist({ name: '[海盜電台] 雷光夏', startTime: '13:00', endTime: '14:00' }),
				new IArtist({ name: '[影人遐想] 鳳小岳', startTime: '15:00', endTime: '16:00' }),
				new IArtist({
					name: '南港開唱 [楊大正+迪拉胖+阿舌]',
					startTime: '17:00',
					endTime: '18:00',
				}),
			],
		},
		{
			name: '藍寶石',
			artists: [
				new IArtist({
					name: '夜官暗訪老仙婆 裝咖人 ft. 張雅淳',
					startTime: '14:00',
					endTime: '14:40',
				}),
				new IArtist({
					name: '高小糕 不可能來大港練劈腿吧？',
					startTime: '15:20',
					endTime: '16:00',
				}),
				new IArtist({
					name: 'EASY SHEN X 詹詠安(L89)陳俊名',
					startTime: '16:40',
					endTime: '17:20',
				}),
				new IArtist({ name: '黑狼第二杯半價那卡西', startTime: '18:00', endTime: '18:40' }),
			],
		},
		{
			name: '青春夢',
			artists: [
				new IArtist({ name: 'Super Napkin', startTime: '13:10', endTime: '13:50' }),
				new IArtist({ name: 'NIO', startTime: '14:30', endTime: '15:10' }),
				new IArtist({ name: '孩子王', startTime: '15:50', endTime: '16:30' }),
				new IArtist({
					name: 'Southern Riot 南部鬧事團 [ID]',
					startTime: '17:10',
					endTime: '17:50',
				}),
				new IArtist({
					name: 'Hope the Flowers [TH]',
					startTime: '18:30',
					endTime: '19:10',
				}),
			],
		},
		{
			name: '小港祭',
			artists: [
				new IArtist({ name: 'DJ QuestionMark', startTime: '15:00', endTime: '16:00' }),
				new IArtist({ name: 'DJ 賴皮 MR.SKIN', startTime: '16:00', endTime: '16:50' }),
				new IArtist({
					name: 'DJ QuestionMark b2b DJ 賴皮 MR.SKIN',
					startTime: '17:00',
					endTime: '17:30',
				}),
				new IArtist({ name: 'Lazy Habits + LEO 37', startTime: '17:30', endTime: '18:10' }),
				new IArtist({
					name: 'FRaNKIE 阿法 + 馬克 SAVAGE.M',
					startTime: '18:10',
					endTime: '18:50',
				}),
				new IArtist({ name: '舞台大亂鬥', startTime: '18:50', endTime: '19:00' }),
			],
		},
	],
};

const programList: IProgramList = {
	perfDays: [formatDate(setArtistId(day1)), formatDate(setArtistId(day2))],
};

export default programList;
