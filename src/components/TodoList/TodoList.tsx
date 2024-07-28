// import { css } from '@emotion/css'
import { Add } from '@mui/icons-material'
import { IconButton as IconButtonComponent } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useEffect } from 'react'

import { useTodo } from '../../lib/useTodo'
import { Todo } from '../../store/todoStore'
import TodoItem from '../Todo/TodoItem'

interface TodoList {
  title: string
  todos: Todo[]
  editable?: boolean
}

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '1rem',
  borderRadius: '1rem',
  height: 'fit-content',
  backgroundColor: theme.palette.background.default,
}))

const Title = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  marginLeft: '0.5rem',
  marginBottom: '0.5rem',
  minHeight: '40px',
})

const IconButton = styled(IconButtonComponent)(({ theme }) => ({
  color: theme.palette.primary.main,
}))

const TodoList = ({ title, todos, editable = false }: TodoList) => {
  const { createTodo, fetchTodoList } = useTodo()

  useEffect(() => {
    async function fetch() {
      fetchTodoList()
    }
    fetch()
  }, [])

  return (
    <Wrapper>
      <Title>
        <h3>{title}</h3>
        {editable && (
          <IconButton onClick={createTodo}>
            <Add />
          </IconButton>
        )}
      </Title>
      {todos.map((todo) => (
        <TodoItem key={todo.id} id={todo.id} />
      ))}
    </Wrapper>
  )
}

export default TodoList
