import React, { useEffect, useState } from 'react';
import { Map } from 'immutable';
const Context = React.createContext(''); // default value

export function ShowsStore(props) {
	const [selectedShow, setSelectedShow] = useState(Map({}));

	const handleSelectShow = (state, active) => {
		if (active) {
			setSelectedShow((prev) => prev.set(state, state));
		} else {
			setSelectedShow((prev) => prev.delete(state));
		}
	};

	useEffect(() => {
		console.log('selected show:', selectedShow);
	}, [selectedShow]);

	return <Context.Provider value={{ handleSelectShow }}>{props.children}</Context.Provider>;
}

export default Context;
