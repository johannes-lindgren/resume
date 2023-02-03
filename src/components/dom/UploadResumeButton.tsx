import { ChangeEventHandler, FunctionComponent, useRef } from 'react'
import { Button, ButtonProps, Tooltip } from '@mui/material'
import { UploadRounded } from '@mui/icons-material'
import { Resume } from '@/model/resume'
import { Setter2 } from '@/utils/Setter'

export const UploadResumeButton: FunctionComponent<
  {
    onChange?: Setter2<Resume>
  } & Omit<ButtonProps<'label'>, 'onChange'>
> = (props) => {
  const { onChange, ...buttonProps } = props
  const hiddenFileInput = useRef<HTMLInputElement>(null)

  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0]
    if (typeof file === 'undefined') {
      // No file selected
      return
    }
    const reader = new FileReader()
    reader.addEventListener('load', (event) => {
      const json = event.target?.result
      if (typeof json !== 'string') {
        // TODO handle error
        return
      }
      // TODO validate with Typia
      const resume = JSON.parse(json) as Resume
      onChange?.(() => resume)
    })
    reader.readAsText(file, 'UTF-8')
    // Clear the value from the input, so that if the user selects the same file again, the event will be triggered
    if (hiddenFileInput.current) {
      hiddenFileInput.current.value = ''
    }
  }
  return (
    <Tooltip title="I hope you saved your work last time...">
      <Button
        startIcon={<UploadRounded />}
        component="label"
        {...buttonProps}
      >
        Open file
        <input
          ref={hiddenFileInput}
          onChange={handleChange}
          hidden
          accept=".cv"
          type="file"
        />
      </Button>
    </Tooltip>
  )
}
