'use client';
import React from 'react';
import { useIsMobileNavEnable } from 'hooks/navigationUtils';

export const ContentContainer = (props: { children: React.ReactNode }) => (
	<div
		className="min-h-[calc(100vh_-_theme(spacing.16))]" // Assuming header height is 16 units (64px)
		{...props}
	/>
);

export const PageContainer = ({
	children,
	selectPage,
}: {
	children: React.ReactNode;
	selectPage?: boolean;
}) => {
	const isMobileNavEnable = useIsMobileNavEnable();
	return (
		<div
			className={`flex flex-col items-center relative gap-4 py-4
				${isMobileNavEnable ? 'pb-16' : 'pb-4'}
				px-2 sm:px-4
				${selectPage ? 'max-h-[calc(100vh_-_theme(spacing.16))]' : ''}
			`}
		>
			{children}
		</div>
	);
};

export const SelectPageContainer = ({ children }: { children: React.ReactNode }) => (
	<PageContainer selectPage>{children}</PageContainer>
);

export const PostersContainer = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="poster-container grid w-full gap-4 sm:gap-8 justify-items-center grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(15em,1fr))] px-4 sm:px-0">
			{children}
		</div>
	);
};

export const FixedButtonsContainer = ({ children }: { children: React.ReactNode }) => {
	const isMobileNavEnable = useIsMobileNavEnable();
	return (
		<div
			className={`fixed-buttons-container flex flex-col gap-2 items-end right-8 z-50
				${isMobileNavEnable ? 'bottom-20' : 'bottom-8'}
			`}
		>
			{children}
		</div>
	);
};
