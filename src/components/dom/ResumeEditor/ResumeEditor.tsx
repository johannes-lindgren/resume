import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react'
import { ResumeContainer } from '@/components/dom/A4'
// import {PdfDocument} from "@/components/dom/PdfDocument";
import { ResumeView } from '@/components/pdf/Resume'
import { Resume } from '@/model/resume'
import { Font } from '@react-pdf/renderer'
import { theme } from '@/design/Theme'
import { useThrottle } from '@/hooks/useThrottle'
import dynamic from 'next/dynamic'
import { Box, Stack, styled, TextField, Typography } from '@mui/material'
import { johannesResume } from '@/tmp/johannesResume'

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
      <ResumeInput
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

const Input = <T,>(props: {
  label: string
  value: T
  propName: keyof T
  setValue: (getter: (oldValue: T) => T) => void
}): JSX.Element => {
  return (
    <TextField
      placeholder={props.label}
      value={props.value[props.propName]}
      onChange={({ target }) =>
        props.setValue((oldValue) => ({
          ...oldValue,
          name: target.value,
        }))
      }
    />
  )
}

const ResumeInput: FunctionComponent<{
  resume: Resume
  setResume: Dispatch<SetStateAction<Resume>>
}> = (props) => (
  <Stack
    gap={2}
    padding={4}
  >
    <Typography variant="h2">Personal Details</Typography>
    <Input
      label="Name"
      propName={'name'}
      value={props.resume}
      setValue={props.setResume}
    />
    <Input
      label="Email Address"
      propName={'emailAddress'}
      value={props.resume}
      setValue={props.setResume}
    />
    <Typography>Dummy</Typography>
    <Typography>Dummy</Typography>
    <Typography>Dummy</Typography>
    <Typography>Dummy</Typography>
    <Typography>Dummy</Typography>
    <Typography>Dummy</Typography>
    <Typography>Dummy</Typography>
    <Typography>Dummy</Typography>
    <Typography>Dummy</Typography>
    <Typography>Dummy</Typography>
    <Typography>Dummy</Typography>
    <Typography>Dummy</Typography>
    <Typography>Dummy</Typography>
    <Typography>Dummy</Typography>
    <Typography>Dummy</Typography>
    <Typography>Dummy</Typography>
    <Typography>Dummy</Typography>
    <Typography>Dummy</Typography>
    <Typography>Dummy</Typography>
    <Typography>Dummy</Typography>
    <Typography>Dummy</Typography>
    <Typography>Dummy</Typography>
    <Typography>Dummy</Typography>
  </Stack>
)
