import { FunctionComponent } from 'react'
import { ResumeContainer } from '@/components/dom/ResumeContainer'
import { Resume } from '@/model/resume'
import { Box, Stack, styled } from '@mui/material'
import { ResumeForm } from '@/components/dom/ResumeEditor/ResumeForm'
import { ResumePreview } from '@/components/dom/ResumeEditor/ResumePreview'
import { AllResumeActions } from '@/hooks/useThrottledState'
import { ResumeAppFooter } from '@/components/dom/ResumeEditor/ResumeAppFooter'
import { PdfResume } from '@/resume-view/PdfResume'
import { DefaultTemplate } from '@/resume-view/templates/default/DefaultTemplate'
import { DomResume } from '@/resume-view/DomResume'

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
    '& > *:nth-child(1)': {
      // TODO remove all in this selection
      position: 'fixed',
      top: 0,
      left: 0,
      width: '50%',
      height: '100vh',
    },
    '& > :nth-child(2)': {
      position: 'fixed',
      top: 0,
      right: 0,
      width: '50%',
      height: '100vh',
    },
  },
}))

const FormContainer = styled(Stack)(({ theme }) => ({
  paddingLeft: theme.spacing(8),
  paddingRight: theme.spacing(8),
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(5),
  justifyContent: 'space-between',
  gap: theme.spacing(8),
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
      <FormContainer>
        <ResumeForm
          resume={resume}
          setResume={setResume}
        />
        <ResumeAppFooter />
      </FormContainer>
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
