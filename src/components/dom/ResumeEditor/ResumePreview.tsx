import { FunctionComponent, ReactNode, useMemo, useState } from 'react'
import { Resume } from '@/model/resume'
import { AllResumeActions, useThrottledState } from '@/hooks/useThrottledState'
import { SaveStatusBox } from '@/components/dom/ResumeEditor/SavedBox'
import { Box, styled } from '@mui/material'
import dynamic from 'next/dynamic'
import { ActionsButton } from '@/components/dom/ResumeEditor/ActionsButton'
import { DomResume } from '@/resume-view/DomResume'
import { DefaultTemplate } from '@/resume-view/templates/default/DefaultTemplate'
import { PdfResumeDocument } from '@/resume-view/PdfResume'
import { PreviewTargetSwitch } from '@/components/dom/ResumeEditor/PreviewTargetSwitch'
import { ResumeTarget } from '@/resume-view/ResumeTargetProvider'
import { A4AspectRatio } from '@/components/dom/ResumeEditor/A4AspectRatio'

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
      <Box
        display="flex"
        flexDirection="row"
        gap={2}
        sx={{
          overflowY: 'hidden',
        }}
      >
        {previewTarget === 'dom' ? (
          <DomResume>
            <DefaultTemplate resume={resume} />
          </DomResume>
        ) : (
          <PdfRoot showToolbar={false}>{doc}</PdfRoot>
        )}
      </Box>
    </PreviewLayout>
  )
}

const PreviewLayout: FunctionComponent<{
  children?: ReactNode
  header?: ReactNode
  footer?: ReactNode
}> = (props) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        flex: 1,
      }}
    >
      <Box width="100%">{props.header}</Box>
      <A4AspectRatio>{props.children}</A4AspectRatio>
      <Box width="100%">{props.footer}</Box>
    </Box>
  )
}
