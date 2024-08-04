import { css } from '@emotion/css'
import { useTranslation } from 'react-i18next'

import './App.css'
import Header from './components/Header/Header'
import TodoList from './components/TodoList/TodoList'
import { useTodoStore } from './store/todoStore'

const BREAK_POINT = 768

const wrapper = css({
  gridTemplateRows: '1fr 1fr',
  display: 'grid',
  gap: '1rem',
  [`@media (min-width: ${BREAK_POINT}px)`]: {
    gridTemplateRows: '1fr',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
})

function App() {
  const { getScheduledTodos, getCompletedTodos } = useTodoStore()
  const { t } = useTranslation()

  return (
    <>
      <Header />
      <div className={wrapper}>
        <TodoList title={t('scheduled')} todos={getScheduledTodos()} editable />
        <TodoList title={t('completed')} todos={getCompletedTodos()} />
      </div>
    </>
  )
}

export default App
