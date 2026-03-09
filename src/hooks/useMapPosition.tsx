'use client';

interface UserCoords {
	lat: number;
	lng: number;
}

interface CornerCoords {
	lat: number;
	lng: number;
}

interface MapCorners {
	topLeft: CornerCoords;
	topRight: CornerCoords;
	bottomLeft: CornerCoords;
	bottomRight: CornerCoords;
}

interface useMapPositionProps {
	userCoords: UserCoords;
	mapCorners: MapCorners;
}

const useMapPosition = ({ userCoords, mapCorners }: useMapPositionProps) => {
	if (!userCoords || !mapCorners) {
		return { left: 0, top: 0 };
	}

	const { lat, lng } = userCoords;
	const { topLeft, topRight, bottomLeft, bottomRight } = mapCorners;

	// Inverse bilinear interpolation
	const a = topRight.lng - topLeft.lng;
	const b = bottomLeft.lng - topLeft.lng;
	const c = topLeft.lng - topRight.lng - bottomLeft.lng + bottomRight.lng;
	const g = lng - topLeft.lng;

	const d = topRight.lat - topLeft.lat;
	const e = bottomLeft.lat - topLeft.lat;
	const f = topLeft.lat - topRight.lat - bottomLeft.lat + bottomRight.lat;
	const h = lat - topLeft.lat;

	// Solve for v
	const A = c * e - b * f;
	const B = a * e - b * d + g * f - c * h;
	const C = g * d - a * h;

	let v;
	if (Math.abs(A) < 1e-6) {
		v = -C / B;
	} else {
		const discriminant = B * B - 4 * A * C;
		if (discriminant < 0) {
			return { left: 0, top: 0 }; // No real solution
		}
		const sqrtDiscriminant = Math.sqrt(discriminant);
		const v1 = (-B + sqrtDiscriminant) / (2 * A);
		const v2 = (-B - sqrtDiscriminant) / (2 * A);
		v = v1 >= 0 && v1 <= 1 ? v1 : v2;
	}

	// Solve for u
	const u = (g - b * v) / (a + c * v);

	const left = u * 100;
	const top = v * 100;

	// Constrain to image boundaries
	const constrainedLeft = Math.max(0, Math.min(100, left));
	const constrainedTop = Math.max(0, Math.min(100, top));

	return { left: constrainedLeft, top: constrainedTop };
};

export default useMapPosition;
