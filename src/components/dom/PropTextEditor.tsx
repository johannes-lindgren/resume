import { TextField } from '@mui/material'
import { Setter } from '@/utils/Setter'
import { TextFieldProps } from '@mui/material/TextField/TextField'

export const PropTextEditor = <T,>(
  props: {
    value: T
    propName: keyof T
    setValue: Setter<T>
    required?: boolean
  } & Omit<TextFieldProps, 'value' | 'onChange'>,
): JSX.Element => {
  const { value, setValue, propName, required, ...textFieldProps } = props
  return (
    <TextField
      error={required && value[propName] === ''}
      required={required}
      value={value[propName]}
      onChange={({ target }) =>
        setValue((oldValue) => ({
          ...oldValue,
          [propName]: target.value,
        }))
      }
      {...textFieldProps}
    />
  )
}
