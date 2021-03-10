import React, { useEffect, useState } from 'react';
const Context = React.createContext(''); // default value

export function ShowsStore(props) {
	const [selectedShow, setSelectedShow] = useState({});
	const handleSelectShow = (state) => setSelectedShow((prev) => ({ ...prev, state }));

	useEffect(() => {
		console.log(selectedShow);
	}, [selectedShow]);

	return <Context.Provider value={{ selectedShow, handleSelectShow }}>{props.children}</Context.Provider>;
}

export default Context;
