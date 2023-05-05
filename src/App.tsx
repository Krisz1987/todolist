import React, {useState} from 'react';
import './App.css';

function App() {

    let addNewTodoButtonText: string = 'Feladat hozzáadása';

    return (
        <>
            <div className="App">
                <h2>Todo list</h2>
                <CheckList />
                <Button buttonText={addNewTodoButtonText} />
            </div>
        </>
    );
}

export function CheckList(): JSX.Element{

    function handleCheckboxActiveState() {}

    return (
        <>
            {GetDataFromDb().map(todo => {
                return (
                    <>
                        <input type="checkbox"
                               checked={todo.active}
                               onClick={() => handleCheckboxActiveState}
                        />
                        <p>{todo.text}</p>
                    </>
                )
            })}
        </>
    )
}

function GetDataFromDb(): Todo[] {

    const [todoList, setTodoList] = useState<Todo[]>([]);

    // todoList litát a DataConnection-ből kell feltölteni adattal, setTodoList
    const todos: Todo[] = [
        {
            text: 'vásárlás',
            active: true
        },
        {
            text: 'mosogatás',
            active: false
        }
    ]
    return (
        todos
    )
}

export function Button(props: { buttonText: string }): JSX.Element {
    return (
        <button>
            {props.buttonText}
        </button>
    )
}

export default App;

export interface Todo {
    text: string;
    active: boolean
}
