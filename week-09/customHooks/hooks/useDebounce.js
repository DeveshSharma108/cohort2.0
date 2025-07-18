import { useState, useEffect } from "react";


// value debouncing .............................................
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer); // Cleanup on value or delay change
  }, [value, delay]);

  return debouncedValue;
}


//function debouncing ...........................................

// how to take a callback function as arg and debounce it ??