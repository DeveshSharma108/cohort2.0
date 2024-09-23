/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */



  const express = require('express');
  const bodyParser = require('body-parser');
  const app = express();
  const todos = []  // in memory storage


  // // console.log(crypto.randomUUID())

  // const {v4:uuidv4} = require('uuid')     // uuid has different function such as v4,v1 for different uses   here we used object destructuring 
  // console.log(uuidv4())


  app.use(bodyParser.json());
  const port = 3000;


  // to get all todos
  app.get('/todos',function(req,res){
    res.send(todos)
  })

  // to get a specific todo we can use find() function instead of forEach()
  app.get('/todos/:id',function(req,res){
    const id = req.params.id
    idIsValid = false
    todos.forEach(todo => {
      if (todo.id == id) {
        idIsValid = true
        res.status(200).json(todo)
      }
    });
    if (!idIsValid) {
      res.status(404).send("Not Found! ")
    }
  })

  // adding new todo in todos with a unique id
  const {v4:uuidv4} = require('uuid')
  app.post('/todos', (req, res) => {

    todo = req.body
    todo['id'] = uuidv4()
    todos.push(todo)
    res.status(201).send({"id":todo.id})
    
  });

  // updating a todo if it exist using id
  app.put('/todos/:id',function(req,res){
    // console.log(req.params)
    // console.log(typeof req.params)
    const id = req.params.id
    idIsValid = false
    todos.forEach(todo => {
      if (todo.id == id) {
        idIsValid = true
        todo.title = req.body.title
        todo.description = req.body.description
        todo.completed = req.body.completed
        res.status(200).send("Updated the todo")
      }
    });
    if (!idIsValid) {
      res.status(404).send("Not Found! ")
    }

  })

  // deleting a todo if it exist using id
  app.delete('/todos/:id',function(req,res){
    const id = req.params.id
    idIsValid = false
    todos.forEach(todo => {
      if (todo.id == id) {
        idIsValid = true
        todos.splice(todos.indexOf(todo),1)
        res.status(200).send("Deleted the todo")
      }
    });
    if (!idIsValid) {
      res.status(404).send("Not Found! ")
    }
  })
  
  // middleware to catch any invalid url that is not part of the above urls
  app.use((req,res)=>{
    res.status(404).send("Page Not Found")
  })


  // app.listen(port, () => {
  //   console.log(`Server is running on http://localhost:${port}`);
  // });


  
  // why I commented above port.listen....??
  /*
  Explanation of the "EADDRINUSE: address already in use :::3000" error:
  
  When I ran the test for the Todo API, I encountered an error: "EADDRINUSE: address already in use :::3000."
  This occurred because both the application (app.js) and the Jest test were trying to listen to the same port (3000).
  The `app.listen()` call in the main server file attempts to start the server and bind it to port 3000.
  
  However, during testing, the test framework (Jest) also tries to initiate the server to perform the tests.
  As a result, both the app and the test tried to use port 3000, which led to the conflict, throwing the "EADDRINUSE" error.

  Solution:
  To resolve the issue, I commented out the `app.listen()` part in the main server code while running the tests.
  This ensures that only Jest controls the server during testing and avoids the conflict.
  In production or when running the app normally, the server will still listen on port 3000 as expected.
  
  By handling this correctly, Jest can now spawn its own server instance, and all tests pass successfully.
  No changes were needed to the `package.json` configuration after this fix.
*/

// can use this way too
// Only start listening if this script is run directly (not during tests)
if (require.main === module) {
  app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
  });
}

  // I have created a folder named 03-understanding modules and require main for understanding above code
  
  module.exports = app;





  //  todo server with persistent storage