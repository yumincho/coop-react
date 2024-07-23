import { useCallback, useRef } from 'react'

export const useDebounce = () => {
  const schedule = useRef<number | null>(null)

  return useCallback((callback: () => void, delay: number) => {
    if (schedule.current) clearTimeout(schedule.current)
    schedule.current = setTimeout(() => callback(), delay)
  }, [])
}
