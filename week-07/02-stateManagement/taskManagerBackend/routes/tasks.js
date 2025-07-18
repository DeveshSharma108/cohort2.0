import { Router } from 'express';
import IDgenerator from '../utils/uuidGenerator.js'
import fs from 'fs'
import path from 'path'

const filePath = path.parse('/home/devesh/Desktop/assignments-master/week-7/02-stateManagement/taskManagerBackend/db/tasks.json')

const data = fs.readFileSync(path.format(filePath),'utf-8')
const tasks = JSON.parse(data)
// console.log(JSON.parse(tasks))
// console.log('hi')


const router = Router();

// GET route to fetch all tasks
router.get('/', (req, res) => {
  res.json(tasks);
});

// POST route to add a new task
router.post('/', (req, res) => {
  const { TaskName } = req.body;
  console.log(TaskName)
  if (!TaskName) {
    return res.status(400).json({ error: 'TaskName is required' });
  }

  const newTask = {
    ID: IDgenerator(),
    TaskName,
    Completed: false,
  };

  // Add the task to the array
  tasks.push(newTask);
  fs.writeFileSync(path.format(filePath),JSON.stringify(tasks))
  console.log(tasks)
  res.status(201).json(newTask);

});

// DELETE route to delete a task 
router.delete('/:id',(req,res)=>{
  const taskID = req.params.id
  // console.log(taskID)
  
  const updatedTasks = []
  for (let index = 0; index < tasks.length; index++) {
    if (tasks[index].ID === taskID) {
      continue
    }else{
      updatedTasks.push(tasks[index])
    }
  } 
  // console.log(updatedTasks)
  fs.writeFileSync(path.format(filePath),JSON.stringify(updatedTasks))
  res.status(201).send('task deleted')
  
})

// PUT route to toggle a task
router.put('/:id',(req,res)=>{
  const taskID = req.params.id
  console.log("id",taskID)
  

  for (let index = 0; index < tasks.length; index++) {
    if (tasks[index].ID === taskID) {
      tasks[index].Completed = !tasks[index].Completed
    }else{
      continue
    }
  } 
  
  fs.writeFileSync(path.format(filePath),JSON.stringify(tasks))
  res.status(201).send('Toggled!')
  
})


// GET route to get a specific task by id
router.get('/tasks/:id', (req, res) => {
  const { id } = req.params;
  console.log(id)
  const task = tasks.find((t) => t.ID === id);
  console.log(task)

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json(task);
});




export default router;



/**
 * Ways to Send Data to the Backend:
 * 1. Path Parameters: Part of the URL path itself (e.g., /tasks/:id). 
 *    Used to uniquely identify resources. Accessed via `req.params`.
 * 
 * 2. Query Parameters: Appended to the URL after a '?' (e.g., /tasks?status=completed). 
 *    Used for filtering, sorting, or optional criteria. Accessed via `req.query`.
 * 
 * 3. Request Body: Data sent in the body of the request (e.g., JSON). 
 *    Commonly used in POST, PUT, or PATCH requests. Accessed via `req.body`.
 * 
 * 4. Headers: Metadata about the request, like Authorization tokens or Content-Type. 
 *    Accessed via `req.headers`.
 */



/*
const arr = [1];
arr.push(2); // No error, because we're modifying the array's contents
console.log(arr); // [1, 2]

arr = []; // Error! This tries to reassign the reference of `arr` to a new array.
*/