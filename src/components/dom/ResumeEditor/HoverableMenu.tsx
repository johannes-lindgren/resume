import { BoxProps, Stack, styled } from '@mui/material'
import { FunctionComponent, ReactNode } from 'react'
import { Box } from '@mui/system'

export const Root = styled(Stack)(({ theme }) => ({
  position: 'relative',
  '&:not(:hover) > .Hoverable-menu': {
    opacity: 0,
  },
  '&:hover > .Hoverable-menu': {
    opacity: 1,
  },
  '& > .Hoverable-menu': {
    transition: theme.transitions.create('opacity'),
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: theme.zIndex.fab,
    padding: theme.spacing(1),
    transform: 'translate(0%, -50%)',
  },
}))

export const HoverableMenu: FunctionComponent<
  {
    children?: ReactNode
    menu?: ReactNode
  } & BoxProps
> = (props) => {
  const { menu, children, ...otherProps } = props
  return (
    <Root {...otherProps}>
      <Box className="Hoverable-menu">{menu}</Box>
      {children}
    </Root>
  )
}
