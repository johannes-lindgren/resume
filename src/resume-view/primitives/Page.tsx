import * as React from 'react'
import { FunctionComponent, ReactNode } from 'react'
import { useResumeTarget } from '@/resume-view/ResumeTargetProvider'
import { Page as PdfPage } from '@react-pdf/renderer'
import { domStyles, pdfStyles, Style } from '@/resume-view/primitives/Styles'
export const Page: FunctionComponent<{
  children?: ReactNode
  style?: Style
  wrap?: boolean
}> = (props) => {
  const { style, children, wrap } = props
  const target = useResumeTarget()
  if (target === 'pdf') {
    return (
      <PdfPage
        size="A4"
        style={pdfStyles(style)}
        wrap={wrap}
      >
        {children}
      </PdfPage>
    )
  } else if (target === 'dom') {
    return <div style={domStyles(style)}>{children}</div>
  } else {
    throw new Error(
      'Resume target is undefined. Wrap the resume with PdfResume or DomResume',
    )
  }
}
