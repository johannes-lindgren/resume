import { Box } from '@mui/system'
import { styled } from '@mui/material'

export const ResumeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(2),
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(5),
  },
  boxShadow: theme.shadows[6],
  overflow: 'hidden',
  color: theme.palette.primary.contrastText,
  background: theme.palette.grey.A700,
}))
