'use client';
import React from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import UserLocationMap from 'components/UserLocationMap';
import useUserPosition from 'hooks/useUserPosition';

const mapUrl = 'https://cdn.josephtseng-tw.com/megaport2026/map.png';

const Megaport2026Map = () => {
	const { userCoords, loading, error } = useUserPosition();

	if (loading) {
		return <div>Loading map...</div>;
	}

	if (error) {
		// You can render the original map or show an error message
		return (
			<Gallery>
				<div className="mt-4 p-2">
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
				</div>
			</Gallery>
		);
	}

	if (userCoords) {
		return <UserLocationMap userCoords={userCoords} mapUrl={mapUrl} />;
	}

	return (
		<Gallery>
			<div className="mt-4 p-2">
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
			</div>
		</Gallery>
	);
};

export default Megaport2026Map;
