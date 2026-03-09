import { useEffect } from 'react';
import { subMinutes, isWithinInterval, format } from 'date-fns';
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
				const currentTime = new Date();
				const startTime = new Date(artist.startTime!);
				const notificationTime = subMinutes(new Date(artist.startTime!), 30);

				if (
					isWithinInterval(currentTime, { start: notificationTime, end: startTime }) && // Check if current time is between notificationTime and startTime
					!sentNotifications[artist.id] // Check if notification is not already sent
				) {
					const notificationMessage = `${artist.name} 即將開始表演`;
					new Notification(notificationMessage, { body: format(startTime, 'HH:mm') });
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
