import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ComponentProps,
  createElement,
  DetailedHTMLProps,
  ElementType,
  FunctionComponent,
  ReactNode,
} from 'react'
import { theme } from '@/design/Theme'

export type ButtonComponent = FunctionComponent<
  | {
      component: 'a'
      href?: string
      download?: string
      children?: ReactNode
    }
  | {
      component?: 'button'
      onClick?: () => void
      children?: ReactNode
    }
>

export const Button: ButtonComponent = (props) => {
  const { component, ...otherProps } = props
  return createElement(component ?? 'button', {
    ...otherProps,
    style: {
      textDecoration: 'none',
      backgroundColor: theme.palette.primary.main,
      border: 'none',
      borderRadius: theme.radius(1),
      padding: theme.spacing(2),
      ...theme.typography.body,
      color: theme.palette.primary.contrastText,
      cursor: 'pointer',
    },
  })
}
