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
    if (res.ok) {
      updateTodoList([...todos, res.data])
    }
  }

  const fetchTodoList = async () => {
    const res = await fetchTodoListAPI()
    if (res.ok) {
      updateTodoList(res.data)
    }
  }

  const updateTodoCompleted = async (id: string, completed: boolean) => {
    const todo = getTodo(id)
    const res = await updateTodoAPI(id, { ...todo, completed })
    if (res.ok) {
      updateTodoItem(id, { ...todo, completed })
    }
  }

  const updateTodoContent = async (id: string, content: string) => {
    const todo = getTodo(id)
    const res = await updateTodoAPI(id, { ...todo, content })
    if (res.ok) {
      updateTodoItem(id, { ...todo, content })
    }
  }

  const updateTodoDue = async (id: string, due: Date) => {
    const todo = getTodo(id)
    const res = await updateTodoAPI(id, { ...todo, due })
    if (res.ok) {
      updateTodoItem(id, { ...todo, due })
    }
  }

  const deleteTodo = async (id: string) => {
    const res = await deleteTodoAPI(id)
    if (res.ok) {
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
