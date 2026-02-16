import React from 'react';
import Typography from '@mui/material/Typography';
import { FEST_NAME } from 'constants/static';

export const metadata = {
	title: `FesTime - ${FEST_NAME.FUJI_ROCK}`,
};

export default function Fujirock() {
	return (
		<>
			<Typography variant="h1">Coming Soon...</Typography>
			{/* <PageContainer>
				<H1>{FEST_NAME.FUJI_ROCK}</H1>
				<PostersContainer>
					<PosterCard
						name="2021"
						href={ROUTE.megaport[2021].root}
						image={IMAGES.posters[2021]}
					/>
				</PostersContainer>
			</PageContainer> */}
		</>
	);
}
