import { FunctionComponent, useMemo, useState } from 'react'
import { ResumeContainer } from '@/components/dom/ResumeContainer'
// import {PdfDocument} from "@/components/dom/PdfDocument";
import { ResumeView } from '@/components/pdf/Resume'
import { Resume } from '@/model/resume'
import { Font } from '@react-pdf/renderer'
import { useThrottle } from '@/hooks/useThrottle'
import dynamic from 'next/dynamic'
import { Box, Button, Stack, styled } from '@mui/material'
import { johannesResume } from '@/tmp/johannesResume'
import { ResumeForm } from '@/components/dom/ResumeEditor/ResumeForm'
import { DownloadRounded, SaveRounded } from '@mui/icons-material'

// Register font
Font.register({
  family: 'Roboto',
  src: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap',
})

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
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
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
          px: 4,
          py: 8,
        }}
      >
        <Box
          display="flex"
          flexDirection="row-reverse"
        ></Box>
        <ResumeForm
          resume={resume}
          setResume={setResume}
        />
      </Stack>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <ResumeContainer>
          <Box></Box>
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
            flexDirection="row-reverse"
          >
            <DownloadResumeButton document={doc} />
          </Box>
        </ResumeContainer>
      </Box>
    </Split>
  )
}
