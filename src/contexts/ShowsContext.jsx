import React, { useEffect, useRef } from 'react';
import { useNavigation } from 'react-navi';

import { STORAGE_KEY } from '../utils/static';

const Context = React.createContext(''); // default value

export function ShowsStore(props) {
	const navigation = useNavigation();
	const selectedShow = useRef({
		map: new Map(),
	});

	const handleSelectShow = (state, active) => {
		let storageValue = localStorage.getItem(STORAGE_KEY) ? localStorage.getItem(STORAGE_KEY).split(',') : [];
		if (active) {
			selectedShow.current.map.set(state, state);

			localStorage.setItem(STORAGE_KEY, [...storageValue, state]);
		} else {
			selectedShow.current.map.delete(state, state);

			const newValue = storageValue.filter((value) => value !== state);
			localStorage.setItem(STORAGE_KEY, newValue);
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
		const url = navigation.getCurrentValue().url;
		const loadFromUrl = (encode) => {
			try {
				const dec = atob(encode);
				const arr = dec.split(',');
				arr.forEach((item) => selectedShow.current.map.set(item, item));
			} catch (error) {
				console.log('hash url decode err: ', error);

				navigation.navigate(url.pathname);
			}
		};

		const loadFromStorage = () => {
			const value = localStorage.getItem(STORAGE_KEY);
			if (!value) return;

			value.split(',').forEach((item) => selectedShow.current.map.set(item, item));
		};

		if (url.hash !== '') {
			loadFromUrl(url.hash.substring(1));
		} else {
			loadFromStorage();
		}
	}, [navigation]);

	return (
		<Context.Provider value={{ handleSelectShow, viewSelectedItems, getData, resetData, isIDExist }}>
			{props.children}
		</Context.Provider>
	);
}

export default Context;
