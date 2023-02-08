import { alpha, Box, styled } from '@mui/material'
import { tangerine700 } from '@/fonts/tangerine'

export const Embossed = styled(Box)(({ theme }) => ({
  textShadow: `${alpha(theme.palette.background.paper, 0.5)} 2px 0px 0px`,
  backgroundClip: 'text',
  backgroundColor: theme.palette.secondary.main,
  color: 'transparent',
  ...tangerine700.style,
}))
