import { Reducer, useCallback, useEffect, useState } from 'react'
import { Resume } from '@/model/resume'
import { Setter2 } from '@/utils/Setter'
import {
  readFromLocalStorage,
  localStorage,
  saveToLocalStorage,
} from '@/localStorage'

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

export type AllResumeActions = {
  setResume: Setter2<Resume>
  newResume: (resume: Resume) => void
  removeResume: () => void
}

export const useResumeApp = (
  throttleDelayMs: number,
): [ResumeAppState, AllResumeActions] => {
  // const [state, dispatch] = useReducer(reducer, {
  //   type: 'loading',
  //   resume: undefined,
  // })
  const [state, setState] = useState<ResumeAppState>({
    type: 'loading',
    resume: undefined,
  })
  const dispatch = useCallback(
    (action: Actions) => {
      setState((prevState) => reducer(prevState, action))
    },
    [setState],
  )

  const { resume } = state

  const newResume = useCallback(
    (resume: Resume) => {
      setState({
        type: 'unsaved',
        resume,
      })
    },
    [setState],
  )

  const setResume = useCallback<Setter2<Resume>>((getNewResume) => {
    setState((prevState) => {
      // TODO return actions that are consistent with the state
      if (!prevState.resume) {
        console.warn(
          'Cannot setResume() when it has not been initialized. To initialize, use newResume().',
        )
        return {
          type: 'uninitialized',
        }
      }
      return {
        type: 'unsaved',
        resume: getNewResume(prevState.resume),
      }
    })
  }, [])

  useEffect(() => {
    const storedValue = readFromLocalStorage()
    if (typeof storedValue === 'undefined') {
      dispatch({
        type: 'unsetResume',
      })
    } else {
      setResume(() => storedValue as Resume)
    }
  }, [setResume, dispatch])

  const removeResume = useCallback(() => {
    localStorage()
    dispatch({
      type: 'unsetResume',
    })
  }, [dispatch])

  const saveResume = useCallback(
    (throttledResume: Resume | undefined) => {
      saveToLocalStorage(throttledResume)
      dispatch({
        type: 'saveResume',
      })
    },
    [dispatch],
  )

  useThrottle(resume, throttleDelayMs, saveResume)

  return [state, { newResume, setResume, removeResume }]
}

export const useThrottledState = <T>(initialValue: T, delayMs: number): T => {
  const [throttledValue, setThrottledValue] = useState<T>(initialValue)

  const onUpdate = useCallback(
    (newValue: T) => {
      setThrottledValue(newValue)
    },
    [setThrottledValue],
  )

  useThrottle(initialValue, delayMs, onUpdate)

  return throttledValue
}

export const useThrottle = <T>(
  value: T,
  delayMs: number,
  callback: (throttledValue: T) => void,
) => {
  useEffect(() => {
    const handleTimeout = () => {
      callback(value)
    }
    const timeoutHandle = setTimeout(handleTimeout, delayMs)
    return () => {
      clearTimeout(timeoutHandle)
    }
  }, [callback, delayMs, value])
}
