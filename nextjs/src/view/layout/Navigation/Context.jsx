import React, { useState } from 'react';
const Context = React.createContext(null); // default value

export function CurrentIndexStore(props) {
    const [currentIndex, setCurrentIndex] = useState(null);
    const onIndexChange = (currentIndex) => setCurrentIndex(currentIndex);

    return (
        <Context.Provider value={{ currentIndex, onIndexChange }}>
            {props.children}
        </Context.Provider>
    );
}

export default Context;
