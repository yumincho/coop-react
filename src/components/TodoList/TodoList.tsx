import { css } from '@emotion/css'
import { Add } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useEffect } from 'react'

import { readTodos } from '../../api/api'
import { Todo, useTodoStore } from '../../store/todoStore'
import { colors } from '../../styles/color'
import TodoItem from '../Todo/TodoItem'

interface TodoList {
  title: string
  todos: Todo[]
  editable?: boolean
}

const style = {
  wrapper: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '1rem',
    backgroundColor: colors.neutral.light,
    borderRadius: '1rem',
    height: 'fit-content',
  }),
  header: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginLeft: '0.5rem',
    marginBottom: '0.5rem',
    minHeight: '40px',
  }),
}

const TodoList = ({ title, todos, editable = false }: TodoList) => {
  const { addTodo, setTodoList } = useTodoStore()

  useEffect(() => {
    async function fetchTodos() {
      const res = await readTodos()
      if (res.type === 'success' && res.data) {
        setTodoList(res.data)
      }
    }
    fetchTodos()
  }, [setTodoList])

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <h3>{title}</h3>
        {editable && (
          <IconButton style={{ color: colors.primary.main }} onClick={addTodo}>
            <Add />
          </IconButton>
        )}
      </div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} id={todo.id} />
      ))}
    </div>
  )
}

export default TodoList
