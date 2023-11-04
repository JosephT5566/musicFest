import { IArtist, IPerfDay } from 'types/show';

export const setArtistId = (perfDay: IPerfDay): IPerfDay => {
	const { dayIndex, stages } = perfDay;

	const formattedStages = stages.map((stage, stageIndex) => {
		const { artists } = stage;
		return {
			...stage,
			artists: artists.map((artist, artIndex) => {
				return new IArtist({ ...artist, id: `${dayIndex}:${stageIndex}:${artIndex}` });
			}),
		};
	});

	return { ...perfDay, stages: formattedStages };
};

export const formatDate = (perfDay: IPerfDay): IPerfDay => {
	const { date, dayStartTime, dayEndTime, stages } = perfDay;

	if (!date || date === '') {
		return perfDay;
	}

	const formattedStages = stages.map((stage) => {
		const { artists } = stage;
		return {
			...stage,
			artists: artists.map((artist) => {
				const { startTime, endTime } = artist;
				return new IArtist({
					...artist,
					startTime: `${date}T${startTime}`,
					endTime: `${date}T${endTime}`,
				});
			}),
		};
	});

	console.log('🚀', `${date}T${dayStartTime}`)
	return {
		...perfDay,
		dayStartTime: `${date}T${dayStartTime}`,
		dayEndTime: `${date}T${dayEndTime}`,
		stages: formattedStages,
	};
};
