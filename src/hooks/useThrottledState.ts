import { Reducer, useCallback, useEffect, useReducer, useState } from 'react'
import { Resume } from '@/model/resume'
import { Setter } from '@/utils/Setter'

export type ResumeAppState =
  | {
      type: 'loading'
      resume: undefined
    }
  | {
      type: 'uninitialized'
      resume: undefined
    }
  | {
      type: 'unsaved'
      resume: Resume
    }
  | {
      type: 'saving'
      resume: Resume
    }
  | {
      type: 'saved'
      resume: Resume
    }

export type Actions =
  | {
      type: 'setResume'
      resume: Resume
    }
  | {
      type: 'unsetResume'
    }
  | {
      type: 'saveResume'
    }

const reducer: Reducer<ResumeAppState, Actions> = (prevState, action) => {
  switch (action.type) {
    case 'unsetResume':
      return {
        type: 'uninitialized',
      }
    case 'saveResume':
      if (typeof prevState.resume === 'undefined') {
        return {
          type: 'uninitialized',
        }
      } else {
        return {
          type: 'saved',
          resume: prevState.resume,
        }
      }
    case 'setResume':
      return {
        type: 'unsaved',
        resume: action.resume,
      }
  }
}

export type ResumeActions = {
  setResume: Setter<Resume>
  removeResume: () => void
}

const readFromLocalStorage = (key: string): unknown => {
  try {
    const item = window.localStorage.getItem(key)
    if (item === null) {
      return undefined
    }
    return JSON.parse(item)
  } catch (error) {
    return error
  }
}
const saveToLocalStorage = (key: string, value: unknown) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    return error
  }
}

const localStorageKey = 'resume'

export const useResumeApp = (
  throttleDelayMs: number,
): [ResumeAppState, ResumeActions] => {
  const [state, dispatch] = useReducer(reducer, {
    type: 'loading',
    resume: undefined,
  })
  const setResume = useCallback<Setter<Resume>>(
    (resume) => {
      dispatch({
        type: 'setResume',
        resume,
      })
    },
    [dispatch],
  )

  useEffect(() => {
    const storedValue = readFromLocalStorage(localStorageKey)
    if (typeof storedValue === 'undefined') {
      dispatch({
        type: 'unsetResume',
      })
    } else {
      setResume(storedValue as Resume)
    }
  }, [setResume])

  const removeResume = useCallback(() => {
    localStorage.removeItem(localStorageKey)
    dispatch({
      type: 'unsetResume',
    })
  }, [])

  const saveResume = useCallback(() => {
    saveToLocalStorage(localStorageKey, state.resume)
    dispatch({
      type: 'saveResume',
    })
  }, [state])

  useThrottle(state, throttleDelayMs, saveResume)

  return [state, { setResume, removeResume }]
}

export const useThrottledState = <T>(initialValue: T, delayMs: number): T => {
  const [throttledValue, setThrottledValue] = useState<T>(initialValue)

  const onUpdate = (newValue: T) => {
    setThrottledValue(newValue)
  }

  useThrottle(initialValue, delayMs, onUpdate)

  return throttledValue
}

export const useThrottle = <T>(
  value: T,
  delayMs: number,
  callback: (arg: T) => void,
) => {
  useEffect(() => {
    const handleTimeout = () => {
      callback(value)
    }
    const timeoutHandle = setTimeout(handleTimeout, delayMs)
    return () => {
      clearTimeout(timeoutHandle)
    }
  }, [delayMs, value])
}
