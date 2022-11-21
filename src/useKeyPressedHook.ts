import { useEffect } from 'react'
import { useState } from 'react'

type KeyType = { key: string }

export const useKeyPress = (targetKey: string) => {
  const [keyPressed, setKeyPressed] = useState<boolean>(false)
  
  useEffect(() => {

    function downHandler({ key }: KeyType) {
        if (key === targetKey) {
          setKeyPressed(true)
        }
      }
      const upHandler = ({ key }: KeyType) => {
        if (key === targetKey) {
          setKeyPressed(false)
        }
      }

    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)
    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [targetKey])
  return keyPressed
}
