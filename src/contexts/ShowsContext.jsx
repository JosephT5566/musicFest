import React, { useRef } from 'react';

const Context = React.createContext(''); // default value

export function ShowsStore(props) {
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

	const saveItemsForHashUrl = () => {
		return '123456'
	};

	return <Context.Provider value={{ handleSelectShow, viewSelectedItems, saveItemsForHashUrl }}>{props.children}</Context.Provider>;
}

export default Context;
