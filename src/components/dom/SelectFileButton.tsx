import {
  ChangeEventHandler,
  FunctionComponent,
  InputHTMLAttributes,
  useRef,
} from 'react'
import { Button, ButtonBase, ButtonProps, Tooltip } from '@mui/material'
import { UploadRounded } from '@mui/icons-material'
import { Resume } from '@/model/resume'

export const SelectFileButton: FunctionComponent<
  {
    onChange?: (file: File) => void
    accept: InputHTMLAttributes<unknown>['accept']
  } & Omit<ButtonProps<'label'>, 'onChange'>
> = (props) => {
  const { onChange, accept, children, ...buttonProps } = props
  const hiddenFileInput = useRef<HTMLInputElement>(null)

  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0]
    if (typeof file === 'undefined') {
      // No file selected
      return
    }
    props.onChange?.(file)
    // // Clear the value from the input, so that if the user selects the same file again, the event will be triggered
    if (hiddenFileInput.current) {
      hiddenFileInput.current.value = ''
    }
  }

  return (
    <ButtonBase
      component="label"
      {...buttonProps}
    >
      {children}
      <input
        ref={hiddenFileInput}
        onChange={handleChange}
        hidden
        accept={accept}
        type="file"
      />
    </ButtonBase>
  )
}
