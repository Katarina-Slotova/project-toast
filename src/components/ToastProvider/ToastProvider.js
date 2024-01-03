import React from 'react'

export const ToastContext = React.createContext()

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([])

	// dismiss all toasts by pressing Escape key
  React.useEffect(() => {
    function handleKeyDown(event) {
      return event.key === 'Escape' ? setToasts([]) : ''
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

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
