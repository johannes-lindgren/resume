import {
  FunctionComponent,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { Box } from '@mui/material'

export const a4AspectRatio = 1.4142135624
export const a4AspectRatioInv = 0.7071067812

export const A4AspectRatio: FunctionComponent<{
  children?: ReactNode
}> = (props) => {
  type Dimension = {
    width: number
    height: number
  }
  const ref = useRef<HTMLDivElement>(null)
  const [dim, setDim] = useState<Dimension>({
    width: 400,
    height: a4AspectRatio * 400,
  })
  useLayoutEffect(() => {
    if (!ref.current) {
      return
    }
    const element = ref.current
    const handleResize = () => {
      const { clientWidth, clientHeight } = element
      const v1: Dimension = {
        width: clientWidth,
        height: clientWidth * a4AspectRatio,
      }
      const v2: Dimension = {
        width: clientHeight * a4AspectRatioInv,
        height: clientHeight,
      }
      setDim(v1.height > clientHeight ? v2 : v1)
    }
    window.addEventListener('resize', handleResize)
    handleResize() // Trigger initially
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [setDim])
  return (
    <Box
      ref={ref}
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}
    >
      <Box
        sx={{
          overflow: 'hidden',
          borderRadius: 1,
        }}
      >
        <Box
          sx={{
            width: dim.width,
            height: dim.height,
            maxWidth: dim.width,
            maxHeight: dim.height,
            overflowY: 'auto',
          }}
        >
          {props.children}
        </Box>
      </Box>
    </Box>
  )
}
