import { Stack, styled } from '@mui/material'
import { FunctionComponent, ReactNode } from 'react'
import { Box } from '@mui/system'

export const Root = styled(Stack)(({ theme }) => ({
  position: 'relative',
  '&:not(:hover) > .Hoverable-child': {
    opacity: 0,
  },
  '&:hover > .Hoverable-child': {
    opacity: 1,
  },
  '& > .Hoverable-child': {
    transition: theme.transitions.create('opacity'),
  },
}))
const HoverContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: '0',
  top: '0',
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
}))

export const Hoverable: FunctionComponent<{
  children?: ReactNode
  left?: ReactNode
  right?: ReactNode
}> = (props) => (
  <Root>
    <HoverContainer
      className="Hoverable-left Hoverable-child"
      sx={{
        left: '0',
        transform: 'translate(-100%, 0%)',
      }}
    >
      {props.left}
    </HoverContainer>
    <HoverContainer
      className="Hoverable-right Hoverable-child"
      sx={{
        right: '0',
        transform: 'translate(100%, 0%)',
      }}
    >
      {props.right}
    </HoverContainer>
    {props.children}
  </Root>
)
