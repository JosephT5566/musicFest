import React, { useEffect, useRef } from 'react';
import { useNavigation } from 'react-navi';

const Context = React.createContext(''); // default value

export function ShowsStore(props) {
	const navigation = useNavigation();
	const selectedShow = useRef({
		map: new Map(),
	});

	const handleSelectShow = (state, active) => {
		if (active) {
			selectedShow.current.map.set(state, state);
		} else {
			selectedShow.current.map.delete(state, state);
		}
	};

	const viewSelectedItems = () => {
		console.log('ref show:', selectedShow.current.map);
	};

	const getEncodeData = () => {
		const keys = Array.from(selectedShow.current.map.keys()).toString();
		return btoa(keys);
	};

	const getData = () => {
		const keys = Array.from(selectedShow.current.map.keys()).toString();
		return keys;
	};

	const isIDExist = (id) => {
		return selectedShow.current.map.has(id);
	};

	useEffect(() => {
		const url = navigation.getCurrentValue().url;
		const loadEncodeData = (encode) => {
			try {
				const dec = atob(encode);
				const arr = dec.split(',');
				arr.forEach((item) => selectedShow.current.map.set(item, item));
			} catch (error) {
				console.log('hash url decode err: ', error);

				navigation.navigate(url.pathname);
			}
		};

		if (url.hash !== '') {
			loadEncodeData(url.hash.substring(1));
		}
	}, [navigation]);

	return (
		<Context.Provider value={{ handleSelectShow, viewSelectedItems, getEncodeData, getData, isIDExist }}>
			{props.children}
		</Context.Provider>
	);
}

export default Context;
