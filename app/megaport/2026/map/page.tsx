'use client';
import React from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';

const mapUrl = 'https://cdn.josephtseng-tw.com/megaport2026/map.png';

const Megaport2026Map = () => {
	return (
		<Gallery>
			<div className="mt-4 p-2">
				<Item original={mapUrl} width="1875" height="2560">
					{({ ref, open }) => (
						<img className='rounded-md' ref={ref} onClick={open} src={mapUrl} alt="Megaport 2026 Map" />
					)}
				</Item>
			</div>
		</Gallery>
	);
};

export default Megaport2026Map;
