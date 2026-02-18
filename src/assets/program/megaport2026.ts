import { IArtist2, IStage2, ISchedule } from 'types/show';

// 1. ARTISTS_2026: A record of all unique artists
export const ARTISTS_2026: IArtist2[] = [
	{
		id: '1',
		name: '傷心欲絕',
		imgUrl: '',
		description: '台北龐克樂團，以直白的歌詞和躁動的現場演出著稱，道出都市青年的焦慮與失落。',
		startTime: '12:30',
		endTime: '13:10',
		stageName: '南霸天',
	},
	{
		id: '2',
		name: 'Megaport Wandering 溫蒂漫步大樂隊',
		imgUrl: '',
		description: '來自台北的獨立樂團，曲風融合Dream Pop、Shoegaze，營造出浪漫迷幻的氛圍。',
		startTime: '14:10',
		endTime: '14:50',
		stageName: '南霸天',
	},
	{
		id: '3',
		name: 'BATTLES [US]',
		imgUrl: '',
		description: '來自紐約的實驗搖滾樂團，以複雜的節奏、循環樂句和獨特的器樂編排聞名。',
		startTime: '15:50',
		endTime: '16:30',
		stageName: '南霸天',
	},
	{
		id: '4',
		name: 'Creepy Nuts [JP]',
		imgUrl: '',
		description: '日本雙人嘻哈組合，由R-指定（饒舌）和DJ松永（DJ）組成，以高超的技巧和幽默感席捲樂壇。',
		startTime: '17:30',
		endTime: '18:10',
		stageName: '南霸天',
	},
	{
		id: '5',
		name: 'UVERworld [JP]',
		imgUrl: '',
		description: '日本滋賀縣出身的搖滾樂團，曲風融合搖滾、流行、電子等多種元素，擁有多首熱門動漫主題曲。',
		startTime: '19:10',
		endTime: '19:50',
		stageName: '南霸天',
	},
	{
		id: '6',
		name: '閃靈',
		imgUrl: '',
		description: '台灣重金屬樂團，將台灣歷史、神話與傳統樂器融入金屬音樂，在國際間享有盛名。',
		startTime: '21:00',
		endTime: '21:50',
		stageName: '南霸天',
	},
	{
		id: '7',
		name: '再會陳一郎 相遇大港邊',
		imgUrl: '',
		description: '特別企劃演出，致敬寶島歌王陳一郎，重現經典台語金曲。',
		startTime: '13:10',
		endTime: '13:50',
		stageName: '海龍王',
	},
	{
		id: '8',
		name: 'VH ft. 岑寧兒 Yoyo Sham',
		imgUrl: '',
		description: 'VH (Vast & Hazy) 與香港歌手岑寧兒的限定合作，結合爆發力與溫暖療癒的雙重魅力。',
		startTime: '14:40',
		endTime: '15:20',
		stageName: '海龍王',
	},
	{
		id: '9',
		name: 'EmptyORio',
		imgUrl: '',
		description: '鄭宜農的龐克樂團計畫，展現不同於個人作品的熱血與直率，帶來爽快的龐克聲響。',
		startTime: '16:00',
		endTime: '16:40',
		stageName: '海龍王',
	},
	{
		id: '10',
		name: 'ヤングスキニー yangskinny [JP]',
		imgUrl: '',
		description: '日本新生代搖滾樂團，以真實描繪年輕人戀愛觀與生活觀的歌詞引起共鳴，社群世代的人氣新星。',
		startTime: '17:20',
		endTime: '18:00',
		stageName: '海龍王',
	},
	{
		id: '11',
		name: 'Crossfaith [JP]',
		imgUrl: '',
		description: '日本大阪的金屬核樂團，將電子舞曲元素完美融合於重金屬音樂中，現場演出極具爆發力。',
		startTime: '18:40',
		endTime: '19:20',
		stageName: '海龍王',
	},
	{
		id: '12',
		name: "THAT'S MY SHHH",
		imgUrl: '',
		description: '台灣知名的音樂活動企劃，集結多位實力派嘻哈與R&B音樂人，帶來最純粹的黑人音樂派對。',
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
