import React, { useState, createContext, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { STORAGE_KEY } from 'static';

interface showsProps {
	selectedShows: string[];
}

interface showsMethodsProps {
	handleSelectShow: (id: string) => void;
	getSelectedShowString: () => string;
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
		const storageValue = localStorage.getItem(STORAGE_KEY.shows);

		if (hash) {
			try {
				const dec = atob(hash.substring(1));
				setSelectedShows(JSON.parse(dec));
			} catch (error) {
				console.log('hash url decode err: ', error);
			}
			router.push(window.location.pathname);
			return;
		}

		if (storageValue) {
			JSON.parse(storageValue).length > 0 && setSelectedShows(JSON.parse(storageValue));
		}
	}, []);

	useEffect(() => {
		console.log('selectedShows', selectedShows);
		localStorage.setItem(STORAGE_KEY.shows, JSON.stringify(selectedShows));
	}, [selectedShows]);

	const handleSelectShow = (id: string) => {
		// console.log('execute handleSelectShow');

		selectedShows.includes(id)
			? setSelectedShows((prev) => prev.filter((i) => i !== id))
			: setSelectedShows((prev) => [...prev, id]);
	};

	const getSelectedShowString = () => {
		return selectedShows.length !== 0 ? JSON.stringify(selectedShows) : undefined;
	};

	const resetShows = () => {
		setSelectedShows([]);
	};

	return (
		<showsContext.Provider value={{ selectedShows }}>
			<showsMethodsContext.Provider
				value={{
					handleSelectShow,
					getSelectedShowString,
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
export const useGetSelectedShowString = () => useContext(showsMethodsContext).getSelectedShowString;
export const useResetShows = () => useContext(showsMethodsContext).resetShows;
