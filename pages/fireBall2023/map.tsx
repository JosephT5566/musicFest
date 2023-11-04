import React from 'react';
import Map from 'components/Map';

import { APP_NAME, ROUTE } from 'constants/static';
import { IMAGES } from 'constants/images';

const FireBall2023Map = () => {
	return (
		<Map
			headerTitle={`${APP_NAME} | 2021 | 地圖`}
			pageTitle={'2021 MEGAPORT'}
			pageRoute={ROUTE.megaport2021.root}
			imageSrc={IMAGES.maps[2021]}
		/>
	);
};

export default FireBall2023Map;
