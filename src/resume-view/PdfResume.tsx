import React, { FunctionComponent, ReactNode } from 'react'
import { ResumeTargetProvider } from '@/resume-view/ResumeTargetProvider'
import { Document, Page } from '@react-pdf/renderer'
import { PageCount } from '@/resume-view/PageCount'

export const PdfResumeDocument: FunctionComponent<{
  children?: ReactNode
}> = (props) => {
  return (
    <Document>
      <Page size="A4">
        <ResumeTargetProvider target="pdf">
          {props.children}
        </ResumeTargetProvider>
        <PageCount />
      </Page>
    </Document>
  )
}
