'use client';
import React, { useState, useEffect } from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import useUserPosition from 'hooks/useUserPosition';
import useMapPosition from 'hooks/useMapPosition';

const mapUrl = 'https://cdn.josephtseng-tw.com/megaport2026/map.png';

const mapBounds = {
	top: 22.622491,
	bottom: 22.613466,
	left: 120.28285,
	right: 120.28743,
};

const rotationAngle = 61.88;

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
				mapBounds,
				rotationAngle,
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
