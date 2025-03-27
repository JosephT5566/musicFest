export function generateGoogleCalendarLink({
	title,
	startDateTime,
	endDateTime,
	details,
	location,
}: {
	title: string;
	startDateTime: string;
	endDateTime: string;
	details: string;
	location: string;
}): string {
	const baseUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';

	const params = new URLSearchParams({
		text: title,
		dates: `${startDateTime}/${endDateTime}`,
		details,
		location,
		ctz: 'Asia/Taipei', // set timezone
	});

	return `${baseUrl}&${params.toString()}`;

	// for testing:
	// const title = "東京之旅";
	// const startDateTime = "20250401T090000Z";  // UTC 時間格式
	// const endDateTime = "20250401T120000Z";
	// const details = "這是東京的旅行計畫，記得準備行李！";
	// const location = "東京車站";

	// const calendarUrl = generateGoogleCalendarLink(title, startDateTime, endDateTime, details, location);
	// console.log(calendarUrl); // 點擊後可加入 Google 行事曆
}

export function toUTCFormat(localTime: string) {
	const localDate = new Date(localTime + ':00'); // Make sure to add seconds
	const utcYear = localDate.getUTCFullYear();
	const utcMonth = String(localDate.getUTCMonth() + 1).padStart(2, '0');
	const utcDay = String(localDate.getUTCDate()).padStart(2, '0');
	const utcHour = String(localDate.getUTCHours()).padStart(2, '0');
	const utcMinute = String(localDate.getUTCMinutes()).padStart(2, '0');
	const utcSecond = String(localDate.getUTCSeconds()).padStart(2, '0');

	return `${utcYear}${utcMonth}${utcDay}T${utcHour}${utcMinute}${utcSecond}Z`;
}
