import React, { useState } from 'react'

const TodoForm = ({ createTodo }) => {
    const [todo, setTodo] = useState('')

    const handleChange = event => {
        setTodo(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        createTodo({
            id: Math.floor(Math.random() * 10000),
            text: todo,
            complete: false
        })
        setTodo('')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <input 
                name="text"
                value={todo}
                onChange={handleChange}
                placeholder='Add something...'
            />
            <button type='submit'>Add todo</button>
            </form>
        </div>
    )
}


export default TodoForm