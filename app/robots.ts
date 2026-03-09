import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: '/private/', // Example of a disallow rule
		},
		sitemap: 'https://musicfest.josephtseng-tw.com/sitemap.xml',
	};
}
