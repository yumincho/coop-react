import { Circle, CircleOutlined } from '@mui/icons-material'
import { IconButton, TextField } from '@mui/material'
import { useState } from 'react'

import DueDate from './DueDate'

const Todo = () => {
  const [content, setContent] = useState('')
  const [done, setDone] = useState(false)

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
  }

  return (
    <div>
      <IconButton>
        {done ? (
          <Circle onClick={() => setDone(false)} />
        ) : (
          <CircleOutlined onClick={() => setDone(true)} />
        )}
      </IconButton>
      <span>
        <TextField
          autoFocus
          disabled={done}
          variant="standard"
          value={content}
          onChange={handleTyping}
        />
        <DueDate disabled={done} />
      </span>
    </div>
  )
}

export default Todo
