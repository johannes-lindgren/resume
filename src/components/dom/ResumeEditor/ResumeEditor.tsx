import { FunctionComponent, useState } from 'react'
import { ResumeContainer } from '@/components/dom/A4'
// import {PdfDocument} from "@/components/dom/PdfDocument";
import { ResumeView } from '@/components/pdf/Resume'
import { Resume } from '@/model/resume'
import { Font } from '@react-pdf/renderer'
import { useThrottle } from '@/hooks/useThrottle'
import dynamic from 'next/dynamic'
import { Box, styled } from '@mui/material'
import { johannesResume } from '@/tmp/johannesResume'
import { ResumeForm } from '@/components/dom/ResumeEditor/ResumeForm'

// Register font
Font.register({
  family: 'Roboto',
  src: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap',
})

const DownloadResumeButton = dynamic(
  () =>
    import('../DownloadResumeButton').then(
      (module) => module.DownloadResumeButton,
    ),
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
  const throttledResume = useThrottle(resume, 500)

  return (
    <Split>
      <ResumeForm
        resume={resume}
        setResume={setResume}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <ResumeContainer>
          <DownloadResumeButton resume={resume} />
          <PdfDocument
            showToolbar={false}
            width="100%"
          >
            <ResumeView resume={throttledResume} />
          </PdfDocument>
        </ResumeContainer>
      </Box>
    </Split>
  )
}
