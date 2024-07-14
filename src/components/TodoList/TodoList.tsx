import { css } from '@emotion/css'

import { Todo } from '../../store/todoStore'
import { colors } from '../../styles/color'
import TodoItem from '../Todo/TodoItem'

const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.idx} idx={todo.idx} />
      ))}
      {todos.length === 0 && (
        <p className={css({ color: colors.neutral.dark })}>No To-do Yet! 🧑‍💻</p>
      )}
    </div>
  )
}

export default TodoList
