import { useEffect} from "react"

export function ToDos({todos,setTodos}){
    function fetchTodos() {
        fetch('http://localhost:3000/todos').then(async function (res) {
            const json = await res.json();
            setTodos(json.todos);
        });
    }
    function handleClick(todo){
        fetch('http://localhost:3000/completed',{
            method:"PUT",
            body: JSON.stringify({
                title:todo.title,
                description:todo.description,
                id:todo._id
            }),
            headers:{
                "Content-type":"application/json"
            }
        }).then(async function (res) {
            if (res.ok) { // Check if the response is successful
                const json = await res.json();
                alert('Updated');
                
                // Fetch todos only after the update was successful
                fetchTodos();
            } else {
                alert('Error updating todo');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to update todo');
        });
    }
    function CorrectElement({todo}){
        if(todo.completed){
            return (
                <div>Completed ✅✅</div>
            )
        }else{
            return (
                <button onClick={()=>{handleClick(todo)}}>Mark as complete</button>
            )
        }
    }
    return (
        <div>
            {
                todos.map(function(todo){
                    return <div>
                        <h1>{todo.title}</h1>
                        <h2>{todo.description}</h2>
                        <CorrectElement todo = {todo}/>
                    </div>
                })
            }
        </div>
    )
}