import { css } from '@emotion/css'

import { TodoProps } from '../../store/todoStore'
import { colors } from '../../styles/color'
import Todo from '../Todo/Todo'

const TodoList = ({ todos }: { todos: TodoProps[] }) => {
  return (
    <div>
      {todos.map((todo) => (
        <Todo key={todo.idx} idx={todo.idx} />
      ))}
      {todos.length === 0 && (
        <p className={css({ color: colors.neutral.dark })}>No To-do Yet! 🧑‍💻</p>
      )}
    </div>
  )
}

export default TodoList
