import {Todo} from "./App";

let counter: number = 0;

export class DataConnection {

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
    todos: Todo[] = [];

    constructor() {}

    async getData(isError: boolean = false) {
        counter++;
        if (counter % 10 === 0 || isError) {
            throw new Error("Adatbázis kapcsolati hiba!")
        }
        return this.todos;
    }

    async addData(todo: Todo) {
        this.todos.push(todo);
        console.log(this.todos)
    }

}