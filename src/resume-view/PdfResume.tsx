import React, { FunctionComponent, ReactNode } from 'react'
import { ResumeTargetProvider } from '@/resume-view/ResumeTargetProvider'
import { PdfRoot } from '@/components/dom/ResumeEditor/ResumePreview'
import { Document, Page } from '@react-pdf/renderer'
import { PageCount } from '@/components/pdf/Resume'

export const PdfResume: FunctionComponent<{
  children?: ReactNode
}> = (props) => {
  return (
    <PdfRoot
      showToolbar={false}
      sx={{ flex: 1 }}
    >
      <PdfResumeDocument {...props} />
    </PdfRoot>
  )
}

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