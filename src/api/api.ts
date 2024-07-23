import Pocketbase from 'pocketbase'

import { Todo } from '../store/todoStore'

const pb = new Pocketbase(import.meta.env.VITE_API_BASE)

const TODOS = 'todos'

export const createTodoAPI = async () => {
  try {
    const res = await pb.collection(TODOS).create({
      completed: false,
      content: '',
      due: new Date(),
    })

    return {
      ok: true as const,
      message: 'Todo created',
      data: {
        id: res.id,
        completed: res.completed,
        content: res.content,
        due: new Date(res.due),
      } as Todo,
    }
  } catch {
    return {
      ok: false as const,
      message: 'Failed to create todo',
    }
  }
}

export const fetchTodoListAPI = async () => {
  try {
    const res = await pb.collection(TODOS).getFullList<Todo>()
    return {
      ok: true as const,
      message: 'Todos fetched',
      data: res.map((todo) => ({
        id: todo.id,
        completed: todo.completed,
        content: todo.content,
        due: new Date(todo.due),
      })),
    }
  } catch {
    return {
      ok: false as const,
      message: 'Failed to get todos',
    }
  }
}

export const updateTodoAPI = async (id: string, todo: Todo) => {
  try {
    // Check if the date is valid
    if (!todo.due || isNaN(todo.due.getTime())) {
      throw new Error('Invalid date')
    }

    await pb.collection(TODOS).update(id, {
      completed: todo.completed,
      content: todo.content,
      due: todo.due,
    })
    return {
      ok: true as const,
      message: 'Todo updated',
    }
  } catch {
    return {
      ok: false as const,
      message: 'Failed to update todo',
    }
  }
}

export const deleteTodoAPI = async (id: string) => {
  try {
    await pb.collection(TODOS).delete(id)
    return {
      ok: true as const,
      message: 'Todo deleted',
    }
  } catch {
    return {
      ok: false as const,
      message: 'Failed to delete todo',
    }
  }
}
