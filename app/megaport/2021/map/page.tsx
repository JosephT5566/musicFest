'use client';
import React from 'react';
import { Sheet } from 'lucide-react';

import { FixedButtonsContainer, PageContainer } from 'components/base/Container';
import { H1 } from 'components/base/Typography';
import { Button } from '@/components/ui/button';

import { ROUTE, FEST_NAME } from 'constants/static';
import { useRouter } from 'next/navigation';
import { IMAGES } from 'constants/images';

const title = `${FEST_NAME.MEGAPORT} | 2021 | Map`;

export default function Map() {
	const router = useRouter();

	return (
		<PageContainer>
			<H1>{title}</H1>
			<div className="w-full overflow-auto">
				<img
					src={IMAGES.maps[2021]}
					alt="mega map"
					className="w-[200%] md:w-full"
				/>
			</div>
			<FixedButtonsContainer>
				<Button
					size={'lg'}
					onClick={() => {
						router.push(ROUTE.megaport[2021].root);
					}}
					className="shadow-md"
				>
					<Sheet />
				</Button>
			</FixedButtonsContainer>
		</PageContainer>
	);
}