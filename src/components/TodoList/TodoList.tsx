import { css } from '@emotion/css'
import { Add } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useState } from 'react'

import Todo from '../Todo/Todo'

interface Todo {
  completed: boolean
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([])

  const toggleTodoCompleted = (index: number) => {
    setTodos((curr) => {
      const newTodos = [...curr]
      newTodos[index].completed = !newTodos[index].completed
      return newTodos
    })
  }

  return (
    <div>
      <h1>Todo List</h1>
      <Button
        startIcon={<Add />}
        variant="contained"
        onClick={() => setTodos((curr) => [...curr, { completed: false }])}
      >
        Add Todo
      </Button>
      {todos.map(
        ({ completed }, i) =>
          !completed && (
            <Todo
              key={i}
              idx={i}
              completed={completed}
              toggleTodoCompleted={toggleTodoCompleted}
            />
          ),
      )}
      {todos.filter(({ completed }) => !completed).length === 0 && (
        <p
          className={css`
            color: #999999;
          `}
        >
          No To-do Yet! 🧑‍💻
        </p>
      )}
    </div>
  )
}

export default TodoList
