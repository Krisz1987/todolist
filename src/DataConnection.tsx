import {Todo} from "./App";

export class DataConnection {

    counter: number = 0;
    todoId: number = 3;

    /*todos: Todo[] = [
        {
            text: 'vásárlás',
            complete: true
        },
        {
            text: 'mosogatás',
            complete: false
        },
        {
            text: 'főzés',
            complete: true
        }
    ]*/
    todos: Todo[] = [
        {
            id: 1,
            text: 'vásárlás',
            complete: true
        },
        {
            id: 2,
            text: 'mosogatás',
            complete: false
        },
        {
            id: 3,
            text: 'főzés',
            complete: true
        }
    ];

    async getTodoList() {
        //this.randomError();
        return this.todos;
    }

    async addNewTodo(todoText: string) {
        //this.randomError();
        this.todoId++;
        this.todos.push({id: this.todoId, text: todoText, complete: false});
        console.log(this.todos)
    }

    setTodoToComplete(todoId: number) {
        this.todos.map((todo) => {
            if (todo.id === todoId) {
                todo.complete = true;
            }
        })
    }

    private randomError(): void {
        this.counter++;
        if (this.counter % 5 === 0) {
            throw new Error("Adatbázis kapcsolati hiba!")
        }
    }

}