import React, { useState, createContext, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

interface showsProps {
	selectedShows: string[];
}

interface showsMethodsProps {
	handleSelectShow: (id: string) => void;
	resetShows: () => void;
}

const showsContext = createContext<showsProps>({} as showsProps); // default value
const showsMethodsContext = createContext<showsMethodsProps>({} as showsMethodsProps); // default value

interface Props {
	storageKey: string;
	children: React.ReactNode;
}

export default function ShowsProvider({ storageKey, children }: Props) {
	const router = useRouter();
	const [selectedShows, setSelectedShows] = useState<string[]>([]);

	useEffect(() => {
		const hash = window.location.hash;
		const storageValue = localStorage.getItem(storageKey);

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
		// console.log('selectedShows', selectedShows);
		localStorage.setItem(storageKey, JSON.stringify(selectedShows));
	}, [selectedShows]);

	const handleSelectShow = (id: string) => {
		// console.log('execute handleSelectShow');

		selectedShows.includes(id)
			? setSelectedShows((prev) => prev.filter((i) => i !== id))
			: setSelectedShows((prev) => [...prev, id]);
	};

	const resetShows = () => {
		setSelectedShows([]);
	};

	return (
		<showsContext.Provider value={{ selectedShows }}>
			<showsMethodsContext.Provider
				value={{
					handleSelectShow,
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
export const useResetShows = () => useContext(showsMethodsContext).resetShows;
