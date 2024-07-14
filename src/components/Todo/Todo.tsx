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
  const { toggleTodo, getTodoState } = useTodoStore()

  const [content, setContent] = useState('')
  const [tempCompleted, setTempCompleted] = useState(getTodoState(idx))
  const [timerId, setTimerId] = useState<number | null>(null)

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
  }

  const handleDone = () => {
    const id = setTimeout(() => toggleTodo(idx), 1000)
    setTempCompleted(true)
    setTimerId(id)
  }

  const handleRollback = () => {
    setTempCompleted(false)
    clearTimeout(timerId!)
  }

  return (
    <div className={wrapper}>
      <IconButton>
        {tempCompleted ? (
          <Circle onClick={handleRollback} />
        ) : (
          <CircleOutlined onClick={handleDone} />
        )}
      </IconButton>
      <TextField
        autoFocus
        disabled={tempCompleted}
        variant="standard"
        value={content}
        onChange={handleTyping}
        fullWidth
      />
      <DueDate disabled={tempCompleted} />
    </div>
  )
}

export default Todo
