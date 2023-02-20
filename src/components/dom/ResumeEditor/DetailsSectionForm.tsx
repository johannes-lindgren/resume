import { FunctionComponent } from 'react'
import { DetailsSection } from '@/model/resume'
import { Setter } from '@/utils/Setter'
import { Stack } from '@mui/material'
import { PropTextEditor } from '@/components/dom/ResumeEditor/PropTextEditor'

export const DetailsSectionForm: FunctionComponent<{
  section: DetailsSection
  setSection: Setter<DetailsSection>
}> = (props) => (
  <Stack
    gap={2}
    sx={{ bgColor: 'background.paper' }}
  >
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
