import { TextField } from '@mui/material'
import { Setter } from '@/components/dom/ResumeEditor/ResumeForm'

export const PropTextEditor = <T,>(props: {
  label: string
  value: T
  propName: keyof T
  setValue: Setter<T>
}): JSX.Element => {
  return (
    <TextField
      variant="filled"
      label={props.label}
      value={props.value[props.propName]}
      onChange={({ target }) =>
        props.setValue({
          ...props.value,
          [props.propName]: target.value,
        })
      }
    />
  )
}
