'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useLockBodyScroll } from 'react-use';
import { AnimatePresence, m, LazyMotion, domAnimation } from 'framer-motion';
import { Search, SearchX, X, Check } from 'lucide-react';
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
	className,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [isOverlayVisible, setIsOverlayVisible] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const searchContainerRef = useRef<HTMLDivElement>(null);
	useLockBodyScroll(isOverlayVisible);

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

	const debouncedSearch = useMemo(
		() =>
			debounce((query: string) => {
				const trimmedQuery = query.trim();
				if (trimmedQuery) {
					const results = fuse.search(trimmedQuery);
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

	const handleConfirmSearch = () => {
		setIsOverlayVisible(false);
		inputRef.current?.blur();
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleConfirmSearch();
		}
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		handleConfirmSearch();
	};

	const handleToggleExpand = () => {
		if (!isExpanded) {
			// open the search.
			setIsExpanded(true);
		} else {
			// close the search.
			setInputValue('');
			onClear();
			inputRef.current?.focus();
			setIsExpanded(false);
			setIsOverlayVisible(false);
		}
	};

	const handleFocus = () => {
		setIsOverlayVisible(true);
	};

	const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		// Prevent collapsing when focus moves to another element within the search component
		if (
			searchContainerRef.current &&
			searchContainerRef.current.contains(event.relatedTarget as Node)
		) {
			return;
		}

		setIsOverlayVisible(false); // Always hide overlay on blur

		// Collapse the search bar only if the input is empty
		if (inputValue === '') {
			setIsExpanded(false);
		}
	};

	return (
		<>
			{isOverlayVisible && (
				<div
					className="fixed inset-0 bg-black/30 backdrop-blur-sm z-5"
					onClick={() => setIsOverlayVisible(false)}
				/>
			)}

			<LazyMotion features={domAnimation}>
				<form
					onSubmit={handleSubmit}
					className={cn('relative flex items-center w-full z-10', className)}
				>
					<div
						ref={searchContainerRef}
						className={cn('relative flex items-center w-full', className)}
					>
						<Button
							type="button"
							className="bg-white p-6 border border-gray-300 rounded-full z-10 flex-shrink-0"
							variant="outline"
							size="icon"
							onClick={handleToggleExpand}
						>
							{isExpanded ? <SearchX /> : <Search />}
						</Button>

						<AnimatePresence>
							{isExpanded && ( // Animated input field
								<m.div
									key="search-input"
									initial={{ width: '0%', opacity: 0, marginLeft: '0px' }}
									animate={{
										width: `calc(100% - 60px ${
											inputValue && isOverlayVisible ? '- 60px' : ''
										})`,
										opacity: 1,
										marginLeft: '8px',
									}}
									exit={{ width: '0%', opacity: 0, marginLeft: '0px' }}
									transition={{ duration: 0.3, ease: 'easeInOut' }}
									className="relative flex items-center flex-grow"
								>
									<Input
										ref={inputRef}
										type="search"
										value={inputValue}
										onChange={handleInputChange}
										onFocus={handleFocus}
										onBlur={handleBlur}
										onKeyDown={handleKeyDown}
										placeholder="搜尋演出"
										aria-label="Search artists"
										className="p-6 transition-all duration-300 ease-in-out w-full bg-white border border-gray-300 rounded-full focus-visible:ring-gray-600"
									/>
								</m.div>
							)}
						</AnimatePresence>

						<AnimatePresence>
							{isExpanded && inputValue && isOverlayVisible && (
								<m.div
									key="check-button"
									initial={{ opacity: 0, scale: 0.5 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.5 }}
									className="ml-2"
								>
									<Button
										type="button"
										variant="outline"
										size="icon"
										className="bg-white p-6 border border-gray-300 rounded-full"
										onClick={handleConfirmSearch}
									>
										<Check className="h-4 w-4" />
									</Button>
								</m.div>
							)}
						</AnimatePresence>
					</div>
				</form>
			</LazyMotion>
		</>
	);
};

export default ArtistSearchBar;
