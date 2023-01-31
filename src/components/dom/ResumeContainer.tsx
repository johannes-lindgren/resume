import { FunctionComponent, PropsWithChildren } from 'react'
import { Box } from '@mui/system'
import { styled } from '@mui/material'

const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  background: theme.palette.grey.A700,
  padding: theme.spacing(5),
  boxShadow: theme.shadows[6],
  overflow: 'hidden',
  position: 'fixed',
  top: 0,
  right: 0,
  width: '50%',
  height: '100vh',
  color: theme.palette.primary.contrastText,
  gap: theme.spacing(2),
}))

export const ResumeContainer: FunctionComponent<PropsWithChildren> = (
  props,
) => <Root>{props.children}</Root>
