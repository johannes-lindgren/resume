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
import { useState } from 'react'
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
      return <CircularProgress />
    case 'uninitialized':
      return (
        <Container
          maxWidth="xs"
          sx={{ py: 5 }}
        >
          <Stack gap={6}>
            <Typography
              variant="h1"
              textAlign="center"
              sx={{ color: 'secondary.main' }}
            >
              {createWord} Your {gloriousWord} Résumé
            </Typography>
            <Stack
              gap={4}
              maxWidth="xs"
            >
              <Tooltip title="Pssst! Try the template instead">
                <Button
                  size="large"
                  variant="outlined"
                  color="secondary"
                  startIcon={<NoteAddRounded />}
                  onClick={() => actions.setResume(blankResume())}
                >
                  Start from scratch
                </Button>
              </Tooltip>
              <Button
                size="large"
                variant="contained"
                startIcon={<NoteAddRounded />}
                onClick={() => actions.setResume(resumeTemplate())}
              >
                Create from template
              </Button>
              <UploadResumeButton
                size="large"
                variant="contained"
                color="secondary"
                onChange={actions.setResume}
              />
            </Stack>
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