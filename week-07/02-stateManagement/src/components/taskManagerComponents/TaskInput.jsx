
/*
import { useRef, useState } from "react"
import { tasksAtom } from '../../atoms/taskAtom'
import { useRecoilState } from "recoil"

// issues not reactive variable (react will not focus on them)
// solution useRef or state variables
// const globalId = 0
// const newTask = {
//     'ID':null,
//     'TaskName':null,
//     'Completed':false
// }


export function TaskInput(){
    // console.log('re-rendering with every input change...')
    const [input,setInput] = useState('')
    const [tasks,setTasks] = useRecoilState(tasksAtom)
    const globalId = useRef(0)
    const handleClick = function(){
        // React's state updates are asynchronous. This means `tasks` won't reflect the updated state immediately after calling `setTasks`.
        // console.log(input)
        if (input.trim()) {
            
            const newTask = {
                'ID':globalId.current++,
                'TaskName':input,
                'Completed':false
            }
            console.log(newTask)  // Logs the new task correctly
            // Update the `tasks` atom
            const updated = [...tasks,newTask]
            setTasks(updated) // Sets the new state, but `tasks` here still holds the old value due to async nature of state updates
            console.log('updated',updated) // Logs the newly updated array
            console.log(tasks)  // Logs the previous state of `tasks`, as `setTasks` hasn't finished updating yet


            // In case you want to update it immediatly 
            // setTasks((prevTasks) => {
            //     const updated = [newTask, ...prevTasks];
            //     console.log('Updated tasks:', updated); // Logs correctly updated tasks
            //     return updated; // Updates the state atom
            // });
        }
        setInput('')
    }
    return(
        <>
            <input type="text" name="TaskInput" id="01" placeholder="add task" value={input} onChange={(e)=>{setInput(e.target.value)}}/>
            <button disabled={!input.trim()} onClick={handleClick}>Add Task</button>
        </>
        
    )
}
*/



// Above code is correct but since we need to make post request to send the updates to backend, code is added for that 
// There are mainly two UI updation approaches optimistic and pessimistic
// I have used a blended approach optimistically updating UI for responsivenes rollback to previous state in case of failure 


/*
import { useState } from "react"
import { tasksAtom } from '../../atoms/taskAtom'
import { useRecoilState } from "recoil"

export function TaskInput() {

    const [input, setInput] = useState('')
    const [tasks, setTasks] = useRecoilState(tasksAtom)
    const [isLoading, setLoading] = useState(false) // to disable the addTask button untill we get the response from backend
    const handleClick = async function () {
        
        setLoading(true)

        const tempTask = {
            'ID': 'XXXXXXXX',// using a temp id for detecting the new task 
            'TaskName': input,
        }
        // optimistically update the UI
        setTasks((prevTasks) => [...prevTasks, tempTask])
        console.log(tasks)
        
        // delay simulation 
        // await new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         resolve()
        //     }, 3000);
        // }).then(()=>console.log('time pass'))

        // send post req to backend 
        try {

            const response = await fetch('http://localhost:3000/tasks', {
                method: "POST",
                body: JSON.stringify(tempTask),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            // console.log('req sent')
            // early return 
            if (!response.ok) {
                throw new Error('Failed to add task please try again later.')
            }

            const newTask = await response.json() // newTask with unique id returned by the server 

            setTasks((prevTasks) => {
                return prevTasks.map((task) => {
                    return task.ID !== 'XXXXXXXX' ? task : newTask
                })
            })

            // console.log(newTask)
            setInput('')
        }
        catch (error) {
            // console.log('big errur please help :-(')
            console.error(error)
            // rollback (remove the recently added task)
            setTasks((prevTasks) => {
                return prevTasks.filter((task) => task.ID !== 'XXXXXXXX')
            })
            alert('Failed to add the task. Please try again!')
        }
        setLoading(false)
        
    }
    return (
        <>
            <input type="text" name="TaskInput" id="01" placeholder="add task" value={input} onChange={(e) => { setInput(e.target.value) }} />
            <button disabled={!input.trim() || isLoading} onClick={handleClick}>Add Task</button>
        </>

    )
}
*/


// incorporating atom family and selector logic 

import { useState } from "react"
import { taskFamily, tasksAtom } from '../../atoms/taskAtom'
import { useRecoilCallback, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"

export function TaskInput() {

    const [input, setInput] = useState('')
    const setTasks = useSetRecoilState(tasksAtom) // to add new taskID
    const [isLoading, setLoading] = useState(false)
    const iddd = useRecoilValue(tasksAtom)
    console.log(iddd)

    const setTaskFamily = useRecoilCallback(({set})=> (id,task)=>{
            set(taskFamily(id),task)
        },[])
    
    const handleClick = async function () {
        
        setLoading(true)
        const tempID = 'XXXXXXXX'
        const tempTask = {
            'ID': tempID,// using a temp id for detecting the new task 
            'TaskName': input,
            'Completed':false
        }
        // optimistically update the UI ( adding new task in front first)
        setTasks((prevTaskIDs) => [...prevTaskIDs, tempTask.ID])
        setTaskFamily(tempID,tempTask)
        
        
        // delay simulation 
        // await new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         resolve()
        //     }, 3000);
        // }).then(()=>console.log('time pass'))

        // send post req to backend 
        try {

            const response = await fetch('http://localhost:3000/tasks', {
                method: "POST",
                body: JSON.stringify(tempTask),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            // console.log('req sent')
            // early return 
            if (!response.ok) {
                throw new Error('Failed to add task please try again later.')
            }

            const newTask = await response.json() // newTask with unique id returned by the server 

            setTasks(prevTaskIDs => prevTaskIDs.map(id => (id === tempID ? newTask.ID : id)));

            // console.log(newTask)

            // Add the new task to taskFamily
            setTaskFamily(newTask.ID, newTask);

            // Cleanup the temporary task from taskFamily
            setTaskFamily(tempID, undefined); // Remove the tempID from the cache

            setInput('')
        }
        catch (error) {
            // console.log('big errur please help :-(')
            console.error(error)
            // rollback (remove the recently added task)
            setTasks((prevTaskIDs) => prevTaskIDs.filter((id) => id !== tempID))
            setTaskFamily(tempID,undefined)
            alert('Failed to add the task. Please try again!')
        }
        setLoading(false)
        
    }
    return (
        <>
            <input 
            type="text" 
            name="TaskInput" 
            id="01" 
            placeholder="add task" 
            value={input} 
            onChange={(e) => { setInput(e.target.value) }} />
            <button 
            disabled={!input.trim() || isLoading} 
            onClick={handleClick}>
            {isLoading ? 'Adding ...' : 'Add Task'}
            </button>
        </>

    )
}