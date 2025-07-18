// solving the prop drilling problem using context api
import { useContext } from "react"
import { NameContext } from "../contexts/NameContext"

export function GrandfatherWithContext(){
    const nameState = useContext(NameContext)
    console.log(nameState.name)
    return(
        <div>
            Hi I am Grandfather My name is {nameState.name}
            <ChildA />
            <ChildB />
            <div><b>This time we used context api to get rid of prop drilling 😊😊</b></div>
        </div>
    )
}

function ChildA(){
    
    
    return (
        <>
            <div>I am parent A.
            </div>
            <Grandchild parent='A'/>
        </>
    )
}
function ChildB(){
    
    return (
        <>
            
            <div>I am parent B.
            </div>
            <Grandchild parent='B'/>
        </>
    )
}

function Grandchild({ parent }) {
    const nameState = useContext(NameContext);
    return <div>I am grandchild of {nameState.name} from {parent}</div>;
}