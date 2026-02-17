import React from 'react';

import { PageContainer, PostersContainer } from 'components/base/Container';

import { ROUTE, FEST_NAME } from 'constants/static';
import { H1 } from 'components/base/Typography';
import { IMAGES } from 'constants/images';
import PosterCard from 'components/shared/PosterCard';

export const metadata = {
    title: `FesTime - ${FEST_NAME.MEGAPORT}`,
};

export default function Megaport() {
	return (
		<PageContainer>
			<H1>{FEST_NAME.MEGAPORT}</H1>
			<PostersContainer>
				<PosterCard
					name="2021"
					href={ROUTE.megaport[2021].root}
					image={IMAGES.posters[2021]}
				/>
				<PosterCard
					name="2022"
					href={ROUTE.megaport[2022].root}
					image={IMAGES.posters[2022]}
				/>
				<PosterCard
					name="2024"
					href={ROUTE.megaport[2024].root}
					image={IMAGES.posters[2024]}
				/>
				<PosterCard
					name="2025"
					href={ROUTE.megaport[2025].root}
					image={IMAGES.posters[2025]}
				/>
			</PostersContainer>
		</PageContainer>
	);
}
