import { TextField } from '@mui/material'
import { Setter } from '@/utils/Setter'
import { TextFieldProps } from '@mui/material/TextField/TextField'

export const PropTextEditor2 = <T,>(
  props: {
    value: T
    propName: keyof T
    setValue: Setter<T>
  } & Omit<TextFieldProps, 'value' | 'onChange'>,
): JSX.Element => {
  const { value, setValue, propName, ...textFieldProps } = props
  return (
    <TextField
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
