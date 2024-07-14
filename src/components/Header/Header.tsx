import { css } from '@emotion/css'

import { useTodoStore } from '../../store/todoStore'
import { colors } from '../../styles/color'

const header = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: colors.primary.main,
  margin: '1rem',
})

function Header() {
  const { todos } = useTodoStore()

  return (
    <div className={header}>
      <h2>Todo List</h2>
      <h2>{todos.length}</h2>
    </div>
  )
}

export default Header
