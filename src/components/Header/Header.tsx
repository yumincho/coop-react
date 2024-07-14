import { css } from '@emotion/css'
import { Add } from '@mui/icons-material'
import { IconButton } from '@mui/material'

import { useTodoStore } from '../../store/todoStore'
import { colors } from '../../styles/color'

const header = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem',
})

function Header() {
  const { addTodo } = useTodoStore()

  return (
    <>
      <div className={header}>
        <h2>Todo List</h2>
        <IconButton
          style={{ color: colors.primary.main }}
          onClick={() => addTodo()}
        >
          <Add />
        </IconButton>
      </div>
    </>
  )
}

export default Header
