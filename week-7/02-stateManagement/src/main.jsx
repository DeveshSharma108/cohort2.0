import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { NameProvider } from './contexts/NameContext.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <NameProvider>
//       <App />
//     </NameProvider>
//   </StrictMode>,
// )


import { RecoilRoot } from 'recoil'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RecoilRoot>
    <App />
    </RecoilRoot>
  </StrictMode>,
)
