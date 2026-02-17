import React from 'react';

import { PageContainer } from 'components/base/Container';

import { FEST_NAME, ROUTE } from 'constants/static';
import { H1 } from 'components/base/Typography';
import FestCard from 'components/shared/FestCard';
import { FEST_LOGO } from 'constants/images';

export const metadata = {
	title: 'FesTime',
};

export default function Home() {
	return (
		<PageContainer>
			<H1>Festivals</H1>
			<div className="w-full px-8 sm:px-0 grid grid-cols-[repeat(auto-fill,minmax(15em,1fr))] gap-8 justify-items-center">
				<FestCard
					name={FEST_NAME.MEGAPORT}
					href={ROUTE.megaport.index.root}
					image={FEST_LOGO.megaport}
				/>
				{/* <FestCard
					name={FEST_NAME.FUJI_ROCK}
					href={ROUTE.fujirock.index.root}
					image={FEST_LOGO.fujirock}
				/> */}
			</div>
		</PageContainer>
	);
}
