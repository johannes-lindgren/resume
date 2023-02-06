import { FunctionComponent } from 'react'
import { Button, ButtonProps } from '@mui/material'
import { UploadRounded } from '@mui/icons-material'
import { Resume } from '@/model/resume'
import { OpenObjectInput } from '@/components/dom/OpenObjectInput'

export const UploadResumeButton: FunctionComponent<
  {
    onChange?: (resume: Resume) => void
  } & Omit<ButtonProps<'label'>, 'onChange'>
> = (props) => {
  const { onChange, ...buttonProps } = props
  /* TODO valudate with typia */
  return (
    <Button
      startIcon={<UploadRounded />}
      component="label"
      {...buttonProps}
    >
      Open file
      <OpenObjectInput
        onChange={(obj) => onChange?.(obj as Resume)}
        accept=".cv"
      />
    </Button>
  )
}
