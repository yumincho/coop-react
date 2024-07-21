import {
  createTodoAPI,
  deleteTodoAPI,
  fetchTodoListAPI,
  updateTodoAPI,
} from '../api/api'
import { useTodoStore } from '../store/todoStore'

export function useTodo() {
  const { todos, getTodo, updateTodoItem, updateTodoList } = useTodoStore()

  const createTodo = async () => {
    const res = await createTodoAPI()
    if (res.type === 'success' && res.data) {
      updateTodoList([...todos, res.data])
    }
  }

  const fetchTodoList = async () => {
    const res = await fetchTodoListAPI()
    if (res.type === 'success' && res.data) {
      updateTodoList(res.data)
    }
  }

  const updateTodoCompleted = async (id: string, completed: boolean) => {
    const todo = getTodo(id)
    const res = await updateTodoAPI(id, { ...todo, completed })
    if (res.type === 'success') {
      updateTodoItem(id, { ...todo, completed })
    }
  }

  const updateTodoContent = async (id: string, content: string) => {
    const todo = getTodo(id)
    const res = await updateTodoAPI(id, { ...todo, content })
    if (res.type === 'success') {
      updateTodoItem(id, { ...todo, content })
    }
  }

  const updateTodoDue = async (id: string, due: Date) => {
    const todo = getTodo(id)
    const res = await updateTodoAPI(id, { ...todo, due })
    if (res.type === 'success') {
      updateTodoItem(id, { ...todo, due })
    }
  }

  const deleteTodo = async (id: string) => {
    const res = await deleteTodoAPI(id)
    if (res.type === 'success') {
      updateTodoList(todos.filter((todo) => todo.id !== id))
    }
  }

  return {
    getTodo,
    createTodo,
    fetchTodoList,
    updateTodoCompleted,
    updateTodoContent,
    updateTodoDue,
    deleteTodo,
  }
}
