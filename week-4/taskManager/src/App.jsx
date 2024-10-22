import { useState } from "react"

function TaskInput(props){
  const [input,setInput] = useState('')
  //return // In JavaScript, when a return statement is used without anything on the same line, it will automatically return undefined
  function handleInput(){
    if (input.trim()) {
      props.addTask(input)
      setInput("")
    }
  }

  return(
    <>
      <input
        type="text"
        placeholder="Add a task"
        value={input}
        onChange={(e)=>{setInput(e.target.value)}}
      />
      <br/>
      <button onClick={handleInput}>
        Add the Task
      </button>
    </>
  )
}
function TaskManager() {
  const [tasks,updateTask] = useState([])

  const addTask = function(newTask){
    updateTask([...tasks,newTask])
  }
  
  return(
    <div>
      <TaskInput addTask = {addTask}/>
      <div>
        {tasks.map((task,index)=>(
          <div key={index}>{task}</div>
        ))}
      </div>
    </div>
  )
}

export default TaskManager
