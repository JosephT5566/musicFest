'use client';
import React from 'react';

import { H1 } from '../../components/base/Typography';
import { APP_NAME } from '../../constants/static';
import { IMAGES } from '../../constants/images';

export default function Header() {
	return (
		<div
			className="h-16 bg-secondary-main flex items-center justify-between px-8 pr-16"
		>
			<a
				href="/"
				className="flex gap-4 items-center h-full no-underline text-secondary-foreground hover:text-primary-main"
			>
				<div className="h-full rounded-full overflow-hidden aspect-square">
					<img
						src={IMAGES.LOGO_SVG}
						alt="FesTime"
						aria-label="FesTime"
						height={48}
						width={48}
						className="w-full"
					/>
				</div>
				<H1 className="text-[2.5rem]">
					{APP_NAME}
				</H1>
			</a>
			{/* <Navigation /> */}
		</div>
	);
}