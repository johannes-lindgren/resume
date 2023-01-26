import { FunctionComponent, PropsWithChildren } from 'react'
import { Box } from '@mui/system'
import { styled } from '@mui/material'

const Root = styled(Box)(({ theme }) => ({
  background: theme.palette.grey.A400,
  padding: theme.spacing(5),
  boxShadow: theme.shadows[6],
  overflow: 'hidden',
  position: 'fixed',
  top: 0,
  right: 0,
  width: '50%',
  height: '100vh',
  color: theme.palette.primary.contrastText,
  display: 'flex',
  flexDirection: 'column',
}))

export const ResumeContainer: FunctionComponent<PropsWithChildren> = (
  props,
) => <Root>{props.children}</Root>
