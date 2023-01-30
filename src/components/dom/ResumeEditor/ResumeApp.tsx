import { useResumeApp } from '@/hooks/useThrottledState'
import {
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from '@mui/material'
import { NoteAddRounded } from '@mui/icons-material'
import { newResume } from '@/model/defaults'
import { UploadResumeButton } from '@/components/dom/UploadResumeButton'
import { ResumeEditor } from '@/components/dom/ResumeEditor/ResumeEditor'

export const ResumeApp = () => {
  const [state, actions] = useResumeApp(1500)

  switch (state.type) {
    case 'loading':
      return <CircularProgress />
    case 'uninitialized':
      return (
        <Container
          maxWidth="xs"
          sx={{ py: 5 }}
        >
          <Stack gap={4}>
            <Typography
              variant="h1"
              textAlign="center"
            >
              Uninitialized
            </Typography>
            <Button
              size="large"
              variant="contained"
              startIcon={<NoteAddRounded />}
              onClick={() => actions.setResume(newResume())}
            >
              Create a new résumé
            </Button>
            <UploadResumeButton
              size="large"
              color="inherit"
              variant="outlined"
              onChange={actions.setResume}
            />
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
