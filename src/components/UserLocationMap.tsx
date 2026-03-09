'use client';
import React from 'react';

interface UserCoords {
  lat: number;
  lng: number;
}

interface UserLocationMapProps {
  userCoords: UserCoords;
  mapUrl: string;
}

const MAP_BOUNDS = {
	top: 25.042, // latMax
	bottom: 25.04, // latMin
	left: 121.53, // lngMin
	right: 121.535, // lngMax
};

function UserLocationMap({ userCoords, mapUrl }: UserLocationMapProps) {
	// 計算百分比
	const left = ((userCoords.lng - MAP_BOUNDS.left) / (MAP_BOUNDS.right - MAP_BOUNDS.left)) * 100;
	const top = ((MAP_BOUNDS.top - userCoords.lat) / (MAP_BOUNDS.top - MAP_BOUNDS.bottom)) * 100;

	// 限制點點不要跑出圖片邊界
	const constrainedLeft = Math.max(0, Math.min(100, left));
	const constrainedTop = Math.max(0, Math.min(100, top));

	return (
		<div style={{ position: 'relative', width: '100%' }}>
			{/* 活動地圖圖檔 */}
			<img src={mapUrl} style={{ width: '100%', display: 'block' }} alt="Map" />

			{/* 用戶位置藍點 */}
			<div
				style={{
					position: 'absolute',
					left: `${constrainedLeft}%`,
					top: `${constrainedTop}%`,
					width: '12px',
					height: '12px',
					backgroundColor: '#007AFF',
					borderRadius: '50%',
					transform: 'translate(-50%, -50%)', // 讓點點中心對準座標
					border: '2px solid white',
					boxShadow: '0 0 8px rgba(0,0,0,0.3)',
				}}
			/>
		</div>
	);
}

export default UserLocationMap;
