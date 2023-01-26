import { ChangeEventHandler, FunctionComponent, ReactNode } from 'react'
import { theme } from '@/design/Theme'

export const TextInput: FunctionComponent<{
  placeholder?: string
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined
  label?: ReactNode
}> = (props) => (
  <>
    {/* TODO generate name */}
    <label htmlFor="name">{props.label}</label>
    <input
      type="text"
      name="name"
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
      style={{
        borderRadius: theme.radius(1),
        border: theme.border,
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background,
      }}
    />
  </>
)
