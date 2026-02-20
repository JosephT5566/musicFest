'use client';
import React from 'react';

import { H1 } from '../../components/base/Typography';
import { APP_NAME } from '../../constants/static';
import { IMAGES } from '../../constants/images';
import Navigation from './Navigation';

export default function Header() {
	return (
		<div
			className="h-16 bg-secondary flex items-center justify-between px-4 md:px-8 border-b border-border"
		>
			<a
				href="/"
				className="flex gap-3 items-center h-full no-underline text-secondary-foreground hover:text-primary transition-colors"
			>
				<div className="h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden relative shrink-0">
					<img
						src={IMAGES.LOGO_SVG}
						alt="FesTime"
						aria-label="FesTime"
						className="w-full h-full object-cover"
					/>
				</div>
				<H1 className="text-xl md:text-2xl font-bold tracking-tight font-['Contrail_One']">
					{APP_NAME}
				</H1>
			</a>
			<Navigation />
		</div>
	);
}