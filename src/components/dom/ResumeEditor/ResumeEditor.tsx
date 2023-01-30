import { FunctionComponent, useMemo, useState } from 'react'
import { ResumeContainer } from '@/components/dom/ResumeContainer'
import { ResumeView } from '@/components/pdf/Resume'
import { Resume } from '@/model/resume'
import { useResumeApp, useThrottledState } from '@/hooks/useThrottledState'
import dynamic from 'next/dynamic'
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Stack,
  styled,
  Typography,
} from '@mui/material'
import { johannesResume } from '@/tmp/johannesResume'
import { ResumeForm } from '@/components/dom/ResumeEditor/ResumeForm'
import { DownloadBlobButton } from '@/components/dom/DownloadBlobButton'
import { Setter } from '@/utils/Setter'
import {
  CheckCircle,
  CheckCircleOutline,
  CheckCircleOutlined,
  CheckCircleOutlineRounded,
  DeleteOutlineRounded,
  NoteAddRounded,
  SaveOutlined,
} from '@mui/icons-material'
import { newResume } from '@/model/defaults'

const DownloadResumeButton = dynamic(
  () =>
    import('../DownloadPdfButton').then((module) => module.DownloadPdfButton),
  {
    ssr: false,
  },
)
const PdfDocument = dynamic(
  () =>
    import('../PdfDocument/PdfDocument').then((module) => module.PdfDocument),
  {
    ssr: false,
  },
)

const Split = styled(Box)(({ theme }) => ({
  display: 'flex',
  '& > *': {
    width: '50%',
  },
}))

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
              variant="contained"
              startIcon={<NoteAddRounded />}
              onClick={() => actions.setResume(newResume())}
            >
              Create a new résumé
            </Button>
          </Stack>
        </Container>
      )
    default:
      return (
        <ResumeEditor
          resume={state.resume}
          setResume={actions.setResume}
          removeResume={actions.removeResume}
        />
      )
  }
}

export const ResumeEditor: FunctionComponent<{
  resume: Resume
  setResume: Setter<Resume>
  removeResume: () => void
}> = (props) => {
  const { resume, setResume, removeResume } = props

  const throttledResume = useThrottledState(resume, 1500)

  const doc = useMemo(
    () => <ResumeView resume={throttledResume} />,
    [throttledResume],
  )

  return (
    <Split>
      <Stack
        sx={{
          px: 8,
          py: 8,
        }}
        gap={5}
      >
        <Box
          display="flex"
          justifyContent="end"
          gap={2}
        >
          <Box
            display="flex"
            flexWrap="nowrap"
            alignItems="center"
            gap={1}
            sx={{ color: 'success.main' }}
          >
            <CheckCircleOutlineRounded />
            <Typography variant="caption">Saved</Typography>
          </Box>
          <Button
            startIcon={<SaveOutlined />}
            color="success"
            variant="outlined"
          >
            Save to file system
          </Button>
          <Button
            startIcon={<DeleteOutlineRounded />}
            color="secondary"
            onClick={removeResume}
          >
            Start over
          </Button>
        </Box>
        <ResumeForm
          resume={resume}
          setResume={setResume}
        />
      </Stack>
      <ResumeContainer>
        <Box
          sx={{
            borderRadius: 2,
            height: 'auto',
            flex: 1,
            overflow: 'hidden',
          }}
        >
          <PdfDocument
            showToolbar={false}
            width="100%"
          >
            {doc}
          </PdfDocument>
        </Box>
        <Box
          display="flex"
          justifyContent="right"
          gap={1}
        >
          <DownloadBlobButton
            obj={resume}
            suggestedName={`${resume.name}'s résumé.json`}
          />
          <DownloadResumeButton document={doc} />
        </Box>
      </ResumeContainer>
    </Split>
  )
}
