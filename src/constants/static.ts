export const MIN = 60000; // 60 sec * 1000 milliseconds

export const APP_NAME = 'FesTime';

export const SCALE_UNIT = 1.3;

export const STORAGE_KEY = {
	day: 'day',
	notification: 'notification',
};

export const FEST_NAME = {
	MEGAPORT: 'Megaport',
	FUJI_ROCK: 'Fuji Rock',
};

export const ROUTE = {
	root: '/',
	links: '/links',
	megaport: {
		index: {
			root: '/megaport',
		},
		2021: {
			root: '/megaport/2021',
			map: '/megaport/2021/map',
		},
		2022: {
			root: '/megaport/2022',
			map: '/megaport/2022/map',
		},
		2024: {
			root: '/megaport/2024',
			map: '/megaport/2024/map',
		},
		2025: {
			root: '/megaport/2025',
			map: '/megaport/2025/map',
			lineup: '/megaport/2025/lineup',
		},
	},
	fujirock: {
		index: {
			root: '/fujirock',
		},
		2024: {
			root: '/fujirock/2024',
		},
	},
};
