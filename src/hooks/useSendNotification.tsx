import { useEffect } from 'react';
import moment from 'moment';
import { IArtist, IArtistV2 } from 'types/show';

const useSendNotification = (activeArtists: (IArtist | IArtistV2)[], notificationKey: string) => {
	useEffect(() => {
		if (!('Notification' in window)) {
			return;
		}
		const sentNotifications = JSON.parse(localStorage.getItem(notificationKey) ?? '{}') || {};
		const artistsWithTime = activeArtists.filter((a) => a.startTime);

		const interval = setInterval(() => {
			artistsWithTime.forEach((artist) => {
				const currentTime = moment();
				const startTime = moment(artist.startTime);
				const notificationTime = moment(artist.startTime).subtract(30, 'minutes');

				if (
					currentTime.isBetween(notificationTime, startTime) && // Check if current time is between notificationTime and startTime
					!sentNotifications[artist.id] // Check if notification is not already sent
				) {
					const notificationMessage = `${artist.name} 即將開始表演`;
					new Notification(notificationMessage, { body: startTime.format('HH:mm') });
					// console.log('notificationMessage', notificationMessage);

					// Mark the notification as sent in local storage
					sentNotifications[artist.id] = true;
					localStorage.setItem(notificationKey, JSON.stringify(sentNotifications));
				}
			});
		}, 1000); // Check every minute

		return () => clearInterval(interval);
	}, [activeArtists, notificationKey]);

	return null;
};

export default useSendNotification;
