import { useState } from "react"

export function Grandfather(){
    const [name,_] = useState('xyz')
    return(
        <div>
            Hi I am Grandfather My name is {name}
            <ChildA name={name}/>
            <ChildB name={name}/>
            <div><b>In future we will use context api to get rid of prop drilling 😊😊</b></div>
        </div>
    )
}

function ChildA({name}){
    
    
    return (
        <>
            <div>I am parent A. I am passing the name of my parent to my child as prop.
            // This component doesn't use 'name', but has to pass it down.
            </div>
            <Grandchild name={name} parent='A'/>
        </>
    )
}
function ChildB({name}){
    
    return (
        <>
            
            <div>I am parent B. I am passing the name of my parent to my child as prop.
            // This component doesn't use 'name', but has to pass it down.
            </div>
            <Grandchild name={name} parent='B'/>
        </>
    )
}

function Grandchild({ name, parent }) {
    return <div>I am grandchild of {name} from {parent}</div>;
}
