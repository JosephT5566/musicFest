import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import { STORAGE_KEY } from '../static';

const Context = React.createContext(''); // default value

export function ShowsStore(props) {
	const router = useRouter();
	const selectedShow = useRef({
		map: new Map(),
	});

	const handleSelectShow = (state, active) => {
		let storageValue = localStorage.getItem(STORAGE_KEY.shows)
			? localStorage.getItem(STORAGE_KEY.shows).split(',')
			: [];
		if (active) {
			selectedShow.current.map.set(state, state);

			localStorage.setItem(STORAGE_KEY.shows, [...storageValue, state]);
		} else {
			selectedShow.current.map.delete(state, state);

			const newValue = storageValue.filter((value) => value !== state);
			localStorage.setItem(STORAGE_KEY.shows, newValue);
		}
	};

	const viewSelectedItems = () => {
		console.log('ref show:', selectedShow.current.map);
	};

	const getData = () => {
		const keys = Array.from(selectedShow.current.map.keys()).toString();
		return keys;
	};

	const isIDExist = (id) => {
		return selectedShow.current.map.has(id);
	};

	const resetData = () => {
		selectedShow.current.map.clear();
	};

	useEffect(() => {
		const hash = window.location.hash;
		const defaultHash = localStorage.getItem(STORAGE_KEY.defaultHash);
		const storageValue = localStorage.getItem(STORAGE_KEY.shows);

		const loadFromUrl = (encode) => {
			try {
				const dec = atob(encode);
				const arr = dec.split(',');
				arr.forEach((item) => selectedShow.current.map.set(item, item));
				localStorage.setItem(STORAGE_KEY.defaultHash, encode);
			} catch (error) {
				console.log('hash url decode err: ', error);

				router.push(window.location.pathname);
			}
		};

		const loadFromStorage = () => {
			if (!storageValue) return;

			storageValue.split(',').forEach((item) => selectedShow.current.map.set(item, item));
		};

		if (hash !== '' && hash.substring(1) !== defaultHash) {
			loadFromUrl(hash.substring(1));
		} else {
			loadFromStorage();
		}
	}, []);

	return (
		<Context.Provider value={{ handleSelectShow, viewSelectedItems, getData, resetData, isIDExist }}>
			{props.children}
		</Context.Provider>
	);
}

export default Context;
