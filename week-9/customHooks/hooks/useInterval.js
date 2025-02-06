import {useEffect} from "react"

export function useInterval(callBackFn,delay){

    useEffect(()=>{
        const timerId = useInterval(callBackFn,delay*1000)
        return ()=>{clearInterval(timerId)}
    },[callBackFn,delay])
}