import React, {useState, useEffect, ChangeEvent} from 'react';
import './App.css';
import {DataConnection} from "./DataConnection";


function App() {

    const [todoList, setTodoList] = useState<Todo[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [inputText, setInputText] = useState("");

    const dataConnection = new DataConnection();

    useEffect(() => {
        dataConnection.getData().then((result: any) => {
            setTodoList(result);
            setLoaded(true);
        }).catch((error: string) => {
            alert(error)
        })
    }, []);

    let addNewTodoButtonText: string = 'Feladat hozzáadása';
    let errorButtonText: string = 'Hiba!'
    let addNewTodoOkButtonText: string = 'OK';

    function addTodoClick() {
        setOpenModal(true);
    }

    function closeModal() {
        let newTodo: Todo = {
            text: inputText,
            complete: false
        }
        dataConnection.addData(newTodo);
        const newTodoList = [...todoList, newTodo];
        setTodoList(newTodoList);
        setOpenModal(false);
    }

    const newTodoInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    }

    function errorClick() {
        dataConnection.getData(true).then(result => {
        }).catch(error => {
            alert(error)
        })
    }

    return (
        <>
            {!loaded ? <div>Töltődik...</div> :
                <div className="App">
                    <h2>Todo list</h2>
                    <CheckList todoList={todoList}/>
                    <Button buttonText={addNewTodoButtonText} onClick={addTodoClick}/>
                    <Button buttonText={errorButtonText} onClick={errorClick}/>
                    <Modal open={openModal} newTodoInputChange={newTodoInputChange}
                           buttonFunction={closeModal} addNewTodoOkButtonText={addNewTodoOkButtonText}/>
                </div>
            }
        </>
    );
}

export function CheckList(props: { todoList: Todo[] }): JSX.Element {

    function handleCheckboxActiveState() {
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
                                           onClick={() => handleCheckboxActiveState}
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

export function Modal(props: {open: boolean, newTodoInputChange: any, buttonFunction: any, addNewTodoOkButtonText: string}):JSX.Element {

    if (!props.open) {
        return <></>;
    }
    return (
        <div>
            <label>Új feladat: </label>
            <input type='text' onChange={props.newTodoInputChange} />
            <Button buttonText={props.addNewTodoOkButtonText} onClick={props.buttonFunction} />
        </div>
    )
}

export default App;

export interface Todo {
    text: string;
    complete: boolean
}
