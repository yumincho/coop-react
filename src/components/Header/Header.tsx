import { css } from '@emotion/css'
import { useTheme } from '@mui/material'

import { useTodoStore } from '../../store/todoStore'

const header = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '1rem',
})

function Header() {
  const { todos } = useTodoStore()
  const theme = useTheme()

  return (
    <div className={header} style={{ color: theme.palette.primary.main }}>
      <h2>Todo List</h2>
      <h2>{todos.length}</h2>
    </div>
  )
}

export default Header
