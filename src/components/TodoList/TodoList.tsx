import { css } from '@emotion/css'

import { useTodoStore } from '../../store/todoStore'
import { colors } from '../../styles/color'
import Todo from '../Todo/Todo'

const TodoList = () => {
  const { todos, hasScheduledTodos } = useTodoStore()

  return (
    <div>
      {todos.map(({ completed }, i) => !completed && <Todo key={i} idx={i} />)}
      {!hasScheduledTodos() && (
        <p className={css({ color: colors.neutral.dark })}>No To-do Yet! 🧑‍💻</p>
      )}
    </div>
  )
}

export default TodoList
