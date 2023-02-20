import { Box } from '@mui/system'
import { Container, styled } from '@mui/material'
import { FunctionComponent, ReactNode } from 'react'

export const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.shadows[6],
  overflow: 'hidden',
  color: theme.palette.primary.contrastText,
  background: theme.palette.grey.A700,
  padding: theme.spacing(2),
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(4),
  },
}))

export const StyledContainer = styled(Container)(({ theme }) => ({
  overflowY: 'hidden',
  overflowX: 'hidden',
  display: 'flex',
  borderRadius: theme.shape.borderRadius,
  height: '100%',
}))

export const PreviewContainer: FunctionComponent<{
  children?: ReactNode
  className?: string
}> = (props) => {
  const { children, ...boxProps } = props
  return (
    <Root {...boxProps}>
      <StyledContainer
        maxWidth="md"
        disableGutters
      >
        {children}
      </StyledContainer>
    </Root>
  )
}
