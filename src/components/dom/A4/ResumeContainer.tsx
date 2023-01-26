import { FunctionComponent, PropsWithChildren } from 'react'
import styles from './styles.module.scss'
import { Box } from '@mui/system'
import { styled } from '@mui/material'

const Root = styled(Box)(({ theme }) => ({
  background: theme.palette.grey.A100,
  padding: theme.spacing(5),
  boxShadow: theme.shadows[6],
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  position: 'fixed',
  top: 0,
  right: 0,
  width: '50%',
}))

export const ResumeContainer: FunctionComponent<PropsWithChildren> = (
  props,
) => <Root>{props.children}</Root>
