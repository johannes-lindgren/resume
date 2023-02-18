import { Box } from '@mui/system'
import { styled } from '@mui/material'

export const PreviewContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.shadows[6],
  overflow: 'hidden',
  color: theme.palette.primary.contrastText,
  background: theme.palette.grey.A700,
}))
