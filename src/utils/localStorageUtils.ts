export function setLSWithExpiry(key: string, value: string, ttl: number): void {
	const now = new Date();
	const item = {
		value: value,
		expiry: now.getTime() + ttl,
	};
	localStorage.setItem(key, JSON.stringify(item));
}

// Helper function to get an item and check expiration
export function getLSWithExpiry(key: string): string | null {
	const itemStr = localStorage.getItem(key);

	// Return null if the item doesn't exist
	if (!itemStr) {
		return null;
	}

	const item = JSON.parse(itemStr);
	const now = new Date();

	// Compare the expiry time of the item with the current time
	if (now.getTime() > item.expiry) {
		// If the item is expired, delete it from storage and return null
		localStorage.removeItem(key);
		return null;
	}

	return item.value;
}
