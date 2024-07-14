import { create } from 'zustand'

export interface TodoProps {
  idx: number
  completed: boolean
  content: string
}

export interface TodoStore {
  todos: TodoProps[]
  addTodo: () => void
  toggleTodo: (idx: number, completed?: boolean) => void
  setTodoContent: (idx: number, content: string) => void
  getTodo: (idx: number) => TodoProps
  getScheduledTodos: () => TodoProps[]
  getCompletedTodos: () => TodoProps[]
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  addTodo: () =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          idx: state.todos.length,
          completed: false,
          content: `New Todo ${state.todos.length + 1}`,
        },
      ],
    })),
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
  getTodo: (idx) => get().todos[idx],
  getScheduledTodos: () => get().todos.filter((todo) => !todo.completed),
  getCompletedTodos: () => get().todos.filter((todo) => todo.completed),
}))
