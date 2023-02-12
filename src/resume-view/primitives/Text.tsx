import * as React from 'react'
import { FunctionComponent, ReactNode } from 'react'
import { domStyles, pdfStyles, Style } from '@/resume-view/primitives/Styles'
import { useResumeTarget } from '@/resume-view/ResumeTargetProvider'
import { Text as PdfText } from '@react-pdf/renderer'

export const Text: FunctionComponent<{
  children?: ReactNode
  style?: Style
}> = (props) => {
  const { style, children } = props
  const target = useResumeTarget()
  if (target === 'pdf') {
    return <PdfText style={pdfStyles(style)}>{children}</PdfText>
  } else if (target === 'dom') {
    return <span style={domStyles(style)}>{children}</span>
  } else {
    throw new Error(
      'Resume target is undefined. Wrap the resume with PdfResume or DomResume',
    )
  }
}
