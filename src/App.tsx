import { useTranslation } from 'react-i18next'

import './App.css'
import Header from './components/Header/Header'
import TodoList from './components/TodoList/TodoList'
import { useTodoStore } from './store/todoStore'

function App() {
  const { getScheduledTodos, getCompletedTodos } = useTodoStore()
  const { t } = useTranslation()

  return (
    <>
      <Header />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
        }}
      >
        <TodoList title={t('scheduled')} todos={getScheduledTodos()} editable />
        <TodoList title={t('completed')} todos={getCompletedTodos()} />
      </div>
    </>
  )
}

export default App
