import { TextField } from '@mui/material'
import { Setter, Setter2 } from '@/utils/Setter'
import { TextFieldProps } from '@mui/material/TextField/TextField'

export const PropTextEditor = <T,>(
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
        setValue({
          ...value,
          [propName]: target.value,
        })
      }
      {...textFieldProps}
    />
  )
}

export const PropTextEditor2 = <T,>(
  props: {
    value: T
    propName: keyof T
    setValue: Setter2<T>
  } & Omit<TextFieldProps, 'value' | 'onChange'>,
): JSX.Element => {
  const { value, setValue, propName, ...textFieldProps } = props
  return (
    <TextField
      value={value[propName]}
      onChange={({ target }) => {
        console.log('setting', target.value)
        setValue((oldValue) => {
          return {
            ...oldValue,
            [propName]: target.value,
          }
        })
      }}
      {...textFieldProps}
    />
  )
}
