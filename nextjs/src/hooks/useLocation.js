import { useEffect, useState } from 'react';

const useLocation = () => {
	const [location, setLocation] = useState(null);

	useEffect(() => {
		setLocation(window.location);
	}, []);

	return location;
};

export default useLocation;
