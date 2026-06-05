import { FunctionComponent } from 'react'
import { Resume, ResumeTemplate } from '@/model/resume'
import { Setter } from '@/utils/Setter'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import { defaultTemplate } from '@/model/defaults'

export const TemplateForm: FunctionComponent<{
  resume: Resume
  setResume: Setter<Resume>
}> = (props) => {
  const { resume, setResume } = props
  const template: ResumeTemplate = resume.template ?? defaultTemplate()
  // Backwards compat: old resumes may have had 'small', treat as 'medium'
  const imageSize: ResumeTemplate['imageSize'] =
    template.imageSize === 'small' || template.imageSize === 'large'
      ? template.imageSize
      : 'small'

  const setTemplate = (getNext: (prev: ResumeTemplate) => ResumeTemplate) =>
    setResume((r) => ({
      ...r,
      template: getNext(r.template ?? defaultTemplate()),
    }))

  return (
    <Stack gap={4}>
      <Typography variant="h6">Template</Typography>
      <FormControl
        variant="filled"
        size="small"
      >
        <InputLabel id="image-size-label">Image size</InputLabel>
        <Select
          labelId="image-size-label"
          value={imageSize}
          onChange={(e) =>
            setTemplate((t) => ({
              ...t,
              imageSize: e.target.value as ResumeTemplate['imageSize'],
            }))
          }
        >
          <MenuItem value="small">Small</MenuItem>
          <MenuItem value="large">Large</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  )
}
