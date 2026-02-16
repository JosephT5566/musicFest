'use client';
import React from 'react';
import { TableChart } from 'lucide-react';

import { FixedButtonsContainer, PageContainer } from 'components/base/Container';
import { H1 } from 'components/base/Typography';
import { Button } from '@/components/ui/button';

import { useRouter } from 'next/navigation';
import { useIsMobileNavEnable } from 'hooks/navigationUtils';
import MobileBottomNav from 'components/shared/MobileBottomNav';
import { PageRoutes } from 'types/navigation';

type MapProps = {
	headerTitle: string;
	pageTitle: string;
	imageSrc?: string;
	pageRoutes: PageRoutes;
};

export default function Map({ headerTitle, pageTitle, imageSrc, pageRoutes }: MapProps) {
	const router = useRouter();
	const isMobileNavEnable = useIsMobileNavEnable();

	return (
		<PageContainer>
			<H1>{imageSrc ? pageTitle : 'COMING SOON...'}</H1>
			{imageSrc && (
				<div className="w-full overflow-auto">
					<img
						src={imageSrc}
						alt="mega map"
						className="w-[200%] md:w-full"
					/>
				</div>
			)}
			<FixedButtonsContainer>
				{/* The MobileBottomNav handles its own visibility */}
				<Button
					size={'lg'}
					onClick={() => {
						router.push(pageRoutes.root);
					}}
					className="shadow-md"
				>
					<TableChart />
				</Button>
			</FixedButtonsContainer>
			<MobileBottomNav routes={pageRoutes} />
		</PageContainer>
	);
}