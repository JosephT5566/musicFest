import React from 'react';
import { H1 } from '../base/Typography';

export default function PosterCard({
	name,
	href,
	image,
}: {
	name: string;
	href: string;
	image: string;
}) {
	return (
		<a className='poster-card w-full max-w-[15em]' href={href}>
			<div className="bg-white shadow-md rounded-md">
				<div
					className="image-container relative flex items-center justify-center h-[20em] w-full overflow-hidden rounded-md"
					style={{
						backgroundImage: `url("${image}")`,
						backgroundPosition: 'center',
						backgroundSize: 'cover',
						boxShadow: 'rgb(55, 65, 81) 4px 4px 10px 0px',
						color: 'white',
					}}
				>
					<div
						className="absolute bg-gray-900 opacity-30 w-full h-full top-0 left-0"
					/>

					<H1 className="z-10 p-2 text-h1 hover:text-6xl focus:text-6xl transition-all duration-500">
						{name}
					</H1>
				</div>
			</div>
		</a>
	);
}