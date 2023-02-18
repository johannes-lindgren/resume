import {
  FunctionComponent,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { Box } from '@mui/material'

const aspectRatio = 1.4142135624
const aspectRatioInv = 0.7071067812
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
    height: aspectRatio * 400,
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
        height: clientWidth * aspectRatio,
      }
      const v2: Dimension = {
        width: clientHeight * aspectRatioInv,
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
