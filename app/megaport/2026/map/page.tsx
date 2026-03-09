'use client';
import React, { useState, useEffect } from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import useUserPosition from 'hooks/useUserPosition';
import useMapPosition from 'hooks/useMapPosition';

const mapUrl = 'https://cdn.josephtseng-tw.com/megaport2026/map.png';

const mapCorners = {
	topLeft: { lat: 22.61723779395069, lng: 120.27966252101939 },
	topRight: { lat: 22.62299011341766, lng: 120.28281491578625 },
	bottomLeft: { lat: 22.61329875009478, lng: 120.2876577252819 },
	bottomRight: { lat: 22.6193717469295, lng: 120.29047203716598 },
};

const LocationPin = ({ top, left }: { top: number; left: number }) => (
	<div
		style={{
			position: 'absolute',
			left: `${left}%`,
			top: `${top}%`,
			width: '12px',
			height: '12px',
			backgroundColor: '#007AFF',
			borderRadius: '50%',
			transform: 'translate(-50%, -50%)', // 讓點點中心對準座標
			border: '2px solid white',
			boxShadow: '0 0 8px rgba(0,0,0,0.3)',
		}}
	/>
);

const Map = () => {
	const { userCoords, loading, error } = useUserPosition();

	if (loading) {
		return <div>Loading map...</div>;
	}

	const position = userCoords
		? useMapPosition({
				userCoords,
				mapCorners,
			})
		: null;

	return (
		<Gallery>
			<div className="mt-4 p-2" style={{ position: 'relative', width: '100%' }}>
				<Item original={mapUrl} width="1875" height="2560">
					{({ ref, open }) => (
						<img
							className="rounded-md"
							ref={ref}
							onClick={open}
							src={mapUrl}
							alt="Megaport 2026 Map"
						/>
					)}
				</Item>
				{!error && position && <LocationPin {...position} />}
			</div>
		</Gallery>
	);
};

const Megaport2026Map = () => {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return <>{isClient ? <Map /> : <div>Loading map...</div>}</>;
};

export default Megaport2026Map;
