import { createContext,useState } from "react";

export const NameContext = createContext(null)
export const NameProvider = (props)=>{
    const [name,_] = useState('xyzz')
    return (
        <NameContext.Provider value={{name}}>
            {props.children}
        </NameContext.Provider>
    )
}