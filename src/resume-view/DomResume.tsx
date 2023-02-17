import { FunctionComponent } from 'react'
import { ResumeTargetProvider } from '@/resume-view/ResumeTargetProvider'
import { Paper, PaperProps, styled } from '@mui/material'

const Root = styled(Paper)(({ theme }) => ({
  flex: 1,
  whiteSpace: 'break-spaces',
  overflowY: 'scroll',
  overflowX: 'hidden',
  '& *': {
    display: 'flex',
    flexDirection: 'column',
  },
}))

export const DomResume: FunctionComponent<PaperProps> = (props) => {
  const { children, ...paperProps } = props
  return (
    <Root {...paperProps}>
      <ResumeTargetProvider target="dom">{children}</ResumeTargetProvider>
    </Root>
  )
}
