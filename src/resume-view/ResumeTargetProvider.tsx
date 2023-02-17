import { createContext, FunctionComponent, ReactNode, useContext } from 'react'

export type ResumeTarget = 'dom' | 'pdf'

const resumeContext = createContext<ResumeTarget | undefined>(undefined)

export const ResumeTargetProvider: FunctionComponent<{
  children?: ReactNode
  target: ResumeTarget
}> = (props) => {
  return (
    <resumeContext.Provider value={props.target}>
      {props.children}
    </resumeContext.Provider>
  )
}

export const useResumeTarget = (): ResumeTarget | undefined =>
  useContext(resumeContext)
