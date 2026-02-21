'use client';

import React, { useState, useMemo } from 'react';
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
	DialogClose,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Bookmark, BookmarkCheck, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ArtistSearchBar from 'components/shared/ArtistSearchBar';
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
						<div className="absolute top-2 right-2 z-10 backdrop-blur-sm bg-white/40 rounded-full p-2">
							<BookmarkCheck className="text-green-600 h-4 w-4" />
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
	const [filteredArtistIds, setFilteredArtistIds] = useState<string[] | null>(null);

	const handleOpenChange = (open: boolean) => {
		if (!open) {
			setSelectedArtist(null);
		}
	};

	const searchResults = useMemo(() => {
		if (filteredArtistIds === null) {
			return new Set(ARTISTS_2026.map((artist) => artist.id));
		}
		return new Set(filteredArtistIds);
	}, [filteredArtistIds]);

	const handleSearchResults = (results: string[]) => {
		setFilteredArtistIds(results);
	};

	const handleClear = () => {
		setFilteredArtistIds(null);
	};

	return (
		<Dialog onOpenChange={handleOpenChange}>
			<div className="container mx-auto p-4 pt-0 pb-20 md:pb-4">
				<div className="sticky top-0 z-20 mb-4 pt-4 flex justify-start">
					<ArtistSearchBar
						className="w-full"
						artists={ARTISTS_2026}
						onSearchResults={handleSearchResults}
						onClear={handleClear}
					/>
				</div>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{ARTISTS_2026.map((artist) => (
						<DialogTrigger
							key={artist.id}
							asChild
							onClick={() => setSelectedArtist(artist)}
							className={!searchResults.has(artist.id) ? 'hidden' : ''}
						>
							<ArtistCard artist={artist} />
						</DialogTrigger>
					))}
				</div>
			</div>
			{selectedArtist && (
				<DialogContent className="p-0 max-h-[80dvh] overflow-y-auto gap-0">
					<div className="relative">
						<div className="relative aspect-4/3">
							<img
								src={selectedArtist.imgUrl || 'https://placehold.co/600x400/png'}
								alt={selectedArtist.name}
								className="w-full h-full object-cover rounded-t-lg object-top"
							/>
						</div>
						<DialogClose className="absolute top-2 right-2">
							<X className="h-6 w-6 bg-white rounded-full p-1"></X>
						</DialogClose>
					</div>
					<div className="p-3 sticky top-0 z-10 flex justify-between items-center">
						<div className="px-1 shadow-md bg-background rounded">
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
					<div className="p-3">
						<DialogHeader>
							<DialogTitle className="font-bold text-xl">
								{selectedArtist.name}
							</DialogTitle>
						</DialogHeader>
						<DialogDescription className="mt-3" asChild>
							<div
								className="whitespace-pre-wrap"
								dangerouslySetInnerHTML={{
									__html: selectedArtist.description || '',
								}}
							/>
						</DialogDescription>
					</div>
				</DialogContent>
			)}
		</Dialog>
	);
}
