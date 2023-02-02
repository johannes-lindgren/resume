import { FunctionComponent } from 'react'
import { DetailsSection, ResumeSection } from '@/model/resume'
import { Setter } from '@/utils/Setter'
import { Stack } from '@mui/material'
import { PropTextEditor } from '@/components/dom/ResumeEditor/PropTextEditor'

export const DetailsSectionForm: FunctionComponent<{
  section: DetailsSection
  setSection: Setter<ResumeSection>
}> = (props) => (
  <Stack gap={2}>
    <PropTextEditor
      propName={'header'}
      placeholder="Profile"
      value={props.section}
      setValue={props.setSection}
      inputProps={{ sx: { typography: 'h2' } }}
    />
    <PropTextEditor
      multiline
      placeholder="A brief description of my profile..."
      propName={'description'}
      value={props.section}
      setValue={props.setSection}
    />
  </Stack>
)
