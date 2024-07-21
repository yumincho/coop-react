import { create } from 'zustand'

export interface Todo {
  id: string
  completed: boolean
  content: string
  due: Date
}
export interface TodoStore {
  todos: Todo[]

  updateTodoItem: (id: string, todo: Todo) => void
  updateTodoList: (todos: Todo[]) => void

  getTodo: (id: string) => Todo
  getScheduledTodos: () => Todo[]
  getCompletedTodos: () => Todo[]
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],

  updateTodoItem: (id, todo) =>
    set((state) => ({
      todos: state.todos.map((t) => (t.id === id ? todo : t)),
    })),
  updateTodoList: (todos) => set(() => ({ todos })),

  getTodo: (id) => get().todos.filter((todo) => todo.id === id)[0],
  getScheduledTodos: () => get().todos.filter((todo) => !todo.completed),
  getCompletedTodos: () => get().todos.filter((todo) => todo.completed),
}))
