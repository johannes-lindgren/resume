import { FunctionComponent, ReactNode } from 'react'
import { ResumeTargetProvider } from '@/resume-view/ResumeTargetProvider'
import { Paper } from '@mui/material'

export const DomResume: FunctionComponent<{
  children?: ReactNode
}> = (props) => {
  return (
    <Paper>
      <ResumeTargetProvider target="dom">{props.children}</ResumeTargetProvider>
    </Paper>
  )
}
