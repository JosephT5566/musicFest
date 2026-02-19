'use client';
import React from 'react';
import Map from 'components/Map';

import { ROUTE, FEST_NAME } from 'constants/static';
import { IMAGES } from 'constants/images';

const title = `${FEST_NAME.MEGAPORT} | 2024 | Map`;

const Megaport2024Map = () => {
	return (
		<Map
			pageTitle={title}
			pageRoutes={ROUTE.megaport[2024]}
			imageSrc={IMAGES.maps[2024]}
		/>
	);
};

export default Megaport2024Map;