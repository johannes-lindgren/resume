import { FunctionComponent } from 'react'
import { Button, Link, Stack, Typography } from '@mui/material'
import { GitHub } from '@mui/icons-material'

export const ResumeAppFooter: FunctionComponent = () => (
  <Stack gap={2}>
    <Typography textAlign="center">
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
      startIcon={<GitHub />}
      color="secondary"
    >
      GitHub{' '}
    </Button>
  </Stack>
)
