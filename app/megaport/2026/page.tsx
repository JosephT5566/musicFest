'use client';

import React from 'react';
import Page from 'components/PageV2';
import { ROUTE } from 'constants/static';
import { ARTISTS_2026, SCHEDULE_2026 } from 'assets/program/megaport2026';
import { Metadata } from 'next';

const festivalName = 'Megaport Festival - 2026';
const description =
	'FesTime: 2026 大港開唱看團規劃工具。查看演出時間表、自訂課表，排出最舒適的行程。';
const festivalUrl = 'https://musicfest.josephtseng-tw.com/megaport/2026';
const imageUrl = 'https://cdn.josephtseng-tw.com/megaport2026/map.png';

const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'MusicFestival',
	name: festivalName,
	startDate: SCHEDULE_2026[0].date,
	endDate: SCHEDULE_2026[SCHEDULE_2026.length - 1].date,
	location: {
		'@type': 'Place',
		name: '高雄駁二藝術特區',
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Kaohsiung',
			addressCountry: 'TW',
		},
	},
	image: [imageUrl],
	description: description,
	url: festivalUrl,
};

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: festivalName,
		description: description,
		openGraph: {
			title: festivalName,
			description: description,
			type: 'website',
			images: [imageUrl],
			siteName: 'FesTime',
			url: festivalUrl,
		},
	};
}

export default function Megaport2026Page() {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<Page
				schedule={SCHEDULE_2026}
				artists={ARTISTS_2026}
				pageRoutes={ROUTE.megaport[2026]}
				storageKey={'megaport2026'}
			/>
		</>
	);
}
