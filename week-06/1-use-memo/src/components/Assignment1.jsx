import { useMemo, useState } from "react";

// In this assignment, your task is to create a component that performs an expensive calculation (finding the factorial) based on a user input. 
// Use useMemo to ensure that the calculation is only recomputed when the input changes, not on every render.

export function Assignment1() {
    const [input, setInput] = useState(0);
    // Your solution starts here
    // how to only rerender when calculate button is clicked and input is changed
    function factorial(n){
        if (n<0) {
            return undefined
        }
        let fac = 1
        while (n>0) {
            fac = fac * n
            n = n - 1
        }
        return fac
    }
    const expensiveValue = useMemo(() => {return factorial(input)}, [input])
    return (
        <div>
            <input 
                type="number" 
                value={input} 
                onChange={(e) => setInput(Number(e.target.value))} 
            />
            <p>Calculated Value: {expensiveValue}</p>
        </div>
    );
}