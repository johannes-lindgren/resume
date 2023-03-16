import React, { FunctionComponent, ReactNode } from 'react'
import { ResumeTargetProvider } from '@/resume-view/ResumeTargetProvider'
import { Document } from '@react-pdf/renderer'

export const PdfResumeDocument: FunctionComponent<{
  children?: ReactNode
}> = (props) => {
  return (
    <Document>
      <ResumeTargetProvider target="pdf">{props.children}</ResumeTargetProvider>
    </Document>
  )
}
