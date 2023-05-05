import React, {useState} from 'react';
import './App.css';

function App() {

    const [todoList, setTodoList] = useState([]);

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

    const oneTodo: Todo = {
        text: 'mosás',
        active: true
    }

  return (
      <>
        <div className="App">
            <h2>Todo list</h2>
            {todos.map(todo => {
                return (
                    <p>{todo.text}</p>
                )
            })}
        </div>
      </>
  );
}

export default App;

export interface Todo {
    text: string;
    active: boolean
}
