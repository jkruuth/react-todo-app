import React, { useState } from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'

const TodoList = () => {
    const [todos, setTodos] = useState([])
    const [visibility, setVisibility] = useState('all')
    const [toggleAll, setToggleAll] = useState(true)

    const addTodo = todo => {
        if (todo.text === '') return
        const newTodos = [todo, ...todos]
        setTodos(newTodos)
    }

    const toggleComplete = (id) =>{
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    complete: !todo.complete
                }
            } else return todo
        }))
    }

    const removeTodo = (id) => {
        const newTodos = todos.filter(todo => todo.id !== id)

        setTodos(newTodos)
    }

    const removeAllCompleted = () => {
        const newTodos = todos.filter(todo => !todo.complete)

        setTodos(newTodos)
    }

    const updateVisibility = s => {
        setVisibility(s)
    }

    const toggleState = () => {
        setTodos(
            todos.map(todo => ({
                ...todo,
                complete: toggleAll
            }))
        )

        setToggleAll(!toggleAll)
    }

    let tempTodos = []

    if (visibility === 'all') {
        tempTodos = todos
    }
    else if (visibility === 'active') {
        tempTodos = todos.filter(todo => !todo.complete)
    }
    else if (visibility === 'completed') {
        tempTodos = todos.filter(todo => todo.complete)
    }

    return (
        <div>
            <TodoForm createTodo={addTodo} />
            {tempTodos.map(todo => (
                <Todo 
                    key={todo.id} 
                    todo={todo} 
                    toggleComplete={() => toggleComplete(todo.id)}
                    removeTodo={() => removeTodo(todo.id)}/>
            ))}
            <div>Todos left: {todos.filter(todo => !todo.complete).length}</div>
            <button onClick={() => updateVisibility('all')}>all</button>
            <button onClick={() => updateVisibility('active')}>active</button>
            <button onClick={() => updateVisibility('completed')}>completed</button>
            {todos.some(todo => todo.complete) ? (
            <div>
                <button onClick={() => removeAllCompleted()}>
                    Delete all completed tasks
                </button>
            </div>
            ) : null}
            <div>
                <button onClick={toggleState}>
                toggle all complete: {`${toggleAll}`}
                </button>
            </div>
        </div>
    )
}


export default TodoList