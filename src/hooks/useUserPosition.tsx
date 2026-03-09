'use client';
import { useState, useEffect } from 'react';

interface UserPosition {
	lat: number;
	lng: number;
}

interface UseUserPositionState {
	userCoords: UserPosition | null;
	loading: boolean;
	error: GeolocationPositionError | null;
}

const useUserPosition = (): UseUserPositionState => {
	const [userCoords, setUserCoords] = useState<UserPosition | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<GeolocationPositionError | null>(null);

	useEffect(() => {
		const handleSuccess = (position: GeolocationPosition) => {
			const { latitude, longitude } = position.coords;
			setUserCoords({ lat: latitude, lng: longitude });
			setLoading(false);
		};

		const handleError = (error: GeolocationPositionError) => {
			setError(error);
			setLoading(false);
		};

		if (!navigator.geolocation) {
			setLoading(false);
			// You might want to handle the case where geolocation is not supported
			return;
		}

		const watchId = navigator.geolocation.watchPosition(handleSuccess, handleError);

		return () => {
			navigator.geolocation.clearWatch(watchId);
		};
	}, []);

	return { userCoords, loading, error };
};

export default useUserPosition;
