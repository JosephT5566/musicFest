import React from 'react';
import Map from 'components/Map';

import { APP_NAME, ROUTE } from 'constants/static';
import { IMAGES } from 'constants/images';

const Megaport2024Map = () => {
	return (
		<Map
			headerTitle={`${APP_NAME} | 2024 | 地圖`}
			pageTitle={'2024 MEGAPORT'}
			pageRoute={ROUTE.megaport2024.root}
			imageSrc={IMAGES.maps[2024]}
		/>
	);
};

export default Megaport2024Map;