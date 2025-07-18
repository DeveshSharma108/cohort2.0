
import {useEffect, useState} from "react"
import throttle from "lodash.throttle"

/*
Throttling vs. Debouncing (Brief Explanation)

✅ Throttling: Ensures a function runs at most once every specified interval.

Example: Mouse move event (limit state updates to every 100ms even if the mouse moves continuously).
Use case: Limiting API calls while scrolling.

✅ Debouncing: Ensures a function runs only after a delay since the last invocation.

Example: Search bar input (wait 300ms after the user stops typing before making an API call).
Use case: Avoiding unnecessary API calls when a user is typing quickly.


🔹 Key Difference:

Throttle → Limits the rate of execution.
Debounce → Delays execution until there's a pause in events.
*/


// simple useMousePointer hook 
export function useMousePointer(){

    const [position,setPosition] = useState({x:0,y:0})
    function handleMouseMovement (e){
        setPosition({x:e.clientX,y:e.clientY})
    }

    useEffect(()=>{
        window.addEventListener("mousemove",handleMouseMovement)
        return ()=>{
            window.removeEventListener("mousemove")
        }
    },[])
    return position
}



// throttled mouse pointer hook
function useMousePointerThrottled() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    function handleMouseMovement(e) {
        setPosition({ x: e.clientX, y: e.clientY });
    }

    useEffect(() => {
        const throttledMouseMove = throttle(handleMouseMovement, 100); // Throttle to 100ms
        window.addEventListener("mousemove", throttledMouseMove);

        return () => {
            window.removeEventListener("mousemove", throttledMouseMove);
        };
    }, []);

    return position;
}