import { IArtist2, IStage2, ISchedule } from 'types/show';

// 1. ARTISTS_2026: A record of all unique artists
export const ARTISTS_2026: IArtist2[] = [
	{
		id: '1',
		name: '傷心欲絕',
		imgUrl: '',
		description: '',
		startTime: '12:30',
		endTime: '13:10',
		stageName: '南霸天',
	},
	{
		id: '2',
		name: 'Megaport Wandering 溫蒂漫步大樂隊',
		imgUrl: '',
		description: '',
		startTime: '14:10',
		endTime: '14:50',
		stageName: '南霸天',
	},
	{
		id: '3',
		name: 'BATTLES [US]',
		imgUrl: '',
		description: '',
		startTime: '15:50',
		endTime: '16:30',
		stageName: '南霸天',
	},
	{
		id: '4',
		name: 'Creepy Nuts [JP]',
		imgUrl: '',
		description: '',
		startTime: '17:30',
		endTime: '18:10',
		stageName: '南霸天',
	},
	{
		id: '5',
		name: 'UVERworld [JP]',
		imgUrl: '',
		description: '',
		startTime: '19:10',
		endTime: '19:50',
		stageName: '南霸天',
	},
	{
		id: '6',
		name: '閃靈',
		imgUrl: '',
		description: '',
		startTime: '21:00',
		endTime: '21:50',
		stageName: '南霸天',
	},
	{
		id: '7',
		name: '再會陳一郎 相遇大港邊',
		imgUrl: '',
		description: '',
		startTime: '13:10',
		endTime: '13:50',
		stageName: '海龍王',
	},
	{
		id: '8',
		name: 'VH ft. 岑寧兒 Yoyo Sham',
		imgUrl: '',
		description: '',
		startTime: '14:40',
		endTime: '15:20',
		stageName: '海龍王',
	},
	{
		id: '9',
		name: 'EmptyORio',
		imgUrl: '',
		description: '',
		startTime: '16:00',
		endTime: '16:40',
		stageName: '海龍王',
	},
	{
		id: '10',
		name: 'ヤングスキニー yangskinny [JP]',
		imgUrl: '',
		description: '',
		startTime: '17:20',
		endTime: '18:00',
		stageName: '海龍王',
	},
	{
		id: '11',
		name: 'Crossfaith [JP]',
		imgUrl: '',
		description: '',
		startTime: '18:40',
		endTime: '19:20',
		stageName: '海龍王',
	},
	{
		id: '12',
		name: "THAT'S MY SHHH",
		imgUrl: '',
		description: '',
		startTime: '20:10',
		endTime: '21:10',
		stageName: '海龍王',
	},
];

// 2. SCHEDULE_2026_BY_DAY: A schedule object for the day using nested types
const day1_stages: IStage2[] = [
	{
		name: '南霸天',
		performances: [
			{ artistId: '1' },
			{ artistId: '2' },
			{ artistId: '3' },
			{ artistId: '4' },
			{ artistId: '5' },
			{ artistId: '6' },
		],
	},
	{
		name: '海龍王',
		performances: [
			{ artistId: '7' },
			{ artistId: '8' },
			{ artistId: '9' },
			{ artistId: '10' },
			{ artistId: '11' },
			{ artistId: '12' },
		],
	},
];

const day2_stages: IStage2[] = [
	{
		name: '南霸天',
		performances: [
			{ artistId: '1' },
			{ artistId: '2' },
			{ artistId: '3' },
			{ artistId: '4' },
			{ artistId: '5' },
			{ artistId: '6' },
		],
	},
	{
		name: '海龍王',
		performances: [
			{ artistId: '7' },
			{ artistId: '8' },
			{ artistId: '9' },
			{ artistId: '10' },
			{ artistId: '11' },
			{ artistId: '12' },
		],
	},
];

export const SCHEDULE_2026: ISchedule = [
	{
		dayIndex: 0,
		date: '2026-03-28',
		dayStartTime: '12:30',
		dayEndTime: '22:00',
		stages: day1_stages,
	},
	{
		dayIndex: 1,
		date: '2026-03-29',
		dayStartTime: '12:30',
		dayEndTime: '22:00',
		stages: day2_stages,
	},
];
