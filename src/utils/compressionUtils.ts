import pako from "pako";

/**
 * Compresses and encodes an array of strings.
 * @param data - Array of strings to encode.
 * @returns Base64 encoded compressed string.
 */
export function encodeData(data: string[]): string {
	// Convert array to a compact string format (using | as a delimiter)
	const jsonString = data.join('|');

	// Compress using Deflate
	const compressed = pako.deflate(jsonString);

	// Convert to Base64
	return btoa(String.fromCharCode(...compressed));
}

/**
 * Decodes and decompresses a Base64-encoded compressed string back into an array of strings.
 * @param base64String - Compressed Base64 string.
 * @returns Original array of strings.
 */
export function decodeData(base64String: string): string[] {
	// Convert Base64 to Uint8Array
	const compressed = Uint8Array.from(atob(base64String), (c) => c.charCodeAt(0));

	// Decompress using Inflate
	const decompressed = pako.inflate(compressed, { to: 'string' });

	// Convert back to an array
	return decompressed.split('|');
}

// pako+base64
// TODO: I think we don't need this after 2025 megaport
export function isPakoCompressed(base64String: string): boolean {
    try {
        // Convert Base64 to Uint8Array
        const binaryData = Uint8Array.from(atob(base64String), c => c.charCodeAt(0));

        // Check for zlib/Deflate magic bytes (78 9C or 78 DA)
        return binaryData[0] === 0x78 && (binaryData[1] === 0x9C || binaryData[1] === 0xDA);
    } catch (e) {
        return false; // If decoding fails, it's not valid Pako-compressed data
    }
}

// Example usage:
// const selectedShows = [
// 	'1:3:0',
// 	'0:3:0',
// 	'0:1:1',
// 	'0:0:0',
// 	'0:10:0',
// 	'1:2:1',
// 	'1:5:1',
// 	'1:2:4',
// 	'1:1:4',
// 	'1:1:5',
// ];
// const encoded = encodeData(selectedShows);
// console.log('Encoded:', encoded);

// const decoded = decodeData(encoded);
// console.log('Decoded:', decoded); // Should match `selectedShows`
