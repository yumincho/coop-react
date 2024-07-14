import { css } from '@emotion/css'
import { Add } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useState } from 'react'

import { colors } from '../../styles/color'
import Todo from '../Todo/Todo'

interface Todo {
  completed: boolean
}

const header = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem',
})

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
      <div className={header}>
        <h2>Todo List</h2>
        <IconButton
          style={{ color: colors.primary.main }}
          onClick={() => setTodos((curr) => [...curr, { completed: false }])}
        >
          <Add />
        </IconButton>
      </div>
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
        <p className={css({ color: colors.neutral.dark })}>No To-do Yet! 🧑‍💻</p>
      )}
    </div>
  )
}

export default TodoList
