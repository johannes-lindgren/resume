import { Box, styled } from '@mui/material'

export const PreviewToolbar = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  gap: theme.spacing(1),
}))
