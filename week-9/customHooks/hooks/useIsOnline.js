import {useEffect, useState} from "react"

export function useIsOnline(){

    const [isOnline,setIsOnline] = useState(window.navigator.onLine)
    useEffect(()=>{

        window.addEventListener("online",()=> {
            console.log("You are online...")
            setIsOnline(true)
        })
        window.addEventListener("offline",()=>{
            console.log("You are offline...")
            setIsOnline(false)
        })

        return ()=>{
            window.removeEventListener('online')
            window.removeEventListener('offline')
        }
    },[])

    return isOnline;
}

// I thought that "You are online" will be logged on console as soon as the component mounts for the first time but this was not the case because 

// Event Listeners Are Triggered Only on Events

// useEffect registers event listeners for "online" and "offline" events.
// However, these listeners only trigger when the network state changes (i.e., when you go from online to offline or vice versa).
// When the component first mounts, there is no state transition happening—the user is already online or offline—so the event listener doesn’t run immediately.