import React from 'react';
import { H2 } from '../base/Typography';

export default function FestCard({
	name,
	href,
	image,
}: {
	name: string;
	href: string;
	image: string;
}) {
	return (
		<a className='fest-card w-full' href={href}>
			<div className="bg-white shadow-md rounded-md">
				<div
					className="image-container relative rounded-t-md"
				>
					<img
                        src={`${image}`}
                        alt={name}
                        className="w-full h-full object-center object-cover rounded-t-md aspect-[1.3] sm:aspect-square"
                    />
					<div
						className="fade-to-white absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-b from-transparent to-white"
					/>
				</div>
				<H2 className="p-2">
					{name}
				</H2>
			</div>
		</a>
	);
}