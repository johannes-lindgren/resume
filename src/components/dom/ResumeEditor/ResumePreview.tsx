import {
  FunctionComponent,
  ReactNode,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
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
      {/*<PdfRoot showToolbar={false}>{doc}</PdfRoot>*/}
    </PreviewLayout>
  )
}

const aspectRatio = 1.4142135624
const aspectRatioInv = 0.7071067812

const PreviewLayout: FunctionComponent<{
  children?: ReactNode
  header?: ReactNode
  footer?: ReactNode
}> = (props) => {
  type Dimension = {
    width: number
    height: number
  }
  const ref = useRef<HTMLDivElement>(null)
  const [dim, setDim] = useState<Dimension>({
    width: 400,
    height: aspectRatio * 400,
  })
  useLayoutEffect(() => {
    if (!ref.current) {
      return
    }
    const element = ref.current
    const handleResize = () => {
      const { clientWidth, clientHeight } = element
      const v1: Dimension = {
        width: clientWidth,
        height: clientWidth * aspectRatio,
      }
      const v2: Dimension = {
        width: clientHeight * aspectRatioInv,
        height: clientHeight,
      }
      setDim(v1.height > clientHeight ? v2 : v1)
    }
    window.addEventListener('resize', handleResize)
    handleResize() // Trigger initially
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [setDim])
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
      <Box width={dim.width}>{props.header}</Box>
      <Box
        ref={ref}
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <Box
          sx={{
            overflow: 'hidden',
            borderRadius: 1,
          }}
        >
          <Box
            sx={{
              width: dim.width,
              height: dim.height,
              maxWidth: dim.width,
              maxHeight: dim.height,
              overflowY: 'auto',
            }}
          >
            {props.children}
          </Box>
        </Box>
      </Box>
      <Box width={dim.width}>{props.footer}</Box>
    </Box>
  )
}

export const AutoA4: FunctionComponent = (props) => {}
