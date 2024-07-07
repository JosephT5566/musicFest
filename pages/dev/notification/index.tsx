import React, { useEffect, useState, ChangeEvent } from 'react';
import Head from 'next/head';
import { PageContainer } from 'components/base/Container';

import { APP_NAME } from 'constants/static';

const headerTitle = `${APP_NAME} - Dev - Notification`;

const NotificationPage = () => {
	const [time, setTime] = useState('');
	const [selectedUTC, setSelectedUTC] = useState('');

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedTime = event.target.value;
		setTime(selectedTime);

		// Get today's date in UTC
		const utcDate = new Date();
		utcDate.setHours(Number(selectedTime.substring(0, 2)));
		utcDate.setMinutes(Number(selectedTime.substring(3)));

		setSelectedUTC(utcDate.toISOString());
	};

	useEffect(() => {
		if (!('Notification' in window)) {
			return;
		}

		const interval = setInterval(() => {
			const currentTime = new Date();
			const startTime = new Date(selectedUTC);

			const isEqual =
				currentTime.getHours() === startTime.getHours() &&
				currentTime.getMinutes() === startTime.getMinutes();

			// Check if current time is between notificationTime and startTime
			if (isEqual) {
				const notificationMessage = `Now is ${time}`;
				new Notification(notificationMessage, { body: time });
			}
		}, 1000 * 30); // Check every 30 sec

		return () => clearInterval(interval);
	}, []);

	return (
		<PageContainer>
			<Head>
				<title>{headerTitle}</title>
			</Head>

			{'Notification' in window && <p>{`Permission: ${Notification.permission}`}</p>}
			<label htmlFor="time">Select Time:</label>
			<input type="time" id="time" value={time} onChange={handleChange} />
			<p>Selected Time: {time}</p>
		</PageContainer>
	);
};

export default NotificationPage;
