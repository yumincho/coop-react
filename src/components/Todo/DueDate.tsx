import { useState } from 'react'

const getISOString = (date: Date) => date.toISOString().split('T')[0]

interface DueDateProps {
  disabled?: boolean
}

const DueDate = ({ disabled }: DueDateProps) => {
  const today = new Date()
  const [dueDate, setDueDate] = useState<Date>(today)

  return (
    <input
      disabled={disabled}
      type="date"
      defaultValue={getISOString(dueDate)}
      value={getISOString(dueDate)}
      onChange={(e) => setDueDate(new Date(e.target.value))}
    />
  )
}

export default DueDate
