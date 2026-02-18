'use client';
import React from 'react';
import { Sheet } from 'lucide-react';

import { FixedButtonsContainer, PageContainer } from 'components/base/Container';
import { H1 } from 'components/base/Typography';
import { ShadowIconButton } from 'components/base/Button';

import { useRouter } from 'next/navigation';
import { useIsMobileNavEnable } from 'hooks/navigationUtils';
import MobileBottomNav from 'components/shared/MobileBottomNav';
import { PageRoutes } from 'types/navigation';

type MapProps = {
	pageTitle?: string;
	imageSrc?: string;
	pageRoutes: PageRoutes;
};

export default function Map({ pageTitle, imageSrc, pageRoutes }: MapProps) {
	const router = useRouter();
	const isMobileNavEnable = useIsMobileNavEnable();

	return (
		<PageContainer>
			{pageTitle && <H1>{imageSrc ? pageTitle : 'COMING SOON...'}</H1>}
			{imageSrc && (
				<div className="w-full overflow-auto">
					<img src={imageSrc} alt="mega map" className="w-[200%] md:w-full max-w-none" />
				</div>
			)}
			<FixedButtonsContainer>
				{/* The MobileBottomNav handles its own visibility */}
				{!isMobileNavEnable && (
					<ShadowIconButton
						onClick={() => {
							router.push(pageRoutes.root);
						}}
					>
						<Sheet />
					</ShadowIconButton>
				)}
			</FixedButtonsContainer>
			<MobileBottomNav routes={pageRoutes} />
		</PageContainer>
	);
}
