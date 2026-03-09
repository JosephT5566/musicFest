'use client';

interface UserCoords {
	lat: number;
	lng: number;
}

interface MapBounds {
	top: number;
	bottom: number;
	left: number;
	right: number;
}

interface useMapPositionProps {
	userCoords: UserCoords;
	mapBounds: MapBounds;
	rotationAngle: number;
}

const useMapPosition = ({ userCoords, mapBounds, rotationAngle }: useMapPositionProps) => {
	// 1. Calculate initial position in percentages
	const initialLeft =
		((userCoords.lng - mapBounds.left) / (mapBounds.right - mapBounds.left)) * 100;
	const initialTop =
		((mapBounds.top - userCoords.lat) / (mapBounds.top - mapBounds.bottom)) * 100;

	// 2. Translate to be relative to the center (50, 50)
	const x = initialLeft - 50;
	const y = initialTop - 50;

	// 3. Apply rotation
	const angleRad = (rotationAngle * Math.PI) / 180;
	const cosAngle = Math.cos(angleRad);
	const sinAngle = Math.sin(angleRad);

	const rotatedX = x * cosAngle - y * sinAngle;
	const rotatedY = x * sinAngle + y * cosAngle;

	// 4. Translate back to be relative to the top-left corner
	const finalLeft = rotatedX + 50;
	const finalTop = rotatedY + 50;

	// 5. Constrain the point to stay within the image boundaries
	const constrainedLeft = Math.max(0, Math.min(100, finalLeft));
	const constrainedTop = Math.max(0, Math.min(100, finalTop));

	return { left: constrainedLeft, top: constrainedTop };
};

export default useMapPosition;
