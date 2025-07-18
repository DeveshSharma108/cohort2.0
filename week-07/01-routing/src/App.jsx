import {BrowserRouter,Route,Routes} from 'react-router-dom'
// import {Dashboard} from './components/dashboard'  commented because we later used lazy load for dashboard 
// import {Landing} from './components/landing'
import { useNavigate } from 'react-router-dom'
import React from 'react'

const LazyLoadedLanding = React.lazy(()=>import('./components/landing'))
const LazyLoadedDashBoard = React.lazy(()=>import('./components/dashboard'))

function App() {
  
  //const navigate = useNavigate()  // we can't initiate navigate here it need to be inside a component that is under the Router (BrowserRouter) component

  return (
    <>
      {/* <div style={{background:'teal'}}> */}
        {/* <button onClick={()=>{window.location.href = '/'}}>Landing Page</button>
        <button onClick={()=>{window.location.href = '/dashboard'}}>Dashboard</button> 
        window.location is not suitable for client side routing because the page are coming from server instead use useNavigate hook ....*/}

        {/* <button onClick={()=>{navigate('/')}}>Landing Page</button>
        <button onClick={()=>{navigate('/dashboard')}}>Dashboard</button> 
        The navigation logic should be inside a router component */}
      {/* </div> */}
      <BrowserRouter>
        <Navbar />
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            < Route path='/dashboard' element = {< LazyLoadedDashBoard />}/>
            < Route path='/' element = {< LazyLoadedLanding />}/>
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </>
    
  )
}
function Navbar(){
  const navigate = useNavigate()
  return(
  <div style={{background:'teal', display:'flex', justifyContent:'space-evenly'}}>
    <button onClick={()=>{navigate('/')}}>Landing Page</button>
    <button onClick={()=>{navigate('/dashboard')}}>Dashboard</button> 
  </div>)
}

export default App
