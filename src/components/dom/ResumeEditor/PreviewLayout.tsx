import { FunctionComponent, ReactNode } from 'react'
import { Box, Container } from '@mui/material'

export const PreviewLayout: FunctionComponent<{
  children?: ReactNode
}> = (props) => {
  return (
    <Container
      maxWidth="md"
      disableGutters
      sx={{
        overflowY: 'hidden',
        borderRadius: 1,
        display: 'flex',
      }}
    >
      {props.children}
    </Container>
  )
}
