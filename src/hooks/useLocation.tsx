import { useEffect, useState } from 'react';

const useLocation = () => {
	const [location, setLocation] = useState<Location | undefined>(undefined);

	useEffect(() => {
		setLocation(window.location);
	}, []);

	return location;
};

export default useLocation;
