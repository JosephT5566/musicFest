import React, { useState, createContext, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { STORAGE_KEY } from 'static';

interface showsProps {
	selectedShows: string[];
}

interface showsMethodsProps {
	handleSelectShow: (id: string) => void;
	getShowsString: () => string;
	resetShows: () => void;
}

const showsContext = createContext<showsProps>({} as showsProps); // default value
const showsMethodsContext = createContext<showsMethodsProps>({} as showsMethodsProps); // default value

interface Props {
	children: React.ReactNode;
}

export default function ShowsProvider({ children }: Props) {
	const router = useRouter();
	const [selectedShows, setSelectedShows] = useState<string[]>([]);

	useEffect(() => {
		const hash = window.location.hash;
		const defaultHash = localStorage.getItem(STORAGE_KEY.defaultHash);
		const storageValue = localStorage.getItem(STORAGE_KEY.shows);

		const loadFromUrl = (encode: string) => {
			try {
				const dec = atob(encode);
				const selectedArr = dec.split(',');
				setSelectedShows(selectedArr);

				localStorage.setItem(STORAGE_KEY.defaultHash, encode);
			} catch (error) {
				console.log('hash url decode err: ', error);

				router.push(window.location.pathname);
			}
		};

		const loadFromStorage = () => {
			if (!storageValue) return;

			setSelectedShows(storageValue.split(','));
		};

		if (hash !== '' && hash.substring(1) !== defaultHash) {
			loadFromUrl(hash.substring(1));
		} else {
			loadFromStorage();
		}
	}, []);

	const handleSelectShow = (id: string) => {
		console.log('execute handleSelectShow');

		// let storageValue = localStorage.getItem(STORAGE_KEY.shows)
		// 	? localStorage.getItem(STORAGE_KEY.shows).split(',')
		// 	: [];
		if (!selectedShows.includes(id)) {
			setSelectedShows((prev) => [...prev, id]);

			// localStorage.setItem(STORAGE_KEY.shows, JSON.stringify([...storageValue, id]));
		} else {
			setSelectedShows((prev) => prev.filter((i) => i !== id));

			// const newValue = storageValue.filter((value) => value !== id);
			// localStorage.setItem(STORAGE_KEY.shows, JSON.stringify(newValue));
		}
	};

	const getShowsString = () => {
		return selectedShows.length !== 0 ? selectedShows.join(',') : undefined;
	};

	const resetShows = () => {
		setSelectedShows([]);
	};

	// useEffect(() => {
	// 	console.log('selectedShows', selectedShows.join(','));
	// }, [selectedShows]);

	return (
		<showsContext.Provider value={{ selectedShows }}>
			<showsMethodsContext.Provider
				value={{
					handleSelectShow,
					getShowsString,
					resetShows,
				}}
			>
				{children}
			</showsMethodsContext.Provider>
		</showsContext.Provider>
	);
}

export const useGetSelectedShow = () => useContext(showsContext).selectedShows;

export const useSelectShow = () => useContext(showsMethodsContext).handleSelectShow;
export const useGetShowsString = () => useContext(showsMethodsContext).getShowsString;
export const useResetShows = () => useContext(showsMethodsContext).resetShows;
