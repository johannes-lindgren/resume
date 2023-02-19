import { FunctionComponent, ReactNode, useMemo, useState } from 'react'
import { Resume } from '@/model/resume'
import { AllResumeActions, useThrottledState } from '@/hooks/useThrottledState'
import { Container, styled } from '@mui/material'
import dynamic from 'next/dynamic'
import { DomResume } from '@/resume-view/DomResume'
import { DefaultTemplate } from '@/resume-view/templates/default/DefaultTemplate'
import { PdfResumeDocument } from '@/resume-view/PdfResume'
import { ResumeTarget } from '@/resume-view/ResumeTargetProvider'
import { PreviewLayout } from '@/components/dom/ResumeEditor/PreviewLayout'

const DownloadPdfButton = dynamic(
  () =>
    import('../DownloadPdfButton').then((module) => module.DownloadPdfButton),
  {
    ssr: false,
  },
)

const PdfDocument = dynamic(
  () =>
    import('../PdfDocument/PdfDocument').then((module) => module.PdfDocument),
  {
    ssr: false,
  },
)

export const PdfRoot = styled(PdfDocument)(({ theme }) => ({
  aspectRatio: '0.707107 / 1',
  border: 'none',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
  borderRadius: theme.shape.borderRadius * 2,
}))

export const ResumePreview: FunctionComponent<{
  resume: Resume
  isSaved: boolean
  previewTarget: ResumeTarget
  doc: JSX.Element
}> = (props) => {
  const { resume, previewTarget, doc } = props

  return (
    <>
      {previewTarget === 'dom' ? (
        <DomResume
          sx={{
            overflow: 'auto',
          }}
        >
          <DefaultTemplate resume={resume} />
        </DomResume>
      ) : (
        <PdfRoot showToolbar={false}>{doc}</PdfRoot>
      )}
    </>
  )
}
