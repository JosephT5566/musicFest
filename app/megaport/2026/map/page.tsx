'use client';
import React from 'react';
import Map from 'components/Map';

import { ROUTE, FEST_NAME } from 'constants/static';
import { IMAGES } from 'constants/images';

const title = `${FEST_NAME.MEGAPORT} 2026 - Map`;

const Megaport2026Map = () => {
    return (
        <Map
            pageRoutes={ROUTE.megaport[2026]}
            imageSrc={IMAGES.maps[2025]}
        />
    );
};

export default Megaport2026Map;