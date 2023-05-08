import React, {useState, useEffect, ChangeEvent} from 'react';
import './App.css';
import {DataConnection} from "./DataConnection";

const dataConnection = new DataConnection();

function App() {

    const [todoList, setTodoList] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        loadTodoList();
    }, []);

    loadTodoList();
    function loadTodoList(): void {
        dataConnection.getTodoList().then((result: any) => {
            //setTodoList(result);
            setTodoList([...todoList, result]);
            setLoading(false);
        }).catch((error: string) => {
            alert(error)
        })
    }

    let addNewTodoButtonText: string = 'Feladat hozzáadása';

    function addTodoClick(): void {
        setOpenModal(true);
    }

    function closeModal(): void {
        setOpenModal(false);
    }

    function onSuccessfulSave(): void {
        setOpenModal(false);
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

        return <div className="App">
            <h2>Todo list</h2>
            <CheckList todoList={todoList}/>
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

export function CheckList(props: { todoList: Todo[] }): JSX.Element {

    function handleCheckboxActiveState(id: number) {
        dataConnection.setTodoToComplete(id)
    }

    return (
        <>
            <table>
                <tr>
                    <th>Kész</th>
                    <th>Feladat</th>
                </tr>
                {props.todoList.map(todo => {
                    return (
                        <>
                            <tr>
                                <td>
                                    <input type="checkbox"
                                           checked={todo.complete}
                                           onClick={() => handleCheckboxActiveState(todo.id)}
                                    />
                                </td>
                                <td>
                                    <p>{todo.text}</p>
                                </td>
                            </tr>
                        </>
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
            {props.onSuccessfulSave()}
        }).catch(error => {
            alert(error);
        });
    }

    /*if (!props.open) {
        return <></>;
    }*/

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
