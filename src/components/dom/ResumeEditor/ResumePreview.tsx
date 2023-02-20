import { FunctionComponent } from 'react'
import { Resume } from '@/model/resume'
import dynamic from 'next/dynamic'
import { DomResume } from '@/resume-view/DomResume'
import { DefaultTemplate } from '@/resume-view/templates/default/DefaultTemplate'
import { ResumeTarget } from '@/resume-view/ResumeTargetProvider'
import { PdfRoot } from '@/components/dom/PdfDocument'

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
