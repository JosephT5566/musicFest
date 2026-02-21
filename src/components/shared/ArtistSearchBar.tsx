'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { AnimatePresence, m, LazyMotion, domAnimation } from 'framer-motion';
import { Search, X } from 'lucide-react';
import Fuse from 'fuse.js';
import debounce from 'lodash/debounce';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IArtistV2 } from 'types/show';
import { cn } from 'lib/utils';

interface ArtistSearchBarProps {
	artists: IArtistV2[];
	onSearchResults: (results: string[]) => void;
	onClear: () => void;
    className?: string;
}

const ArtistSearchBar: React.FC<ArtistSearchBarProps> = ({
	artists,
	onSearchResults,
	onClear,
    className
}) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);
	const searchContainerRef = useRef<HTMLDivElement>(null);

	const fuse = useMemo(
		() =>
			new Fuse(artists, {
				keys: ['name'],
				threshold: 0.3,
			}),
		[artists],
	);

	useEffect(() => {
		if (isExpanded && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isExpanded]);

	useEffect(() => {
		const handleScroll = () => {
			if (isExpanded && inputValue === '') {
				setIsExpanded(false);
			}
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [isExpanded, inputValue]);

	const debouncedSearch = useMemo(
		() =>
			debounce((query: string) => {
				if (query) {
					const results = fuse.search(query);
					onSearchResults(results.map((result) => result.item.id));
				} else {
					onClear();
				}
			}, 300),
		[fuse, onSearchResults, onClear],
	);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const query = event.target.value;
		setInputValue(query);
		debouncedSearch(query);
	};

	const handleClear = () => {
		setInputValue('');
		onClear();
		inputRef.current?.focus();
	};

	const handleExpand = () => {
		setIsExpanded(true);
	};

	const handleBlur = () => {
		if (inputValue === '') {
			setIsExpanded(false);
		}
	};

	return (
		<LazyMotion features={domAnimation}>
			<div
				ref={searchContainerRef}
				className={cn("relative flex items-center justify-start w-full", className)}
			>
				<AnimatePresence>
					{isExpanded ? (
						<m.div
							key="search-input"
							initial={{ width: '44px' }}
							animate={{ width: '100%' }}
							exit={{ width: '44px' }}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
							className="relative w-full flex items-center"
						>
							<Input
								ref={inputRef}
								type="text"
								value={inputValue}
								onChange={handleInputChange}
								onBlur={handleBlur}
								placeholder="Search artists..."
								className="p-6 transition-all duration-300 ease-in-out w-full bg-white border border-gray-300 rounded-full focus-visible:ring-gray-600"
							/>
							{inputValue && (
								<Button
									variant="ghost"
									size="icon"
									className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
									onClick={handleClear}
								>
									<X className="h-4 w-4" />
								</Button>
							)}
						</m.div>
					) : (
						<m.div
							key="search-button"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<Button
								className="bg-white p-6 border border-gray-300 rounded-full"
								variant="outline"
								size="icon"
								onClick={handleExpand}
							>
								<Search />
							</Button>
						</m.div>
					)}
				</AnimatePresence>
			</div>
		</LazyMotion>
	);
};

export default ArtistSearchBar;
