// src/contexts/NotificationContext.tsx
import { createContext, useContext, useReducer } from 'react'

export interface Notification {
  id:      string
  message: string
  type:    'info' | 'success' | 'error'
}

type NotificationState = Notification[]

type NotificationAction =
  | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id'> }
  | { type: 'REMOVE_NOTIFICATION'; id: string }
  | { type: 'CLEAR_ALL' }

function notificationReducer(state: NotificationState, action: NotificationAction): NotificationState {
  switch (action.type) {
    case 'ADD_NOTIFICATION': {
      const id = Math.random().toString(36).substring(2, 9)
      return [...state, { ...action.payload, id }]
    }
    case 'REMOVE_NOTIFICATION':
      return state.filter((item) => item.id !== action.id)
    case 'CLEAR_ALL':
      return []
    default:
      return state
  }
}

interface NotificationContextValue {
  notifications: Notification[]
  addNotification: (message: string, type: Notification['type']) => void
  removeNotification: (id: string) => void
  clearAll: () => void
}

const NotificationContext = createContext<NotificationContextValue | null>(null)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(notificationReducer, [])

  function addNotification(message: string, type: Notification['type']) {
    dispatch({ type: 'ADD_NOTIFICATION', payload: { message, type } })
  }

  function removeNotification(id: string) {
    dispatch({ type: 'REMOVE_NOTIFICATION', id })
  }

  function clearAll() {
    dispatch({ type: 'CLEAR_ALL' })
  }

  return (
    <NotificationContext value={{ notifications: state, addNotification, removeNotification, clearAll }}>
      {children}
    </NotificationContext>
  )
}

export function useNotifications(): NotificationContextValue {
  const context = useContext(NotificationContext)
  if (!context) throw new Error('useNotifications debe usarse dentro de <NotificationProvider>')
  return context
}
