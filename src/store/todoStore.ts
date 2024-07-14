import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface Todo {
  idx: number
  completed: boolean
  content: string
  due: Date
}

export interface TodoStore {
  todos: Todo[]
  addTodo: () => void
  deleteTodo: (idx: number) => void
  toggleTodo: (idx: number, completed?: boolean) => void
  setTodoContent: (idx: number, content: string) => void
  setTodoDue: (idx: number, due: Date) => void
  getTodo: (idx: number) => Todo
  getScheduledTodos: () => Todo[]
  getCompletedTodos: () => Todo[]
}

export const useTodoStore = create(
  persist<TodoStore>(
    (set, get) => ({
      todos: [],
      addTodo: () =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              idx: state.todos.length,
              completed: false,
              content: '',
              due: new Date(),
            },
          ],
        })),
      deleteTodo: (idx) =>
        set((state) => {
          const newTodos = [...state.todos]
          newTodos.splice(idx, 1)
          return { todos: newTodos }
        }),
      toggleTodo: (idx, completed) =>
        set((state) => {
          const newTodos = [...state.todos]
          newTodos[idx].completed = completed ?? !newTodos[idx].completed
          return { todos: newTodos }
        }),
      setTodoContent: (idx, content) =>
        set((state) => {
          const newTodos = [...state.todos]
          newTodos[idx].content = content
          return { todos: newTodos }
        }),
      setTodoDue: (idx, date) =>
        set((state) => {
          const newTodos = [...state.todos]
          newTodos[idx].due = date
          return { todos: newTodos }
        }),
      getTodo: (idx) => get().todos[idx],
      getScheduledTodos: () => get().todos.filter((todo) => !todo.completed),
      getCompletedTodos: () => get().todos.filter((todo) => todo.completed),
    }),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
