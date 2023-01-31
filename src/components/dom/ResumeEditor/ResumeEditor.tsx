import { FunctionComponent, useMemo } from 'react'
import { ResumeContainer } from '@/components/dom/ResumeContainer'
import { ResumeView } from '@/components/pdf/Resume'
import { Resume } from '@/model/resume'
import { useThrottledState } from '@/hooks/useThrottledState'
import dynamic from 'next/dynamic'
import {
  Box,
  Button,
  CircularProgress,
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
} from '@mui/icons-material'
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

const PdfRoot = styled(PdfDocument)(({ theme }) => ({
  aspectRatio: '0.707107 / 1',
  border: 'none',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius * 2,
}))

export const ResumePreview: FunctionComponent<{
  resume: Resume
  setResume: Setter<Resume>
}> = (props) => {
  const { resume } = props
  const throttledResume = useThrottledState(resume, 1500)

  const doc = useMemo(
    () => <ResumeView resume={throttledResume} />,
    [throttledResume],
  )

  return (
    <>
      <PdfRoot showToolbar={false}>{doc}</PdfRoot>
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
