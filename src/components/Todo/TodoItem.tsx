import { css } from '@emotion/css'
import { RadioButtonChecked, RadioButtonUnchecked } from '@mui/icons-material'
import { IconButton, TextField } from '@mui/material'
import { useState } from 'react'

import { useTodoStore } from '../../store/todoStore'
import { colors } from '../../styles/color'
import DueDate from './DueDate'

const style = {
  wrapper: css({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  }),
  checkedButton: css({
    color: colors.primary.main,
  }),
}

const TodoItem = ({ idx }: { idx: number }) => {
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
    <div className={style.wrapper}>
      <IconButton onClick={tempCompleted ? handleRollback : handleDone}>
        {tempCompleted ? (
          <RadioButtonChecked className={style.checkedButton} />
        ) : (
          <RadioButtonUnchecked />
        )}
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

export default TodoItem
