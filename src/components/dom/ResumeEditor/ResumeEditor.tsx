import { FunctionComponent, useMemo, useState } from 'react'
import { ResumeContainer } from '@/components/dom/ResumeContainer'
import { ResumeView } from '@/components/pdf/Resume'
import { Resume } from '@/model/resume'
import { useThrottle } from '@/hooks/useThrottle'
import dynamic from 'next/dynamic'
import { Box, Stack, styled } from '@mui/material'
import { johannesResume } from '@/tmp/johannesResume'
import { ResumeForm } from '@/components/dom/ResumeEditor/ResumeForm'
import { DownloadBlobButton } from '@/components/dom/DownloadBlobButton'

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

export const ResumeEditor: FunctionComponent = () => {
  const [resume, setResume] = useState<Resume>(johannesResume)
  const throttledResume = useThrottle(resume, 1500)

  const doc = useMemo(
    () => <ResumeView resume={throttledResume} />,
    [throttledResume],
  )

  return (
    <Split>
      <Stack
        gap={5}
        sx={{
          px: 8,
          py: 8,
        }}
      >
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
