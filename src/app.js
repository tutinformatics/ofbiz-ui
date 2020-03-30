export class App {
  constructor() {
    this.heading = "Todos";
    this.todos = [];
    this.todoDescription = "";
    this.products = [];
  }

  addTodo() {
    if (this.todoDescription) {
      this.todos.push({
        description: this.todoDescription,
        done: false
      });
      this.todoDescription = "";
    }
  }

  removeTodo(todo) {
    let index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }
}
