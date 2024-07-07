import { Add } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useState } from 'react'

import Todo from '../Todo/Todo'

const TodoList = () => {
  const [todos, setTodos] = useState(0)

  return (
    <div>
      <h1>Todo List</h1>
      <Button
        startIcon={<Add />}
        variant="contained"
        onClick={() => setTodos((curr) => curr + 1)}
      >
        Add Todo
      </Button>
      {[...Array(todos)].map((_, i) => (
        <Todo key={i} />
      ))}
    </div>
  )
}

export default TodoList
