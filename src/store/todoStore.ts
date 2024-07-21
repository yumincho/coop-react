import { create } from 'zustand'

import { createTodo, deleteTodo, updateTodo } from '../api/api'

export interface Todo {
  id: string
  completed: boolean
  content: string
  due: Date
}
export interface TodoStore {
  todos: Todo[]
  addTodo: () => void
  setTodoList: (todos: Todo[]) => void
  deleteTodo: (id: string) => void
  toggleTodo: (id: string, completed?: boolean) => void
  setTodoContent: (id: string, content: string) => void
  setTodoDue: (id: string, due: Date) => void
  getTodo: (id: string) => Todo
  getScheduledTodos: () => Todo[]
  getCompletedTodos: () => Todo[]
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  addTodo: async () => {
    const res = await createTodo()
    if (res.type === 'success' && res.data) {
      set((state) => ({
        todos: [
          ...state.todos,
          {
            id: res.data.id,
            completed: res.data.completed,
            content: res.data.content,
            due: res.data.due,
          },
        ],
      }))
    }
  },
  setTodoList: (todos) => set({ todos }),
  deleteTodo: async (id) => {
    const res = await deleteTodo(id)
    if (res.type === 'success') {
      set((state) => {
        const newTodos = [...state.todos]
        return { todos: newTodos.filter((todo) => todo.id !== id) }
      })
    }
  },
  toggleTodo: async (id, completed) => {
    const oldTodo = get().getTodo(id)
    const res = await updateTodo(id, {
      ...oldTodo,
      completed: completed ?? !oldTodo.completed,
    })
    if (res.type === 'success') {
      set((state) => {
        const newTodos = [...state.todos]
        newTodos.filter((todo) => todo.id === id)[0].completed =
          completed ?? !newTodos.filter((todo) => todo.id === id)[0].completed
        return { todos: newTodos }
      })
    }
  },
  setTodoContent: async (id, content) => {
    const oldTodo = get().getTodo(id)
    const res = await updateTodo(id, {
      ...oldTodo,
      content,
    })
    if (res.type === 'success') {
      set((state) => {
        const newTodos = [...state.todos]
        newTodos.filter((todo) => todo.id === id)[0].content = content
        return { todos: newTodos }
      })
    }
  },
  setTodoDue: async (id, date) => {
    const oldTodo = get().getTodo(id)
    const res = await updateTodo(id, {
      ...oldTodo,
      due: date,
    })
    if (res.type === 'success') {
      set((state) => {
        const newTodos = [...state.todos]
        newTodos.filter((todo) => todo.id === id)[0].due = date
        return { todos: newTodos }
      })
    }
  },
  getTodo: (id) => get().todos.filter((todo) => todo.id === id)[0],
  getScheduledTodos: () => get().todos.filter((todo) => !todo.completed),
  getCompletedTodos: () => get().todos.filter((todo) => todo.completed),
}))
