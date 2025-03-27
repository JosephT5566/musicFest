import { IArtist, IPerfDay, IProgramList } from 'types/show';
import { setArtistId, formatDate } from 'utils/tsHelpers';

const day1: IPerfDay = {
	dayIndex: 0,
	date: '2025-03-29',
	dayStartTime: '12:30',
	dayEndTime: '22:00',
	stages: [
		{
			name: '南霸天',
			artists: [
				new IArtist({ name: '傷心欲絕', startTime: '12:30', endTime: '13:10' }),
				new IArtist({
					name: 'Megaport Wandering 溫蒂漫步大樂隊',
					startTime: '14:10',
					endTime: '14:50',
				}),
				new IArtist({ name: 'BATTLES [US]', startTime: '15:50', endTime: '16:30' }),
				new IArtist({ name: 'Creepy Nuts [JP]', startTime: '17:30', endTime: '18:10' }),
				new IArtist({ name: 'UVERworld [JP]', startTime: '19:10', endTime: '19:50' }),
				new IArtist({ name: '閃靈', startTime: '21:00', endTime: '21:50' }),
			],
		},
		{
			name: '海龍王',
			artists: [
				new IArtist({
					name: '再會陳一郎 相遇大港邊',
					startTime: '13:10',
					endTime: '13:50',
				}),
				new IArtist({
					name: 'VH ft. 岑寧兒 Yoyo Sham',
					startTime: '14:40',
					endTime: '15:20',
				}),
				new IArtist({ name: 'EmptyORio', startTime: '16:00', endTime: '16:40' }),
				new IArtist({ name: 'ヤングスキニー yangskinny [JP]', startTime: '17:20', endTime: '18:00' }),
				new IArtist({ name: 'Crossfaith [JP]', startTime: '18:40', endTime: '19:20' }),
				new IArtist({ name: "THAT'S MY SHHH", startTime: '20:10', endTime: '21:10' }),
			],
		},
		{
			name: '女神龍',
			artists: [
				new IArtist({ name: '南西肯恩', startTime: '12:30', endTime: '13:10' }),
				new IArtist({ name: '老王樂隊', startTime: '13:50', endTime: '14:30' }),
				new IArtist({ name: '葛西瓦 Kasiwa', startTime: '15:10', endTime: '15:50' }),
				new IArtist({ name: 'sogumm [KR]', startTime: '16:40', endTime: '17:20' }),
				new IArtist({ name: 'I Mean Us ft. 黃大謙', startTime: '18:00', endTime: '18:40' }),
				new IArtist({ name: '鄭宜農 Enno Cheng', startTime: '19:30', endTime: '20:10' }),
				new IArtist({ name: '廣末涼子 [JP]', startTime: '21:00', endTime: '21:40' }),
			],
		},
		{
			name: '海波浪',
			artists: [
				new IArtist({
					name: 'Bremen Entertainment Inc. 布萊梅',
					startTime: '13:10',
					endTime: '13:50',
				}),
				new IArtist({ name: 'Andr', startTime: '14:30', endTime: '15:10' }),
				new IArtist({ name: '三牲獻藝', startTime: '15:50', endTime: '16:30' }),
				new IArtist({ name: '山姆 someshiit', startTime: '17:10', endTime: '17:50' }),
				new IArtist({ name: 'JPBS [TH]', startTime: '18:40', endTime: '19:20' }),
				new IArtist({ name: '宅邦戰隊', startTime: '20:10', endTime: '21:40' }),
			],
		},
		{
			name: '卡魔麥',
			artists: [
				new IArtist({ name: 'Mario Zwinkle [ID]', startTime: '13:00', endTime: '13:40' }),
				new IArtist({ name: '一點生', startTime: '14:20', endTime: '15:00' }),
				new IArtist({ name: 'Ko0k 庫克', startTime: '15:40', endTime: '16:20' }),
				new IArtist({ name: 'Beyond Cure ft. GIGO', startTime: '17:00', endTime: '17:40' }),
				new IArtist({ name: 'Goose 我鳥 [SG]', startTime: '18:20', endTime: '19:00' }),
				new IArtist({
					name: 'Little Shy on Allen Street',
					startTime: '19:40',
					endTime: '20:20',
				}),
			],
		},
		{
			name: '出頭天',
			artists: [
				new IArtist({ name: '塑膠Boy(s)', startTime: '13:50', endTime: '14:30' }),
				new IArtist({ name: '壞蛋王·老五', startTime: '15:10', endTime: '15:50' }),
				new IArtist({ name: '薄荷綠工廠', startTime: '16:30', endTime: '17:10' }),
				new IArtist({ name: '憂憂 yō-yō', startTime: '17:50', endTime: '18:30' }),
			],
		},
		{
			name: '大雄丸',
			artists: [
				new IArtist({
					name: 'DJ Yellow Yellow aka 黃小楨+黃玠',
					startTime: '13:00',
					endTime: '14:00',
				}),
				new IArtist({ name: 'DJ White aka 壞特', startTime: '15:00', endTime: '16:00' }),
				new IArtist({ name: 'DJ Orange aka 張震嶽', startTime: '17:00', endTime: '18:00' }),
			],
		},
		{
			name: '藍寶石',
			artists: [
				new IArtist({ name: '李竺芯 Siri Lee', startTime: '14:00', endTime: '14:40' }),
				new IArtist({ name: '徐噴以煙', startTime: '15:20', endTime: '16:00' }),
				new IArtist({ name: 'balazwolf x 唐嘉鴻', startTime: '16:40', endTime: '17:20' }),
				new IArtist({
					name: '黑狼 人本那卡西 [立志篇]',
					startTime: '18:00',
					endTime: '18:40',
				}),
			],
		},
		{
			name: '青春夢',
			artists: [
				new IArtist({ name: '公館青少年', startTime: '13:20', endTime: '14:00' }),
				new IArtist({
					name: '孩子王 ft. 黃筱雯 甘家葳',
					startTime: '14:40',
					endTime: '15:20',
				}),
				new IArtist({ name: 'SHOOTUP', startTime: '16:10', endTime: '16:50' }),
				new IArtist({ name: '擊沈女孩', startTime: '17:20', endTime: '18:00' }),
				new IArtist({ name: '大人の成發', startTime: '18:40', endTime: '19:20' }),
			],
		},
		{
			name: '小港祭',
			artists: [
				new IArtist({ name: '[DJ] _tarolin', startTime: '15:00', endTime: '16:00' }),
				new IArtist({ name: '#爵犬 SWING', startTime: '16:00', endTime: '16:40' }),
				new IArtist({ name: '[DJ] WHILES DAVIS', startTime: '16:40', endTime: '17:30' }),
				new IArtist({ name: '#爵犬 BOSSA', startTime: '17:30', endTime: '18:10' }),
				new IArtist({ name: '#爵犬 NOD TOWN', startTime: '18:10', endTime: '18:50' }),
				new IArtist({ name: '#爵犬 FUNK', startTime: '18:50', endTime: '19:30' }),
				new IArtist({ name: '[DJ] nevafadded', startTime: '19:30', endTime: '21:00' }),
			],
		},
		{
            name: '大樹下',
			artists: [
                new IArtist({ name: 'DJ NICO', startTime: '15:00', endTime: '16:00' }),
				new IArtist({ name: 'DJ ChiLL', startTime: '16:00', endTime: '17:00' }),
                new IArtist({ name: '蘇俊穎 掌中木偶劇團', startTime: '17:00', endTime: '17:40' }),
                new IArtist({ name: 'DJ LITRO', startTime: '17:40', endTime: '18:20' }),
                new IArtist({ name: '布袋戲大亂鬥 & 大樹下KTV', startTime: '18:20', endTime: '19:00' }),
			],
		},
	],
};

