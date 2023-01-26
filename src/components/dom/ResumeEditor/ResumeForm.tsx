import { Dispatch, FunctionComponent, SetStateAction } from 'react'
import { Resume } from '@/model/resume'
import { Stack, Typography } from '@mui/material'
import { PropTextEditor } from '@/components/dom/ResumeEditor/PropTextEditor'

export const ResumeForm: FunctionComponent<{
  resume: Resume
  setResume: Dispatch<SetStateAction<Resume>>
}> = (props) => (
  <Stack
    gap={2}
    padding={4}
  >
    <Typography variant="h2">Personal Details</Typography>
    <PropTextEditor
      label="Name"
      propName={'name'}
      value={props.resume}
      setValue={props.setResume}
    />
    <PropTextEditor
      label="Job Title"
      propName={'jobTitle'}
      value={props.resume}
      setValue={props.setResume}
    />
    <PropTextEditor
      label="Country"
      propName={'location'}
      value={props.resume}
      setValue={props.setResume}
    />
    <PropTextEditor
      label="Nationality"
      propName={'nationality'}
      value={props.resume}
      setValue={props.setResume}
    />
    <PropTextEditor
      label="Email Address"
      propName={'emailAddress'}
      value={props.resume}
      setValue={props.setResume}
    />
    <PropTextEditor
      label="Phone Number"
      propName={'phoneNumber'}
      value={props.resume}
      setValue={props.setResume}
    />
  </Stack>
)
