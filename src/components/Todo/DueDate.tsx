import { css } from '@emotion/css'

import { useTodoStore } from '../../store/todoStore'

const getISOString = (date: Date) => date.toISOString().split('T')[0]

interface DueDateProps {
  id: string
  disabled?: boolean
}

const style = css({
  minWidth: '108px',
  height: '1.2rem',
  marginLeft: '0.5rem',
})

const DueDate = ({ id, disabled }: DueDateProps) => {
  const { getTodo, setTodoDue } = useTodoStore()

  // Date type is stored as string in localStorage
  const due = getTodo(id).due

  return (
    <input
      className={style}
      disabled={disabled}
      type="date"
      value={due ? getISOString(due) : ''}
      onChange={(e) => setTodoDue(id, new Date(e.target.value))}
    />
  )
}

export default DueDate
