import { IArtist, IPerfDay, IProgramList } from 'types/show';
import { setArtistId, formatDate } from 'utils/tsHelper';

const day1: IPerfDay = {
	dayIndex: 0,
	date: '2023-11-25',
	dayStartTime: '11:10',
	dayEndTime: '21:40',
	stages: [
		{
			name: '火 舞台',
			artists: [
				new IArtist({
					name: 'LEE YOUNGJI 李泳 知 (KR)',
					startTime: '12:05',
					endTime: '12:45',
				}),
				new IArtist({
					name: '芒果醬 Mango Jump',
					startTime: '14:00',
					endTime: '14:40',
				}),
				new IArtist({
					name: '圖騰樂團',
					startTime: '15:50',
					endTime: '16:30',
				}),
				new IArtist({
					name: '宇宙人',
					startTime: '17:40',
					endTime: '18:20',
				}),
				new IArtist({
					name: 'envy (JP)',
					startTime: '19:35',
					endTime: '20:25',
				}),
			],
		},
		{
			name: '球 舞台',
			artists: [
				new IArtist({
					name: '滅火器 Fire EX . - 火大 啦',
					startTime: '11:10',
					endTime: '11:50',
				}),
				new IArtist({
					name: '海豚刑警',
					startTime: '13:00',
					endTime: '13:40',
				}),
				new IArtist({
					name: '怕胖 團 PAPUN BAND',
					startTime: '14:55',
					endTime: '15:35',
				}),
				new IArtist({
					name: '康士坦 的 變化 球',
					startTime: '16:45',
					endTime: '17:25',
				}),
				new IArtist({
					name: '血肉 果汁機 t. Julia 吳卓源',
					startTime: '18:40',
					endTime: '19:20',
				}),
				new IArtist({
					name: '10 - FEET (JP)',
					startTime: '20:40',
					endTime: '21:40',
				}),
			],
		},
		{
			name: '祭 舞台',
			artists: [
				new IArtist({
					name: '普通 隊長',
					startTime: '11:30',
					endTime: '12:00',
				}),
				new IArtist({
					name: 'Kook',
					startTime: '12:35',
					endTime: '13:05',
				}),
				new IArtist({
					name: 'Yokkorio',
					startTime: '13:40',
					endTime: '14:10',
				}),
				new IArtist({
					name: 'SmashRegz ft. BRADD',
					startTime: '14:45',
					endTime: '15:15',
				}),
				new IArtist({
					name: '粗大 Band',
					startTime: '15:50',
					endTime: '16:20',
				}),
				new IArtist({
					name: 'SKARAOKE',
					startTime: '16:55',
					endTime: '17:25',
				}),
				new IArtist({
					name: '絕命青年',
					startTime: '18:00',
					endTime: '18:30',
				}),
				new IArtist({
					name: 'A_Root同根生',
					startTime: '19:05',
					endTime: '19:35',
				}),
				new IArtist({
					name: '隨性',
					startTime: '20:10',
					endTime: '20:40',
				}),
			],
		},
	],
};

const day2: IPerfDay = {
	date: '2023-11-26',
	dayStartTime: '11:10',
	dayEndTime: '21:30',
	stages: [
		{
			name: '火舞台',
			artists: [
				new IArtist({
					name: '鄭宜農',
					startTime: '11:10',
					endTime: '11:50',
				}),
				new IArtist({
					name: '大象體操',
					startTime: '13:00',
					endTime: '13:40',
				}),
				new IArtist({
					name: 'JADE',
					startTime: '14:55',
					endTime: '15:35',
				}),
				new IArtist({
					name: '勸世三姊妹',
					startTime: '16:45',
					endTime: '17:25',
				}),
				new IArtist({
					name: '國蛋GorDoN',
					startTime: '18:40',
					endTime: '19:20',
				}),
				new IArtist({
					name: 'Fire EX. - On Fire Day ft. 馬克SAVAGE.M、阿跨面',
					startTime: '20:30',
					endTime: '21:30',
				}),
			],
		},
		{
			name: '球舞台',
			artists: [
				new IArtist({
					name: 'TOTALFAT (JP)',
					startTime: '12:05',
					endTime: '12:45',
				}),
				new IArtist({
					name: '樂天女孩',
					startTime: '13:50',
					endTime: '14:00',
				}),
				new IArtist({
					name: 'TRASH',
					startTime: '14:00',
					endTime: '14:40',
				}),
				new IArtist({
					name: 'Silica Gel (KR)',
					startTime: '15:50',
					endTime: '16:30',
				}),
				new IArtist({
					name: '美秀集團 ft.浣熊俠',
					startTime: '17:40',
					endTime: '18:20',
				}),
				new IArtist({
					name: '樂天女孩',
					startTime: '18:30',
					endTime: '18:40',
				}),
				new IArtist({
					name: 'The BONEZ (JP)',
					startTime: '19:35',
					endTime: '20:15',
				}),
			],
		},
		{
			name: '祭舞台',
			artists: [
				new IArtist({
					name: '夕陽武士',
					startTime: '11:25',
					endTime: '11:55',
				}),
				new IArtist({
					name: 'SHOOTUP',
					startTime: '12:30',
					endTime: '13:00',
				}),
				new IArtist({
					name: 'Robot Swing',
					startTime: '13:35',
					endTime: '14:05',
				}),
				new IArtist({
					name: 'EmptyORio',
					startTime: '15:15',
					endTime: '15:55',
				}),
				new IArtist({
					name: '周自從',
					startTime: '16:15',
					endTime: '16:45',
				}),
				new IArtist({
					name: '胖虎',
					startTime: '17:20',
					endTime: '17:50',
				}),
				new IArtist({
					name: '百合花',
					startTime: '17:55',
					endTime: '18:25',
				}),
				new IArtist({
					name: 'HAOTING',
					startTime: '19:00',
					endTime: '19:30',
				}),
				new IArtist({
					name: 'DJ MR.GIN',
					startTime: '20:00',
					endTime: '20:30',
				}),
			],
		},
	],
};

const programList: IProgramList = {
	perfDays: [formatDate(setArtistId(day1)), formatDate(setArtistId(day2))],
};

export default programList;