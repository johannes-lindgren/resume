import { Children, FunctionComponent, ReactNode } from 'react'
import { useTrail } from '@react-spring/core'
import {
  Box,
  BoxProps,
  Skeleton,
  styled,
  StyledComponentProps,
  Typography,
} from '@mui/material'
import { Embossed } from '@/components/dom/Embossed'
import { AnimatedProps } from '@react-spring/web/dist/declarations/src/animated'
import { AnimatedBox } from '@/components/dom/AnimatedBox'
import { animated } from '@react-spring/web'

const Trail: FunctionComponent<{ children?: ReactNode }> = ({ children }) => {
  const items = Children.toArray(children)
  const trail = useTrail(items.length, {
    config: {
      mass: 5,
      tension: 500,
      friction: 200,
    },
    delay: 3000,
    opacity: 1,
    from: { opacity: 0, x: 20 },
    to: { opacity: 1, x: 0 },
    loop: true,
  })
  return (
    <>
      {trail.map((_, index) => (
        <AnimatedBox
          key={index}
          style={{
            ...trail[index],
          }}
        >
          {items[index]}
        </AnimatedBox>
      ))}
    </>
  )
}

const Root = animated(
  styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    gap: theme.spacing(1),
  })),
)

export const MockResume: FunctionComponent<AnimatedProps<BoxProps>> = (
  props,
) => {
  return (
    <Root {...props}>
      <Trail>
        <MockHeader />
        <Typography variant="caption">
          <Skeleton />
        </Typography>
        <Typography variant="caption">
          <Skeleton />
        </Typography>
        <Typography variant="caption">
          <Skeleton animation={false} />
        </Typography>
        <Typography variant="caption">
          <Skeleton />
        </Typography>
        <Typography variant="caption">
          <Skeleton />
        </Typography>
        <Typography variant="caption">
          <Skeleton />
        </Typography>
        <Typography variant="caption">
          <Skeleton />
        </Typography>
        <Typography variant="caption">
          <Skeleton />
        </Typography>
      </Trail>
    </Root>
  )
}
const MockHeader: FunctionComponent = () => (
  <Box
    sx={{
      display: 'flex',
      gap: 2,
      alignItems: 'center',
      mb: 2,
    }}
  >
    <Skeleton
      variant="rectangular"
      width={50}
      height={50}
      sx={{
        borderRadius: 1,
      }}
    />
    <Embossed>Your name</Embossed>
  </Box>
)
