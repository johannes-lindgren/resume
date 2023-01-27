import { TextField } from '@mui/material'
import { Setter } from '@/utils/Setter'
import { TextFieldProps } from '@mui/material/TextField/TextField'

export const PropTextEditor = <T,>(
  props: {
    value: T
    propName: keyof T
    setValue: Setter<T>
  } & TextFieldProps,
): JSX.Element => {
  return (
    <TextField
      {...props}
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
