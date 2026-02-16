'use client';
import React from 'react';
import { Map as MapIcon } from 'lucide-react';

import { FixedButtonsContainer, PageContainer } from 'components/base/Container';
import { H1 } from 'components/base/Typography';
import { ShadowIconButton } from 'components/base/Button';

import { ROUTE, FEST_NAME } from 'constants/static';
import { useRouter } from 'next/navigation';
import { IMAGES } from 'constants/images';

const title = `${FEST_NAME.MEGAPORT} | 2022 | Map`;

export default function Map() {
	const router = useRouter();

	return (
		<PageContainer>
			<H1>{title}</H1>
			<div className="w-full overflow-auto">
				<img
					src={IMAGES.maps[2022]}
					alt="mega map"
					className="w-[200%] md:w-full"
				/>
			</div>
			<FixedButtonsContainer>
				<ShadowIconButton
					size={'lg'}
					onClick={() => {
						router.push(ROUTE.megaport[2022].root);
					}}
					className="shadow-md"
				>
					<MapIcon />
				</ShadowIconButton>
			</FixedButtonsContainer>
		</PageContainer>
	);
}
