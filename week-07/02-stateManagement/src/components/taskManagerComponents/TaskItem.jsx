/* My code (no styling and a bit verbose)

import { useRecoilState, useRecoilValue } from "recoil";
import {filteredTasksSelector} from '../../atoms/taskSelector'
import {tasksAtom} from '../../atoms/taskAtom'

export function TaskItem(){
    const filteredTasks = useRecoilValue(filteredTasksSelector)
    // console.log(filteredTasks)
    return(
        filteredTasks.map((task)=>{
            return (
                    <TaskDisplayer task={task}/>
            )
        })
    )    
}

function TaskDisplayer({task}){
    const [tasks,setTasks] = useRecoilState(tasksAtom)
    if (task.Completed) {
        return(
            <li>
                <s>{task.TaskName}</s>
                <button onClick={()=>{
                    const modifiedTasks = tasks.map((obj)=>{
                        if (task.ID === obj.ID) {
                            return {...obj,Completed:false}
                            // 
                        }
                        else{
                            return obj
                        }
                    })
                    setTasks(modifiedTasks)
                }}>Remove From Completed</button>
            </li>
        )
    }else{
        return(
            <li>
                {task.TaskName}
                <button onClick={()=>{
                    const modifiedTasks = tasks.map((obj)=>{
                        if (task.ID === obj.ID) {
                            return {...obj,Completed:true}
                        }
                        else{
                            return obj
                        }
                    })
                    setTasks(modifiedTasks)
                }}>Mark As Completed</button>
            </li>
        ) 
    }
}
*/

// ⚠️ IMPORTANT: Avoid Mutating State Directly!
// React state updates (like Recoil's atom state) require immutability to trigger proper re-renders.
// Instead of modifying the same object, always create a new object or array for updates.
// 
// ❌ Wrong: Mutating the object directly
// task.Completed = true; // This won't trigger a re-render in React
// 
// ✅ Correct: Create a new object using spread syntax
// const updatedTask = { ...task, Completed: true }; // React detects this as a new reference
// 
// Similarly, for arrays, use `.map()` or other immutable methods to return a new array:
// const updatedTasks = tasks.map(t => t.ID === task.ID ? { ...t, Completed: true } : t);


import { useRecoilState, useRecoilValue, useSetRecoilState, useRecoilCallback } from "recoil";
import { filteredTasksSelector } from "../../atoms/taskSelector";
import { taskFamily, tasksAtom } from "../../atoms/taskAtom";

export function TaskItem() {
    const filteredTasks = useRecoilValue(filteredTasksSelector);
    console.log(filteredTasks)
    return (
        <ul style={{ padding: "0", margin: "0", listStyleType: "none" }}>
            {filteredTasks.map((taskID) => (
                <TaskDisplayer key={taskID} taskID={taskID} />
            ))}
        </ul>
    );
}

function TaskDisplayer({ taskID }) {
    const [task,setTask] = useRecoilState(taskFamily(taskID))
    const setTasks = useSetRecoilState(tasksAtom);
    const setTaskFamily = useRecoilCallback(({ set }) => (id, value) => {
        set(taskFamily(id), value);
    });


    const toggleTaskCompletion = async () => {
        const backup = task
        
        setTask((prevTask) => ({
            ...prevTask,
            Completed: !prevTask.Completed,
        }));


        try {
            // Send PUT request to the backend
            const response = await fetch(`http://localhost:3000/tasks/${taskID}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ Completed: !task.Completed }),
            });
    
            if (!response.ok) {
                throw new Error("Failed to toggle the task.");
            }
    
            // Success: Nothing to do, the task is already toggled in the UI
            console.log("Toggled! the task.");
        } catch (error) {
            // Error: again toggle back the task
            console.error(error);
            setTask(backup);
            alert("Failed to toggle the task. Please try again!");
        }
    };


    const deleteTask = async () => {
        // Optimistically update the tasks in UI
        
        const backup = task
        setTaskFamily(taskID,undefined)
        setTasks((prevTaskIDs) => prevTaskIDs.filter((id) => id !== taskID));
        
    
        try {
            // Send DELETE request to the backend
            const response = await fetch(`http://localhost:3000/tasks/${taskID}`, {
                method: "DELETE",
            });
    
            if (!response.ok) {
                throw new Error("Failed to delete the task.");
            }
    
            // Success: Nothing to do, the task is already removed from the UI
            console.log("Task deleted successfully");
        } catch (error) {
            // Rollback: Add the task back to the UI
            console.error(error);
            setTaskFamily(taskID,backup)
            setTasks((prevTaskIDs) => [...prevTaskIDs, taskID]);
            alert("Failed to delete the task. Please try again!");
        }
    };
    

    return (
        <li
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "8px 0",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                backgroundColor: task.Completed ? "#f0f8ff" : "#fff",
            }}
        >
            {task.Completed ? (
                <s style={{ color: "#888", fontStyle: "italic" }}>
                    {task.TaskName}
                </s>
            ) : (
                <span>{task.TaskName}</span>
            )}
            <div>
                <button
                    onClick={toggleTaskCompletion}
                    style={{
                        backgroundColor: task.Completed ? "#ff4d4d" : "#007BFF",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        padding: "5px 10px",
                        cursor: "pointer",
                        fontSize: "14px",
                        marginRight: "8px",
                    }}
                    title={
                        task.Completed
                            ? "Mark task as pending"
                            : "Mark task as completed"
                    }
                >
                    {task.Completed ? "Undo Complete" : "Complete Task"}
                </button>
                <button
                    onClick={deleteTask}
                    style={{
                        backgroundColor: "#dc3545",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        padding: "5px 10px",
                        cursor: "pointer",
                        fontSize: "14px",
                    }}
                    title="Delete Task"
                >
                    Delete
                </button>
            </div>
        </li>
    );
}
