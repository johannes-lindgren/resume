import { FunctionComponent } from 'react'
import { Box, CircularProgress, styled, Typography } from '@mui/material'
import { CheckCircleOutlineRounded } from '@mui/icons-material'

const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'center',
  gap: theme.spacing(1),
  transition: theme.transitions.create('color'),
}))

export const SaveStatusBox: FunctionComponent<{
  isSaved: boolean
}> = (props) => (
  <Root sx={{ color: props.isSaved ? 'success.main' : 'inherit' }}>
    {props.isSaved ? (
      <CheckCircleOutlineRounded fontSize="inherit" />
    ) : (
      <CircularProgress
        size="1em"
        color="inherit"
      />
    )}
    <Typography variant="caption">Saved</Typography>
  </Root>
)
