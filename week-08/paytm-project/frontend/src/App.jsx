// import tailwindcss from 'tailwindcss'  // should be imported at index.css
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import { Signup } from './pages/SignUp.jsx'
import { Signin } from './pages/SignIn.jsx'
import { SendMoney } from './pages/SendMoney.jsx'
import { Dashboard } from './pages/Dashboard.jsx'

function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;