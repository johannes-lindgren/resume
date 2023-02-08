import { Children, FunctionComponent, ReactNode, useState } from 'react'
import { useTrail } from '@react-spring/core'
import { Box, BoxProps, Skeleton, Typography } from '@mui/material'
import { Embossed } from '@/components/dom/ResumeEditor/Embossed'
import { AnimatedProps } from '@react-spring/web/dist/declarations/src/animated'
import { AnimatedBox } from '@/components/dom/ResumeEditor/AnimatedBox'

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

export const MockResume: FunctionComponent<AnimatedProps<BoxProps>> = (
  props,
) => {
  return (
    <AnimatedBox
      sx={{
        width: 300,
        height: 400,
        bgcolor: 'background.paper',
        // border: (theme) => `1px solid ${theme.palette.divider}`,
        boxShadow: 1,
        borderRadius: 2,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        py: 3,
        px: 4,
        gap: 1,
      }}
      {...props}
    >
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
    </AnimatedBox>
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
