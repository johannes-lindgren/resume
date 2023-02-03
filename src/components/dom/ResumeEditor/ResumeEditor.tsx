import { FunctionComponent } from 'react'
import { ResumeContainer } from '@/components/dom/ResumeContainer'
import { Resume } from '@/model/resume'
import { Box, Stack, styled } from '@mui/material'
import { ResumeForm } from '@/components/dom/ResumeEditor/ResumeForm'
import { ResumePreview } from '@/components/dom/ResumeEditor/ResumePreview'
import { AllResumeActions } from '@/hooks/useThrottledState'

const Split = styled(Box)(({ theme }) => ({
  display: 'flex',
  '& > *': {
    width: '50%',
  },
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
        }}
        gap={5}
      >
        <ResumeForm
          resume={resume}
          setResume={setResume}
        />
      </Stack>
      <ResumeContainer>
        <ResumePreview
          resume={resume}
          setResume={setResume}
          isSaved={props.saved}
          removeResume={removeResume}
          newResume={props.newResume}
        />
      </ResumeContainer>
    </Split>
  )
}
