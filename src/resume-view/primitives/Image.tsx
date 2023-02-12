import * as React from 'react'
import { FunctionComponent, ReactNode } from 'react'
import { domStyles, pdfStyles, Style } from '@/resume-view/primitives/Styles'
import { useResumeTarget } from '@/resume-view/ResumeTargetProvider'
import { Image as PdfImage } from '@react-pdf/renderer'

export const Image: FunctionComponent<{
  children?: ReactNode
  style?: Style
  src: string
}> = (props) => {
  const { style, children, src } = props
  const target = useResumeTarget()
  if (target === 'pdf') {
    return (
      <PdfImage
        src={src}
        style={pdfStyles(style)}
      >
        {children}
      </PdfImage>
    )
  } else if (target === 'dom') {
    return (
      <img
        src={src}
        style={domStyles(style)}
      >
        {children}
      </img>
    )
  } else {
    throw new Error(
      'Resume target is undefined. Wrap the resume with PdfResume or DomResume',
    )
  }
}
