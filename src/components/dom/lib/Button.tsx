import { createElement, FunctionComponent, ReactNode } from 'react'
import { defaultTheme } from '@/resume-view/Theme'

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
      backgroundColor: defaultTheme.palette.primary.main,
      border: 'none',
      borderRadius: defaultTheme.radius(1),
      padding: defaultTheme.spacing(2),
      ...defaultTheme.typography.body,
      color: defaultTheme.palette.primary.contrastText,
      cursor: 'pointer',
    },
  })
}
