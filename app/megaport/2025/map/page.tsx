'use client';
import React from 'react';
import Map from 'components/Map';

import { ROUTE, FEST_NAME } from 'constants/static';
import { IMAGES } from 'constants/images';

const title = `${FEST_NAME.MEGAPORT} | 2025 | Map`;

const Megaport2025Map = () => {
	return (
		<Map
			pageTitle={title}
			pageRoutes={ROUTE.megaport[2025]}
			imageSrc={IMAGES.maps[2025]}
		/>
	);
};

export default Megaport2025Map;