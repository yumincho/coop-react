import { css } from '@emotion/css'
import { useState } from 'react'

const getISOString = (date: Date) => date.toISOString().split('T')[0]

interface DueDateProps {
  disabled?: boolean
}

const style = css({
  minWidth: '108px',
  height: '1.2rem',
  marginLeft: '0.5rem',
})

const DueDate = ({ disabled }: DueDateProps) => {
  const today = new Date()
  const [dueDate, setDueDate] = useState<Date>(today)

  return (
    <input
      className={style}
      disabled={disabled}
      type="date"
      value={getISOString(dueDate)}
      onChange={(e) => setDueDate(new Date(e.target.value))}
    />
  )
}

export default DueDate
