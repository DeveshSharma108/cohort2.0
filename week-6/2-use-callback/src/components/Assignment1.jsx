import { useCallback, useState,memo } from "react";

// Create a counter component with increment and decrement functions. Pass these functions to a child component which has buttons to perform the increment and decrement actions. Use useCallback to ensure that these functions are not recreated on every render.

export function Assignment1() {
    const [count, setCount] = useState(0);

    // Your code starts here
    const handleIncrement = useCallback(()=>{
        console.log('incremented')
        setCount(c=>c+1)
    },[])
 
    const handleDecrement = useCallback(()=>{
        console.log('decremented')
        setCount(c=>c-1)
    },[]) 
    
    // Your code ends here

    return (
        <div>
            <p>Count: {count}</p>
            <CounterButtons onIncrement={handleIncrement} onDecrement={handleDecrement} />
        </div>
    );
};


// memo is used to memoize a React functional component.
// It prevents unnecessary re-renders by ensuring that the component only re-renders if its props change ***(using a shallow comparison by default)***.
const CounterButtons = memo(function({ onIncrement, onDecrement }){
    console.log('hi hi')
    return (
    <div>
        <button onClick={onIncrement}>Increment</button>
        <button onClick={onDecrement}>Decrement</button>
    </div>)
});
