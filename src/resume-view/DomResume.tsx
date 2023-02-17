import { FunctionComponent } from 'react'
import { ResumeTargetProvider } from '@/resume-view/ResumeTargetProvider'
import { Box, BoxProps, styled } from '@mui/material'

const Root = styled(Box)(({ theme }) => ({
  flex: 1,
  whiteSpace: 'break-spaces',
  overflowY: 'hidden',
  overflowX: 'hidden',
  backgroundColor: theme.palette.background.paper,
  '& *': {
    display: 'flex',
    flexDirection: 'column',
  },
}))

export const DomResume: FunctionComponent<BoxProps> = (props) => {
  const { children, ...paperProps } = props
  return (
    <Root {...paperProps}>
      <ResumeTargetProvider target="dom">{children}</ResumeTargetProvider>
    </Root>
  )
}
