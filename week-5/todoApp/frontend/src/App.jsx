import { CreateToDo } from "./components/CreateToDo"
import { ToDos } from "./components/ToDos"
import { useEffect, useState } from "react"

function App() {
  
  const [todos,setTodos] = useState([])
  
  // this is not the suitable way to fetch data from backend and update the state open network tab and see that infinite requests are going to backend which is not good what is correct way ??
  // Why so many requests are going understand the working ??
  
  /*
  fetch('http://localhost:3000/todos').then(
    async function (res) {
      const json = await res.json()
      setTodos(json.todos)
    }
  )
  */

  // correct way

  useEffect(()=>{
    fetch('http://localhost:3000/todos').then(
      async function (res) {
        const json = await res.json()
        setTodos(json.todos)
      }
    )
  },[])

  return (
    <div>
      <CreateToDo todos = {todos} setTodos = {setTodos}/>
      <ToDos todos={todos} setTodos={setTodos}/>
    </div>
  )
}

export default App
