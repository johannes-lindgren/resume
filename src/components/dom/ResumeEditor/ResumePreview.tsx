import { FunctionComponent, useMemo, useState } from 'react'
import { Resume } from '@/model/resume'
import { AllResumeActions, useThrottledState } from '@/hooks/useThrottledState'
import { SaveStatusBox } from '@/components/dom/ResumeEditor/SavedBox'
import { Box, Container, styled } from '@mui/material'
import dynamic from 'next/dynamic'
import { ActionsButton } from '@/components/dom/ResumeEditor/ActionsButton'
import { DomResume } from '@/resume-view/DomResume'
import { DefaultTemplate } from '@/resume-view/templates/default/DefaultTemplate'
import { PdfResumeDocument } from '@/resume-view/PdfResume'
import { PreviewTargetSwitch } from '@/components/dom/ResumeEditor/PreviewTargetSwitch'
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

const PreviewToolbar = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  gap: theme.spacing(1),
}))

export const ResumePreview: FunctionComponent<
  {
    resume: Resume
    isSaved: boolean
  } & Pick<AllResumeActions, 'removeResume' | 'newResume'>
> = (props) => {
  const { resume, removeResume, newResume } = props
  const throttledResume = useThrottledState(resume, 1500)

  const doc = useMemo(
    () => (
      <PdfResumeDocument>
        <DefaultTemplate resume={throttledResume} />
      </PdfResumeDocument>
    ),
    [throttledResume],
  )

  const [previewTarget, setPreviewTarget] = useState<ResumeTarget>('dom')

  return (
    <PreviewLayout
      header={
        <PreviewToolbar justifyContent="space-between">
          <SaveStatusBox isSaved={props.isSaved} />
          <PreviewTargetSwitch
            previewTarget={previewTarget}
            setPreviewTarget={setPreviewTarget}
          />
          <ActionsButton
            resume={resume}
            newResume={newResume}
            removeResume={removeResume}
          />
        </PreviewToolbar>
      }
      footer={
        <PreviewToolbar justifyContent="right">
          <DownloadPdfButton document={doc} />
        </PreviewToolbar>
      }
    >
      {previewTarget === 'dom' ? (
        <Container
          maxWidth="md"
          disableGutters
          sx={{
            overflowY: 'hidden',
            borderRadius: 1,
            display: 'flex',
          }}
        >
          <DomResume
            sx={{
              overflow: 'auto',
            }}
          >
            <DefaultTemplate resume={resume} />
          </DomResume>
        </Container>
      ) : (
        <PdfRoot showToolbar={false}>{doc}</PdfRoot>
      )}
    </PreviewLayout>
  )
}
