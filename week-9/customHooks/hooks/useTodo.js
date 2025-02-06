
// my incorrect implementation 
// 1. React hooks can't be async,if a hook is async, it returns a Promise instead of a value, which React doesn't know how to handle.
// 2. Since it is a async function it is returning a promise and I was thinking it will return data.todos
// 3. In app.jsx, I was doing 
// useEffect(()=>{
//     const fetched = useTodos()
//     setTodos(fetched)
//   },[])
// setTodos was setting a promise as value for todos and that was a big error 
/*
Incorrect
export async function useTodos(){
    
    const response = await fetch('https://dummyjson.com/todos?limit=3')
    const data = await response.json()
    // console.log(data)
    console.log("type",typeof(data.todos))
    return data.todos 
}
*/

import { useEffect, useState } from "react"



// Correct and incorrect both
/*
export function useTodo(fn){
    fetch('https://dummyjson.com/todos/random').
    then((response)=>response.json()).
    then((data)=>{
        console.log(data)
        fn(data)
    })
}
*/


/*
For above
1️⃣ Is a function without built-in hooks still a custom hook?
Technically, no. A function is not considered a "custom hook" unless:
✅ Its name starts with "use" (e.g., useTodo)
✅ It calls other React hooks (useState, useEffect, etc.)
✅ It manages state or effects related to React components

Your function useTodo(fn) is just a utility function, not a true React hook. Even though it's working, it's not leveraging React's state or effects internally. Instead, you're passing down a function (fn) and calling it inside .then(), which is more like an event-driven approach.
*/



// correct way 

export function useTodo(toggle){
    const [todo,setTodo] = useState({})
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        fetch('https://dummyjson.com/todos/random').
        then((response)=>response.json()).
        then((data)=>{
        // console.log(data)
        setTodo(data)
        setLoading(false)
    })
    },[toggle])
    
    return {todo,loading}
}