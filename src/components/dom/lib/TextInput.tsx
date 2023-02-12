import { ChangeEventHandler, FunctionComponent, ReactNode } from 'react'
import { defaultTheme } from '@/resume-view/Theme'

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
        borderRadius: defaultTheme.radius(1),
        border: defaultTheme.border,
        padding: defaultTheme.spacing(2),
        backgroundColor: defaultTheme.palette.background,
      }}
    />
  </>
)
