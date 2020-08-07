/* eslint-disable arrow-parens */
import { useRef, useEffect } from 'react'

const usePrevious = <T>(value: T): T | null => {
  const ref = useRef(value)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export default usePrevious
