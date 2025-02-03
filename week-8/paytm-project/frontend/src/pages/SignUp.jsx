import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning.jsx"
import { Button } from "../components/Button.jsx"
import { Heading } from "../components/Heading.jsx"
import { InputBox } from "../components/InputBox.jsx"
import { SubHeading } from "../components/SubHeading.jsx"
import axios from 'axios'

export const Signup = () => {

  const [username,setUsername] = useState('')
  const [firstname,setFirstname] = useState('')
  const [lastname,setLastname] = useState('')
  const [password,setPassword] = useState('')

  const handleClick = async () => {
    console.log("inside handle click")
    const response = await axios.post("http://localhost:3000/api/v1/user/signup",
      {
        firstname,
        lastname,
        username,
        password
      }
    )
    localStorage.setItem("token",response.data.token)
    setFirstname('')
    setLastname('')
    setUsername('')
    setPassword('')
  }

  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox placeholder="John" label= "First Name" onChange={(e)=>{
          setFirstname(e.target.value)
        }}/>
        <InputBox placeholder="Doe" label= "Last Name" onChange={(e)=>{
          setLastname(e.target.value)
        }}/>
        <InputBox placeholder="xyz@gmail.com" label= "Email" onChange={(e)=>{
          setUsername(e.target.value)
        }}/>
        <InputBox placeholder="123456" label= "Password" onChange={(e)=>{
          setPassword(e.target.value)
        }}/>
        <div className="pt-4">
          <Button label={"Sign up"} onClick = {handleClick}/>
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}