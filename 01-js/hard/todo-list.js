/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {

  constructor(){
    this.tasks = new Array()
  }

  add(task){
    this.tasks.push(task)
  }

  remove(index){
    this.tasks.splice(index,1)
  }

  update(index,task){

    if (this.tasks[index]) {
      this.tasks[index] = task
    }
  }

  get(index){
    if (this.tasks[index]) {
      return this.tasks[index]
    }
    else{
      return null
    }
    
  }

  getAll(){
    return this.tasks
  }

  clear(){
    this.tasks = []
  }
}


module.exports = Todo;
