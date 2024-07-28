import {
  RadioButtonChecked as RadioButtonCheckedComponent,
  RadioButtonUnchecked,
} from '@mui/icons-material'
import { IconButton, TextField, styled } from '@mui/material'
import { useState } from 'react'

import { useDebounce } from '../../lib/useDebounce'
import { useTodo } from '../../lib/useTodo'
import DueDate from './DueDate'

const Wrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
})

const RadioButtonChecked = styled(RadioButtonCheckedComponent)(({ theme }) => ({
  color: theme.palette.primary.main,
}))

const TodoItem = ({ id }: { id: string }) => {
  const debounce = useDebounce()
  const { getTodo, updateTodoContent, updateTodoCompleted, deleteTodo } =
    useTodo()

  const todo = getTodo(id)

  const [tempCompleted, setTempCompleted] = useState(todo.completed)
  const [completedTmerId, setCompletedTimerId] = useState<number | null>(null)
  const [content, setContent] = useState(todo.content)

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
    debounce(() => updateTodoContent(id, e.target.value), 250)
  }

  const handleDone = () => {
    const id = setTimeout(() => updateTodoCompleted(todo.id, true), 1000)
    setTempCompleted(true)
    setCompletedTimerId(id)
  }

  const handleRollback = () => {
    updateTodoCompleted(id, false)
    setTempCompleted(false)
    clearTimeout(completedTmerId!)
  }

  const handleBlur = () => {
    if (todo.content === '') {
      deleteTodo(id)
    }
  }

  return (
    <Wrapper>
      <IconButton onClick={tempCompleted ? handleRollback : handleDone}>
        {tempCompleted ? <RadioButtonChecked /> : <RadioButtonUnchecked />}
      </IconButton>
      <TextField
        autoFocus
        disabled={tempCompleted}
        variant="standard"
        value={content}
        onChange={handleTyping}
        placeholder="New Todo"
        onBlur={handleBlur}
        fullWidth
      />
      <DueDate id={id} disabled={tempCompleted} />
    </Wrapper>
  )
}

export default TodoItem