const day2: IPerfDay = {
	dayIndex: 1,
	date: '2025-03-30',
	dayStartTime: '12:30',
	dayEndTime: '22:00',
	stages: [
		{
			name: '南霸天',
			artists: [
				new IArtist({ name: '無妄合作社', startTime: '12:30', endTime: '13:10' }),
				new IArtist({ name: '美秀集團', startTime: '14:10', endTime: '14:50' }),
				new IArtist({ name: 'Chilli Beans. [JP]', startTime: '15:50', endTime: '16:30' }),
				new IArtist({ name: '血肉果汁機', startTime: '17:30', endTime: '18:10' }),
				new IArtist({ name: '拍謝少年 SORRY YOUTH', startTime: '19:00', endTime: '19:50' }),
				new IArtist({
					name: 'THE FLAMING LIPS [US]',
					startTime: '20:50',
					endTime: '21:50',
				}),

			],
		},
		{
            name: '海龍王',
			artists: [
                new IArtist({
                    name: 'FUTURE AFTER A SECOND',
					startTime: '13:20',
					endTime: '14:00',
				}),
                new IArtist({ name: 'WONK [JP]', startTime: '14:40', endTime: '15:20' }),
                new IArtist({ name: 'Hello Nico', startTime: '16:00', endTime: '16:40' }),
                new IArtist({ name: '岡崎體育 [JP]', startTime: '17:20', endTime: '18:00' }),
                new IArtist({ name: '傻子與白痴', startTime: '18:40', endTime: '19:20' }),
                new IArtist({
                    name: 'THE SPELLBOUND BOOM BOOM SATELLITES special set [JP]',
                    startTime: '20:10',
                    endTime: '20:50',
                }),
                
			],
		},
		{
            name: '女神龍',
			artists: [
                new IArtist({ name: '淺堤 Shallow Levée', startTime: '12:40', endTime: '13:20' }),
                new IArtist({
                    name: 'ゲシュタルト乙女 ft. SKARAOKE',
                    startTime: '14:00',
                    endTime: '14:40',
                }),
                new IArtist({ name: 'hue', startTime: '15:20', endTime: '16:00' }),
                new IArtist({ name: 'Gummy B × 楊舒雅', startTime: '16:40', endTime: '17:20' }),
                new IArtist({ name: 'Everydaze', startTime: '18:00', endTime: '18:40' }),
                new IArtist({ name: 'deca joins', startTime: '19:30', endTime: '20:10' }),
                new IArtist({ name: 'QURULI [JP]', startTime: '21:00', endTime: '21:40' }),
			],
		},
		{
            name: '海波浪',
			artists: [
                new IArtist({
                    name: '敬 高菊花-禁錮的餘生 以莉·高露 x 陳永龍',
                    startTime: '13:10',
                    endTime: '13:50',
                }),
                new IArtist({ name: '莉莉周她說', startTime: '14:30', endTime: '15:10' }),
                new IArtist({
                    name: '空白ごっこ KuhakuGokko [JP]',
                    startTime: '15:50',
                    endTime: '16:30',
                }),
                new IArtist({ name: '昏鴉', startTime: '17:10', endTime: '17:50' }),
				new IArtist({ name: '五五身', startTime: '18:40', endTime: '19:20' }),
				new IArtist({
                    name: 'Sonia Calico & 灣島皇后',
					startTime: '20:10',
					endTime: '21:40',
				}),
			],
		},
		{
            name: '卡魔麥',
			artists: [
                new IArtist({ name: '頭部組成者', startTime: '13:00', endTime: '13:40' }),
				new IArtist({ name: '驢子耳朵', startTime: '14:20', endTime: '15:00' }),
                new IArtist({ name: '宝島材料行', startTime: '15:40', endTime: '16:20' }),
				new IArtist({ name: '話梅鹿 [HK]', startTime: '17:00', endTime: '17:40' }),
				new IArtist({ name: '少年白', startTime: '18:20', endTime: '19:00' }),
                new IArtist({
					name: '黑狼 人本那卡西 [望鄉篇]',
					startTime: '19:40',
					endTime: '20:20',
				}),
            ],
		},
		{
			name: '出頭天',
			artists: [
				new IArtist({ name: '銀河1966', startTime: '13:40', endTime: '14:20' }),
				new IArtist({ name: 'Blueburn', startTime: '15:00', endTime: '15:40' }),
				new IArtist({ name: 'DEW', startTime: '16:20', endTime: '17:00' }),
				new IArtist({ name: '老貓偵探社', startTime: '17:40', endTime: '18:20' }),
			],
		},
		{
			name: '大雄丸',
			artists: [
				new IArtist({ name: 'DJ Rainbow aka 萬芳', startTime: '13:00', endTime: '14:00' }),
				new IArtist({
					name: 'DJ Violette aka 李竺芯 Siri Lee',
					startTime: '15:00',
					endTime: '16:00',
				}),
				new IArtist({ name: 'DJ Golden aka 金魚腦', startTime: '17:00', endTime: '18:00' }),
			],
		},
		{
			name: '藍寶石',
			artists: [
				new IArtist({ name: '只能喝酒的圖書館', startTime: '14:00', endTime: '14:40' }),
				new IArtist({ name: '溱會灰', startTime: '15:20', endTime: '16:00' }),
				new IArtist({ name: '工口紳士', startTime: '16:40', endTime: '17:20' }),
				new IArtist({ name: 'Chill Qin', startTime: '18:00', endTime: '18:40' }),

			],
		},
		{
            name: '青春夢',
			artists: [
                new IArtist({ name: '粹垢 TRAEGO', startTime: '13:20', endTime: '14:00' }),
				new IArtist({ name: 'DIZLIKE', startTime: '14:40', endTime: '15:20' }),
				new IArtist({ name: '凹與山 Our Shame', startTime: '16:00', endTime: '16:40' }),
                new IArtist({ name: 'Guhit Band [PH]', startTime: '17:20', endTime: '18:00' }),
                new IArtist({ name: '餵飽豬', startTime: '18:40', endTime: '19:20' }),
                
			],
		},
		{
            name: '小港祭',
			artists: [
                new IArtist({ name: '[DJ] PJ', startTime: '15:00', endTime: '16:00' }),
				new IArtist({ name: '[DJ] D.J. Kool Klone', startTime: '16:00', endTime: '17:00' }),
                new IArtist({ name: '#爵犬 R&B', startTime: '17:00', endTime: '17:40' }),
                new IArtist({ name: '[DJ] LEONA', startTime: '17:40', endTime: '19:10' }),
                new IArtist({ name: '#爵犬 × WADE DAO', startTime: '19:10', endTime: '19:50' }),
                new IArtist({ name: '#爵犬 JAM', startTime: '19:50', endTime: '21:00' }),
			],
		},
		{
            name: '大樹下',
			artists: [
                new IArtist({ name: 'Koala Wu', startTime: '15:00', endTime: '15:50' }),
				new IArtist({ name: 'Karei & ooo & 稲妻莉央', startTime: '15:50', endTime: '16:10' }),
                new IArtist({ name: 'Samuel Mie', startTime: '16:10', endTime: '17:00' }),
                new IArtist({ name: '空耳卡拉OK', startTime: '17:00', endTime: '18:00' }),
                new IArtist({ name: 'Roman ft. EvolutioN', startTime: '18:00', endTime: '19:00' }),
			],
		},
	],
};

const programList: IProgramList = {
	perfDays: [formatDate(setArtistId(day1)), formatDate(setArtistId(day2))],
};

export default programList;
