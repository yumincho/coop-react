import './App.css'
import Header from './components/Header/Header'
import TodoList from './components/TodoList/TodoList'
import { useTodoStore } from './store/todoStore'

function App() {
  const { getScheduledTodos, getCompletedTodos } = useTodoStore()
  return (
    <>
      <Header />
      scheduled
      <TodoList todos={getScheduledTodos()} />
      completed
      <TodoList todos={getCompletedTodos()} />
    </>
  )
}

export default App
