import { ChangeEventHandler, FunctionComponent, useRef } from 'react'

/**
 * Hidden input to open files with. Place within a <label> element.
 * @param props
 * @constructor
 */
export const OpenObjectInput: FunctionComponent<{
  onChange?: (obj: unknown) => void
  accept: string
}> = (props) => {
  const { onChange, accept } = props
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
      const resume = JSON.parse(json) as unknown
      onChange?.(resume)
    })
    reader.readAsText(file, 'UTF-8')
    // Clear the value from the input, so that if the user selects the same file again, the event will be triggered
    if (hiddenFileInput.current) {
      hiddenFileInput.current.value = ''
    }
  }
  return (
    <input
      ref={hiddenFileInput}
      onChange={handleChange}
      accept={accept}
      type="file"
      hidden
    />
  )
}
