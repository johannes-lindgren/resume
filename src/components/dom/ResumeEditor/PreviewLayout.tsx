import { FunctionComponent, ReactNode } from 'react'
import { Box } from '@mui/material'

export const PreviewLayout: FunctionComponent<{
  children?: ReactNode
  header?: ReactNode
  footer?: ReactNode
}> = (props) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        gap: 2,
        flex: 1,
      }}
    >
      <Box width="100%">{props.header}</Box>
      {props.children}
      <Box width="100%">{props.footer}</Box>
    </Box>
  )
}
