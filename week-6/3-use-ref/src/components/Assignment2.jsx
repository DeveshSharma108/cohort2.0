import React, { useState, useCallback, useRef } from 'react';

// Create a component that tracks and displays the number of times it has been rendered. Use useRef to create a variable that persists across renders without causing additional renders when it changes.

export function Assignment2() {
    const [stateVar, forceRender] = useState(0);
    let countRef = useRef(0)
    const handleReRender = () => {
        // forceRender()  // interesting observations 
        forceRender(stateVar+1)
        countRef.current = countRef.current + 1
        console.log(countRef.current)
    };

    return (
        <div>
            <p>This component has rendered {countRef.current} times.</p>
            <button onClick={handleReRender}>Force Re-render</button>
        </div>
    );
};