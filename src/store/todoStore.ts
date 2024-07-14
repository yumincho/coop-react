import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface Todo {
  id: number
  completed: boolean
  content: string
  due: Date
}

export interface TodoStore {
  todos: Todo[]
  nextId: number
  addTodo: () => void
  deleteTodo: (id: number) => void
  toggleTodo: (id: number, completed?: boolean) => void
  setTodoContent: (id: number, content: string) => void
  setTodoDue: (id: number, due: Date) => void
  getTodo: (id: number) => Todo
  getScheduledTodos: () => Todo[]
  getCompletedTodos: () => Todo[]
}

export const useTodoStore = create(
  persist<TodoStore>(
    (set, get) => ({
      todos: [],
      nextId: 0,
      addTodo: () =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: state.nextId,
              completed: false,
              content: '',
              due: new Date(),
            },
          ],
          nextId: state.nextId + 1,
        })),
      deleteTodo: (id) =>
        set((state) => {
          const newTodos = [...state.todos]
          return { todos: newTodos.filter((todo) => todo.id !== id) }
        }),
      toggleTodo: (id, completed) =>
        set((state) => {
          const newTodos = [...state.todos]
          newTodos.filter((todo) => todo.id === id)[0].completed =
            completed ?? !newTodos.filter((todo) => todo.id === id)[0].completed
          return { todos: newTodos }
        }),
      setTodoContent: (id, content) =>
        set((state) => {
          const newTodos = [...state.todos]
          newTodos.filter((todo) => todo.id === id)[0].content = content
          return { todos: newTodos }
        }),
      setTodoDue: (id, date) =>
        set((state) => {
          const newTodos = [...state.todos]
          newTodos.filter((todo) => todo.id === id)[0].due = date
          return { todos: newTodos }
        }),
      getTodo: (id) => get().todos.filter((todo) => todo.id === id)[0],
      getScheduledTodos: () => get().todos.filter((todo) => !todo.completed),
      getCompletedTodos: () => get().todos.filter((todo) => todo.completed),
    }),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
