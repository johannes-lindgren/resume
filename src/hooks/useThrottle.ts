import {useEffect, useRef, useState} from "react";

export const useThrottle = <T>(value: T, delayMs: number): T => {
  const [throttledValue, setThrottledValue] = useState<T>(value)

  useEffect(() => {
    const handleTimeout = () => {
      setThrottledValue(value)
    }
    const timeoutHandle = setTimeout(handleTimeout, delayMs);
    return () => {
      clearTimeout(timeoutHandle)
    }
  }, [delayMs, value])

  return throttledValue
}