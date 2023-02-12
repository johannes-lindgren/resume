import { createContext, FunctionComponent, ReactNode, useContext } from 'react'

type ResumeTarget = 'dom' | 'pdf' | undefined

const resumeContext = createContext<ResumeTarget>(undefined)

export const ResumeTargetProvider: FunctionComponent<{
  children?: ReactNode
  target: 'dom' | 'pdf'
}> = (props) => {
  return (
    <resumeContext.Provider value={props.target}>
      {props.children}
    </resumeContext.Provider>
  )
}

export const useResumeTarget = (): ResumeTarget => useContext(resumeContext)
