import { FunctionComponent } from 'react'
import { Resume } from '@/model/resume'
import { Setter2 } from '@/utils/Setter'
import { Box, Stack } from '@mui/material'
import { PropTextEditor2 } from '@/components/dom/ResumeEditor/PropTextEditor'
import { ImageForm } from '@/components/dom/ResumeEditor/ImageForm'

export const PersonalDetailsForm: FunctionComponent<{
  resume: Resume
  setResume: Setter2<Resume>
}> = (props) => (
  <Stack gap={4}>
    <Box
      display="flex"
      flexWrap="wrap"
      gap={2}
    >
      <ImageForm
        image={props.resume.image}
        setImage={(image) =>
          props.setResume((resume) => ({
            ...resume,
            image,
          }))
        }
      />
      <Stack>
        <PropTextEditor2
          // label="Name"
          placeholder="Full name"
          propName={'name'}
          value={props.resume}
          setValue={props.setResume}
          inputProps={{ sx: { typography: 'h1' } }}
        />
        <PropTextEditor2
          // label="Job Title"
          placeholder="Job title"
          propName={'jobTitle'}
          value={props.resume}
          setValue={props.setResume}
          inputProps={{ sx: { typography: 'subtitle1' } }}
        />
      </Stack>
    </Box>
    <Stack gap={2}>
      <PropTextEditor2
        variant="filled"
        label="Country"
        propName={'location'}
        value={props.resume}
        setValue={props.setResume}
      />
      <PropTextEditor2
        variant="filled"
        label="Nationality"
        propName={'nationality'}
        value={props.resume}
        setValue={props.setResume}
      />
      <PropTextEditor2
        variant="filled"
        label="Email Address"
        propName={'emailAddress'}
        value={props.resume}
        setValue={props.setResume}
      />
      <PropTextEditor2
        variant="filled"
        label="Phone Number"
        propName={'phoneNumber'}
        value={props.resume}
        setValue={props.setResume}
      />
    </Stack>
  </Stack>
)
