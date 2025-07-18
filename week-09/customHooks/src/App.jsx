/*
import React,{ useState, useEffect } from 'react'
// let x = <MyComponent/> // not a reactive variable react do not track it
function App() {
  const [toggle,setToggle] = useState(true)
  useEffect(()=>{
    setTimeout(()=>{
      setToggle((prev)=>!prev)
    },5000)
  },[])
  return (
    toggle ? <MyComponent/> : <ChangeComponent/>
  )
}


// function based component used currently 
// function MyComponent() {
//   const [count, setCount] = useState(0);

//   const incrementCount = () => {
//     setCount(count + 1);
//   };

//   return (
//     <div>
//       <p>{count}</p>
//       <button onClick={incrementCount}>Increment</button>
//     </div>
//   );
// }


// class based component used previously written without hooks 
// class MyComponent extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { count: 0 };
//   }

//   incrementCount = () => {
//     this.setState({ count: this.state.count + 1 });
//   }

//   render() {
//     return (
//       <div>
//         <p>{this.state.count}</p>
//         <button onClick={this.incrementCount}>Increment</button>
//       </div>
//     );
//   }
// }


// life cycle event -> events triggered when a component mounts or unmounts 

// life cycle events in functional component 
// function MyComponent(){

//   useEffect(()=>{
//     console.log("MyComponent Mounted")
//     return ()=>{
//       console.log("MyComponent Unmounted")
//     }
//   },[])

//   return(
//     <h1>
//       Inside my component
//     </h1>
//   )
// }

function ChangeComponent() {
  return(
    <h1>
      Inside changed component
    </h1>
  )
}

// lifecycle events in class based components 
class MyComponent extends React.Component {
  componentDidMount() {
    console.log("My Component mounted")
  }

  componentWillUnmount() {
    console.log("My Component Unmounted")
  }

  render() {
    return(
      <h1>Inside My Component</h1>
    )
  }
}

*/


/*
// custom hook
import { useEffect, useState } from 'react'
import { useTodo } from './customHook.js'


function App() {
  const [todo,setTodo] = useState({})
  const [toggle,setToggle] = useState(true)
  useEffect(()=>{
    const a = setTimeout(
      ()=>setToggle((prev)=>!prev),3000)

    return ()=>clearTimeout(a)
  },[toggle])
  useEffect(()=>{
    useTodo(setTodo)
  },[toggle])
  
  return (
    <>
      <Track todo={todo} key={todo.id}/>
    </>
    
  )
}

function Track({ todo }) {
  //console.log("inside track")
  //console.log(todo)
  return <div>
    {todo.todo}
    <br />
    {todo.completed}
  </div>
}
*/




// custom hook
import { useEffect, useState } from 'react'
import { useTodo } from '../hooks/useTodo.js'


function App() {
  const [toggle,setToggle] = useState(true)
  // const [fetched,setFetched] = useState({}) // no need
  // We can observe also in every program any hook like useState is used at top level not inside another hook 
  const {todo,loading} = useTodo(toggle)  // ✅ Call custom hook at top level
  // passed toggle as parameter and used it as dependency for useTodo hook
  useEffect(()=>{
    const a = setTimeout(
      ()=>setToggle((prev)=>!prev),3000)

    return ()=>clearTimeout(a)
  },[toggle])
  
  /*
  ❌❌❌
  useEffect(()=>{
    setFetched(useTodo)
  },[toggle])

  -- Custom hooks must be called at the top level inside a component, not inside useEffect.
  -- setFetched(useTodo) is incorrect because useTodo is a hook, not a function returning a value.

  -- Incorrect use of setFetched

  -- Treating useTodo as a function, but hooks return reactive state, not a one-time value.
  -- Instead of useEffect, directly assign the result of useTodo to a variable.
  */
  
  return (
    loading ? <div>Loading....</div> :
    <>
      <Track todo={todo} key={todo.id}/>
    </>
    
  )
}

function Track({ todo }) {
  //console.log("inside track")
  //console.log(todo)
  return <div>
    {todo.todo}
    <br />
    {todo.completed}
  </div>
}


export default App
