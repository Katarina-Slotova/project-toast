import React from 'react'

function useEscapeKey(key, callback) {
  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === key) callback(event)
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [key, callback])
}

export default useEscapeKey
