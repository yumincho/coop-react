import { create } from 'zustand'

export interface TodoProps {
  completed: boolean
}

export interface TodoStore {
  todos: TodoProps[]
  addTodo: () => void
  toggleTodo: (idx: number) => void
  getTodoState: (idx: number) => boolean
  hasScheduledTodos: () => boolean
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  addTodo: () =>
    set((state) => ({ todos: [...state.todos, { completed: false }] })),
  toggleTodo: (idx) =>
    set((state) => {
      const newTodos = [...state.todos]
      newTodos[idx].completed = !newTodos[idx].completed
      return { todos: newTodos }
    }),
  getTodoState: (idx) => get().todos[idx].completed,
  hasScheduledTodos: () => get().todos.length > 0,
}))
