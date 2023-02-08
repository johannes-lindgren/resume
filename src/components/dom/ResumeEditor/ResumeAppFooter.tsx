import { FunctionComponent } from 'react'
import { Button, Link, Stack, Typography } from '@mui/material'
import { GitHub } from '@mui/icons-material'
import { tangerine400 } from '@/fonts/tangerine'

export const ResumeAppFooter: FunctionComponent = () => (
  <Stack gap={2}>
    <Typography
      textAlign="center"
      sx={{ ...tangerine400.style, fontSize: '1.5rem' }}
    >
      Created by{' '}
      <Link
        href="https://github.com/johannes-lindgren"
        target="_blank"
      >
        Johannes Lindgren
      </Link>
    </Typography>
    <Button
      href="https://github.com/johannes-lindgren"
      target="_blank"
      startIcon={<GitHub fontSize="inherit" />}
      color="secondary"
      sx={{ ...tangerine400.style, fontSize: '1.5rem', alignSelf: 'center' }}
    >
      GitHub{' '}
    </Button>
  </Stack>
)
