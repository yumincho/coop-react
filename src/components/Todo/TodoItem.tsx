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

const TodoItem = ({ id }: { id: number }) => {
  const { toggleTodo, getTodo, setTodoContent, deleteTodo } = useTodoStore()

  const todo = getTodo(id)
  const [tempCompleted, setTempCompleted] = useState(todo.completed)
  const [timerId, setTimerId] = useState<number | null>(null)

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoContent(id, e.target.value)
  }

  const handleDone = () => {
    const id = setTimeout(() => toggleTodo(todo.id, true), 1000)
    setTempCompleted(true)
    setTimerId(id)
  }

  const handleRollback = () => {
    toggleTodo(id, false)
    setTempCompleted(false)
    clearTimeout(timerId!)
  }

  const handleBlur = () => {
    if (todo.content === '') {
      deleteTodo(id)
    }
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
        placeholder="New Todo"
        onBlur={handleBlur}
        fullWidth
      />
      <DueDate idx={id} disabled={tempCompleted} />
    </div>
  )
}

export default TodoItem
