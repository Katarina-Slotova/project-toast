import React from 'react'

import useKeydown from '../../hooks/use-keydown'

export const ToastContext = React.createContext()

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([])

  // memoization used to avoid running the code for dismissing all toasts every time toasts array gets updated
  // every time toasts is updated, this component's code reruns and a new setToasts function is created
  // because callback is listed as a dependency in the custom hook, it'll rerun all of the code in the hook because it thinks it's a brand new callback function
  const handleEscape = React.useCallback(() => setToasts([]), [])

  // dismiss all toasts by pressing Escape key
  useKeydown('Escape', handleEscape)

  // create a toast
  function createToast(message, variant) {
    const nextToasts = [
      ...toasts,
      { id: crypto.randomUUID(), message, variant },
    ]
    setToasts(nextToasts)
  }
  // dismiss a toast
  function dismissToast(id) {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id
    })
    setToasts(nextToasts)
  }

  return (
    <ToastContext.Provider
      value={{ toasts, createToast, dismissToast, setToasts }}
    >
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider
