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
import { ResumeForm } from '@/components/dom/ResumeEditor/ResumeForm'
import { DownloadResumeButton } from '@/components/dom/DownloadResumeButton'
import { Setter } from '@/utils/Setter'
import {
  CheckCircleOutlineRounded,
  DeleteOutlineRounded,
  NoteAddRounded,
} from '@mui/icons-material'
import { newResume } from '@/model/defaults'
import { UploadResumeButton } from '@/components/dom/UploadResumeButton'

const DownloadPdfButton = dynamic(
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
            <UploadResumeButton
              color="inherit"
              variant="outlined"
              onChange={actions.setResume}
            />
          </Stack>
        </Container>
      )
    default:
      console.log('reusme', state.resume)
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

export const ResumeEditor: FunctionComponent<{
  resume: Resume
  setResume: Setter<Resume>
  removeResume: () => void
  saved: boolean
}> = (props) => {
  const { resume, setResume, removeResume } = props

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
          flexWrap="wrap"
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
            {props.saved ? (
              <CheckCircleOutlineRounded fontSize="inherit" />
            ) : (
              <CircularProgress size="1em" />
            )}
            <Typography variant="caption">Saved</Typography>
          </Box>
          <Button
            startIcon={<DeleteOutlineRounded />}
            color="secondary"
            onClick={removeResume}
            size="small"
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
        <ResumePreview
          resume={resume}
          setResume={setResume}
        />
      </ResumeContainer>
    </Split>
  )
}

export const ResumePreview: FunctionComponent<{
  resume: Resume
  setResume: Setter<Resume>
}> = (props) => {
  const { resume, setResume } = props
  const throttledResume = useThrottledState(resume, 1500)

  const doc = useMemo(
    () => <ResumeView resume={throttledResume} />,
    [throttledResume],
  )

  return (
    <>
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
        <UploadResumeButton
          color="inherit"
          variant="outlined"
          onChange={props.setResume}
        />
        <DownloadResumeButton
          color="inherit"
          variant="outlined"
          resume={resume}
          suggestedName={`${resume.name}'s resumé`}
        />
        <DownloadPdfButton document={doc} />
      </Box>
    </>
  )
}
