'use client';

import React, { useState } from 'react';
import { ARTISTS_2026 } from 'assets/program/megaport2026';
import { IArtistV2 } from 'types/show';
import { useSelectShow, useGetSelectedShow } from 'providers/ShowsProvider';
import { Card, CardContent } from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from 'lib/utils';
import moment from 'moment';

const ArtistCard = React.forwardRef<
	HTMLDivElement,
	{ artist: IArtistV2 } & React.HTMLAttributes<HTMLDivElement>
>(({ artist, className, ...props }, ref) => {
	const [isLoading, setIsLoading] = useState(true);
	const selectedShows = useGetSelectedShow();
	const isSelected = selectedShows.includes(artist.id);

	return (
		<Card ref={ref} className={cn('cursor-pointer', className)} {...props}>
			<CardContent className="p-0">
				<div className="relative aspect-square">
					{isSelected && (
						<div className="absolute top-2 right-2 z-10">
							<BookmarkCheck className="text-green-600" />
						</div>
					)}
					{isLoading && <Skeleton className="absolute inset-0" />}
					<img
						src={artist.imgUrl || 'https://placehold.co/300x300/png'}
						alt={artist.name}
						onLoad={() => setIsLoading(false)}
						onError={() => setIsLoading(false)}
						className="rounded-t-lg w-full h-full object-cover"
					/>
				</div>
				<div className="p-4">
					<h3 className="font-bold text-lg">{artist.name}</h3>
				</div>
			</CardContent>
		</Card>
	);
});
ArtistCard.displayName = 'ArtistCard';

export default function LineupPage() {
	const [selectedArtist, setSelectedArtist] = useState<IArtistV2 | null>(null);
	const selectShow = useSelectShow();
	const selectedShows = useGetSelectedShow();

	const handleOpenChange = (open: boolean) => {
		if (!open) {
			setSelectedArtist(null);
		}
	};

	return (
		<Dialog onOpenChange={handleOpenChange}>
			<div className="container mx-auto p-4 pb-20 md:pb-4">
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{ARTISTS_2026.map((artist) => (
						<DialogTrigger
							key={artist.id}
							asChild
							onClick={() => setSelectedArtist(artist)}
						>
							<ArtistCard artist={artist} />
						</DialogTrigger>
					))}
				</div>
			</div>
			{selectedArtist && (
				<DialogContent className="p-0">
					<div className="relative">
						<div className="relative aspect-video">
							<img
								src={selectedArtist.imgUrl || 'https://placehold.co/600x400/png'}
								alt={selectedArtist.name}
								className="w-full h-full object-cover rounded-t-lg"
							/>
						</div>
						<div className="absolute top-2 right-2">
							<Button
								onClick={() => selectShow(selectedArtist.id)}
								variant="outline"
								size="icon"
							>
								{selectedShows.includes(selectedArtist.id) ? (
									<BookmarkCheck className="text-green-600" />
								) : (
									<Bookmark />
								)}
							</Button>
						</div>
					</div>
					<div className="p-3">
						<DialogHeader>
							<DialogTitle className="font-bold text-xl">
								{selectedArtist.name}
							</DialogTitle>
						</DialogHeader>
						<DialogDescription className="mt-3">
							{selectedArtist.description}
						</DialogDescription>
						<div className="pt-3">
							{selectedArtist.stageName && (
								<p>
									<strong> {selectedArtist.stageName}</strong>
								</p>
							)}
							{selectedArtist.startTime && selectedArtist.endTime && (
								<p>
									<strong>
										{moment(selectedArtist.startTime).format('HH:mm')} -{' '}
										{moment(selectedArtist.endTime).format('HH:mm')}{' '}
									</strong>
								</p>
							)}
						</div>
					</div>
				</DialogContent>
			)}
		</Dialog>
	);
}
