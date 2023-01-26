import { TextField } from '@mui/material'

export const PropTextEditor = <T,>(props: {
  label: string
  value: T
  propName: keyof T
  setValue: (getter: (oldValue: T) => T) => void
}): JSX.Element => {
  return (
    <TextField
      variant="filled"
      label={props.label}
      value={props.value[props.propName]}
      onChange={({ target }) =>
        props.setValue((oldValue) => ({
          ...oldValue,
          name: target.value,
        }))
      }
    />
  )
}
