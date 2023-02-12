import * as React from 'react'
import { FunctionComponent, ReactNode } from 'react'
import { domStyles, pdfStyles, Style } from '@/resume-view/primitives/Styles'
import { useResumeTarget } from '@/resume-view/ResumeTargetProvider'
import { Link as PdfLink } from '@react-pdf/renderer'

export const Link: FunctionComponent<{
  children?: ReactNode
  style?: Style
  src: string
}> = (props) => {
  const { style, children, src } = props
  const target = useResumeTarget()
  if (target === 'pdf') {
    return (
      <PdfLink
        style={pdfStyles(style)}
        src={src}
      >
        {children}
      </PdfLink>
    )
  } else if (target === 'dom') {
    return (
      <a
        href={src}
        style={domStyles(style)}
      >
        {children}
      </a>
    )
  } else {
    throw new Error(
      'Resume target is undefined. Wrap the resume with PdfResume or DomResume',
    )
  }
}
