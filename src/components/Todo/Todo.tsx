import { css } from '@emotion/css'
import { Circle, CircleOutlined } from '@mui/icons-material'
import { IconButton, TextField } from '@mui/material'
import { useState } from 'react'

import { useTodoStore } from '../../store/todoStore'
import DueDate from './DueDate'

const wrapper = css({
  display: 'flex',
  alignItems: 'center',
})

const Todo = ({ idx }: { idx: number }) => {
  const { toggleTodo, getTodo, setTodoContent } = useTodoStore()

  const todo = getTodo(idx)
  const [tempCompleted, setTempCompleted] = useState(todo.completed)
  const [timerId, setTimerId] = useState<number | null>(null)

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoContent(idx, e.target.value)
  }

  const handleDone = () => {
    const id = setTimeout(() => toggleTodo(idx, true), 1000)
    setTempCompleted(true)
    setTimerId(id)
  }

  const handleRollback = () => {
    toggleTodo(idx, false)
    setTempCompleted(false)
    clearTimeout(timerId!)
  }

  return (
    <div className={wrapper}>
      <IconButton onClick={tempCompleted ? handleRollback : handleDone}>
        {tempCompleted ? <Circle /> : <CircleOutlined />}
      </IconButton>
      <TextField
        autoFocus
        disabled={tempCompleted}
        variant="standard"
        value={todo.content}
        onChange={handleTyping}
        fullWidth
      />
      <DueDate disabled={tempCompleted} />
    </div>
  )
}

export default Todo
