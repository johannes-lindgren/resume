import { FunctionComponent } from 'react'
import { ResumeContainer } from '@/components/dom/ResumeContainer'
import { Resume } from '@/model/resume'
import { Box, Stack, styled } from '@mui/material'
import { ResumeForm } from '@/components/dom/ResumeEditor/ResumeForm'
import { ResumePreview } from '@/components/dom/ResumeEditor/ResumePreview'
import { AllResumeActions } from '@/hooks/useThrottledState'
import { ResumeAppFooter } from '@/components/dom/ResumeEditor/ResumeApp'

const Split = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column-reverse',
  '& > *': {
    minHeight: '100vh',
  },
  '& > *:nth-child(1)': {},
  '& > :nth-child(2)': {},
  [theme.breakpoints.up('md')]: {
    '& > *': {
      width: '50%',
    },
    '& > *:nth-child(1)': {},
    '& > :nth-child(2)': {
      position: 'fixed',
      top: 0,
      right: 0,
      width: '50%',
      height: '100vh',
    },
  },
  // [theme.breakpoints.down('md')]:{
  //
  // },
}))

export const ResumeEditor: FunctionComponent<
  {
    resume: Resume
    saved: boolean
  } & Pick<AllResumeActions, 'setResume' | 'removeResume' | 'newResume'>
> = (props) => {
  const { resume, setResume, removeResume } = props

  return (
    <Split>
      <Stack
        sx={{
          px: 8,
          py: 8,
          justifyContent: 'space-between',
        }}
        gap={8}
      >
        <ResumeForm
          resume={resume}
          setResume={setResume}
        />
        <ResumeAppFooter />
      </Stack>
      <ResumeContainer>
        <ResumePreview
          resume={resume}
          isSaved={props.saved}
          removeResume={removeResume}
          newResume={props.newResume}
        />
      </ResumeContainer>
    </Split>
  )
}
