
import {Grandfather} from './components/Propdrilling'
import {GrandfatherWithContext} from './components/ContextAPI'
import {RecoilRoot} from 'recoil'
import {TaskInput} from './components/taskManagerComponents/TaskInput'
import { TaskFilter } from './components/taskManagerComponents/TaskFilter'
import {TaskItem} from './components/taskManagerComponents/TaskItem'
import {TaskStats} from './components/taskManagerComponents/TaskStats'
function App() {

  return (
    <>
      {/*<Grandfather />*/}
      {/*<GrandfatherWithContext />*/}
      {<>
        <TaskInput />
        <TaskFilter/>
        <TaskItem/>
        <TaskStats/>
       </>}
      
    </>
  )
}

export default App
