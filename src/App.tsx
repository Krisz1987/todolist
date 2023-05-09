import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import {DataConnection} from "./DataConnection";

const dataConnection = new DataConnection();

function App() {

    const [todoList, setTodoList] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            loadTodoList();
        }, 3000)
    }, []);

    function loadTodoList(): void {
        dataConnection.getTodoList().then((result: any) => {
            console.log(result)
            setTodoList([...result]);
            setLoading(false);
        }).catch((error: string) => {
            alert(error)
        })
    }

    let addNewTodoButtonText: string = 'Feladat hozzáadása';

    function addTodoClick(): void {
        setOpenModal(true);
    }


    function onSuccessfulSave(): void {
        setOpenModal(false);
        console.log('onSucces');
        loadTodoList();
    }

    function loadingDiv() {
        return <div>Töltődik...</div>
    }

    function todoApplication() {
        function showModal() {
            return openModal ? <Modal onSuccessfulSave={onSuccessfulSave}
            /> : <></>
        }

        console.log("todolist", todoList);
        return <div className="App">
            <h2>Todo list</h2>
            <CheckList todoList={todoList} onSuccessfulSave={onSuccessfulSave}/>
            <Button buttonText={addNewTodoButtonText} onClick={addTodoClick}/>
            {showModal()}
        </div>
    }

    return (
        <>
            {loading ? loadingDiv() : todoApplication()}
        </>
    );
}

export function CheckList(props: { todoList: Todo[], onSuccessfulSave: any }): JSX.Element {

    function handleCheckboxActiveState(id: number) {
        dataConnection.setTodoToComplete(id).then(() => {
            props.onSuccessfulSave()
        }).catch(error => {
            alert(error);
        });
    }

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>Kész</th>
                    <th>Feladat</th>
                </tr>
                </thead>
                {props.todoList.map((todo, index) => {
                    return (
                        <React.Fragment key={'todo' + index}>
                            <tbody>
                            <tr>
                                <td>
                                    <input type="checkbox"
                                           checked={todo.complete}
                                           onChange={() => handleCheckboxActiveState(todo.id)}
                                    />
                                </td>
                                <td>
                                    <p>{todo.text}</p>
                                </td>
                            </tr>
                            </tbody>
                        </React.Fragment>
                    )
                })}
            </table>
        </>
    )
}

export function Button(props: { buttonText: string, onClick: any }): JSX.Element {
    return (
        <button onClick={props.onClick}>
            {props.buttonText}
        </button>
    )
}

export function Modal(props: { onSuccessfulSave: any }): JSX.Element {

    const [inputText, setInputText] = useState("");
    const getTextFromInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    }

    function okClick() {
        console.log("OK click")
        dataConnection.addNewTodo(inputText).then(() => {
            props.onSuccessfulSave()
        }).catch(error => {
            alert(error);
        });
    }

    return (
        <div>
            <label>Új feladat: </label>
            <input type='text' onChange={getTextFromInput}/>
            <Button buttonText='OK' onClick={okClick}/>
        </div>
    )
}

export default App;

export interface Todo {
    id: number;
    text: string;
    complete: boolean
}
