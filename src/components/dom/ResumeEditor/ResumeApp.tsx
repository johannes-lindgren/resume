import { useResumeApp } from '@/hooks/useThrottledState'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import { NoteAddRounded } from '@mui/icons-material'
import { blankResume, resumeTemplate } from '@/model/defaults'
import { UploadResumeButton } from '@/components/dom/UploadResumeButton'
import { ResumeEditor } from '@/components/dom/ResumeEditor/ResumeEditor'
import { FunctionComponent, useState } from 'react'
import { getRandomElement } from '@/utils/getRandomElement'

const gloriousWords = [
  'Glorious',
  'Splendid',
  'Magnificent',
  'Brilliant',
  'Beautiful',
  'Illustrious',
]
const createWords = [
  'Create',
  'Make',
  'Produce',
  'Build',
  'Bring Forth',
  'Construct',
  'Craft',
]

export const ResumeApp = () => {
  const [state, actions] = useResumeApp(1500)
  const [createWord] = useState(() => getRandomElement(createWords))
  const [gloriousWord] = useState(() => getRandomElement(gloriousWords))

  switch (state.type) {
    case 'loading':
      return <></>
    case 'uninitialized':
      return (
        <Container maxWidth="xs">
          <Stack
            gap={6}
            justifyContent="space-between"
            sx={{
              minHeight: '100vh',
              pt: 10,
              pb: 5,
              maxWidth: 'xs',
              typography: 'h1',
            }}
          >
            <Stack gap={4}>
              <Stack
                component="h1"
                textAlign="center"
                sx={{ color: 'secondary.main', typography: 'h1' }}
                gap={2}
              >
                <Box component="span">{createWord} Your</Box>
                <Box
                  component="span"
                  fontSize="3rem"
                >
                  {gloriousWord} Résumé
                </Box>
              </Stack>
              <Tooltip title="Pssst! Try the template instead">
                <Button
                  size="large"
                  variant="outlined"
                  color="secondary"
                  startIcon={<NoteAddRounded />}
                  onClick={() => actions.newResume(blankResume())}
                >
                  Start from scratch
                </Button>
              </Tooltip>
              <Button
                size="large"
                variant="contained"
                startIcon={<NoteAddRounded />}
                onClick={() => actions.newResume(resumeTemplate())}
              >
                Use the template
              </Button>
              <UploadResumeButton
                size="large"
                variant="contained"
                color="secondary"
                onChange={actions.setResume}
              />
            </Stack>
            <Footer />
          </Stack>
        </Container>
      )
    default:
      return (
        <ResumeEditor
          resume={state.resume}
          setResume={actions.setResume}
          removeResume={actions.removeResume}
          saved={state.type === 'saved'}
        />
      )
  }
}

export const Footer: FunctionComponent = () => (
  <Stack>
    <Typography textAlign="center">
      Created by{' '}
      <Box
        component="span"
        sx={{ color: 'secondary.main' }}
      >
        Johannes Lindgren
      </Box>
    </Typography>
  </Stack>
)
