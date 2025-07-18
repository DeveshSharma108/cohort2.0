import { useState } from "react"

export function CreateToDo({todos,setTodos}){
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    function fetchTodos() {
        fetch('http://localhost:3000/todos').then(async function (res) {
            const json = await res.json();
            setTodos(json.todos);
        });
    }
    return (
        <div>
            <input style={{
                padding:10,
                margin:10
            }}
            type="text" placeholder="title.." onChange={function(e){
                setTitle(e.target.value)
            }}/><br />
            <input style={{
                padding:10,
                margin:10
            }} type="text" placeholder="description..." onChange={function(e){
                setDescription(e.target.value)
            }}/><br />
            <button style={{
                padding:10,
                margin:10
            }} 
        
            onClick={()=>{
                fetch('http://localhost:3000/todo',{
                    method:"POST",
                    body: JSON.stringify({
                        title:title,
                        description:description
                    }),
                    headers:{
                        "Content-type":"application/json"
                    }
                }).then(async function (res) {
                    if (res.ok) {  // Check if the request was successful
                        const json = await res.json();
                        alert('Todo added');
                        
                        // Fetch todos only after the new todo is successfully added
                        fetchTodos();
                    } else {
                        alert('Error adding todo');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Failed to add todo');
                })
            }}>Add ToDo</button>
        </div>
    )
}