import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo';
import ToDo from '../models/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  constructor(private todoService: TodoService) { }

  //Declaring the new todo Object and initilizing it
  newTodo: ToDo = new ToDo();

  //An Empty list for the visible todo list
  todosList: ToDo[];
  editTodos: ToDo[] = [];

  ngOnInit() {
    //At component initialization the 
    this.todoService.getToDos()
      .subscribe(todos => {
        //assign the todolist property to the proper http response
        this.todosList = todos
        console.log(todos)
      })
  }

  create() {
    this.todoService.createTodo(this.newTodo)
      .subscribe((res) => {
        this.todosList.push(res.data)
        this.newTodo = new ToDo()
      })
  }

  editTodo(todo: ToDo) {
    console.log(todo)
     if(this.todosList.includes(todo)){
      if(!this.editTodos.includes(todo)){
        this.editTodos.push(todo)
      }else{
        this.editTodos.splice(this.editTodos.indexOf(todo), 1)
        this.todoService.editTodo(todo).subscribe(res => {
          console.log('Update Succesful')
         }, err => {
            this.editTodo(todo)
            console.error('Update Unsuccesful')
          })
        }
      }
    }

    doneTodo(todo:ToDo){
      todo.status = 'Done'
      this.todoService.editTodo(todo).subscribe(res => {
        console.log('Update Succesful')
      }, err => {
        this.editTodo(todo)
        console.error('Update Unsuccesful')
      })
    }

    submitTodo(event, todo:ToDo){
      if(event.keyCode ==13){
        this.editTodo(todo)
      }
    }

    deleteTodo(todo: ToDo) {
      this.todoService.deleteTodo(todo._id).subscribe(res => {
        this.todosList.splice(this.todosList.indexOf(todo), 1);
      })
    }

}
