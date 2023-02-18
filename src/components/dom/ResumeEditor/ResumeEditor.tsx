import { FunctionComponent, useMemo, useState } from 'react'
import { PreviewContainer } from '@/components/dom/PreviewContainer'
import { Resume } from '@/model/resume'
import { Box, Fab, FabProps, Stack, styled, Toolbar } from '@mui/material'
import { ResumeForm } from '@/components/dom/ResumeEditor/ResumeForm'
import { ResumePreview } from '@/components/dom/ResumeEditor/ResumePreview'
import { AllResumeActions, useThrottledState } from '@/hooks/useThrottledState'
import { ResumeAppFooter } from '@/components/dom/ResumeEditor/ResumeAppFooter'
import { ModeEdit, Visibility } from '@mui/icons-material'
import { useSpring } from '@react-spring/core'
import { animated } from '@react-spring/web'
import { Setter } from '@/utils/Setter'
import { SaveStatusBox } from '@/components/dom/ResumeEditor/SavedBox'
import { PreviewTargetSwitch } from '@/components/dom/ResumeEditor/PreviewTargetSwitch'
import { ActionsButton } from '@/components/dom/ResumeEditor/ActionsButton'
import { PreviewToolbar } from '@/components/dom/ResumeEditor/PreviewToolbar'
import { ResumeTarget } from '@/resume-view/ResumeTargetProvider'
import { DownloadPdfButton } from '@/components/dom/DownloadPdfButton'
import { PdfResumeDocument } from '@/resume-view/PdfResume'
import { DefaultTemplate } from '@/resume-view/templates/default/DefaultTemplate'

const Split = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column-reverse',
  '& > .ResumeEditor-form': {
    minHeight: '100vh',
  },
  '&.ResumeEditor-viewPreview > .ResumeEditor-form': {
    display: 'none',
  },
  '&.ResumeEditor-viewForm > .ResumeEditor-preview': {
    display: 'none',
  },
  '& > .ResumeEditor-preview': {
    minHeight: '100vh',
    height: '100vh',
  },
  '& > .ResumeEditor-fab': {
    position: 'fixed',
    bottom: 0,
    right: 0,
    margin: theme.spacing(2),
  },
  [theme.breakpoints.up('md')]: {
    '& > .ResumeEditor-fab': {
      display: 'none',
    },
    '& > .ResumeEditor-form': {
      display: 'flex !important',
      width: '50%',
    },
    '& > .ResumeEditor-preview': {
      position: 'fixed',
      display: 'flex !important',
      width: '50%',
      top: 0,
      right: 0,
      padding: theme.spacing(2),
    },
  },
  [theme.breakpoints.up('lg')]: {
    '& > .ResumeEditor-preview': {
      padding: theme.spacing(4),
    },
  },
}))

const FormContainer = styled(Stack)(({ theme }) => ({
  paddingLeft: theme.spacing(8),
  paddingRight: theme.spacing(8),
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(5),
  justifyContent: 'space-between',
  gap: theme.spacing(8),
}))

type SmallScreenView = 'preview' | 'form'

export const ResumeEditor: FunctionComponent<
  {
    resume: Resume
    saved: boolean
  } & Pick<AllResumeActions, 'setResume' | 'removeResume' | 'newResume'>
> = (props) => {
  const { resume, setResume, removeResume, newResume, saved } = props
  const [smallScreenView, setSmallScreenView] =
    useState<SmallScreenView>('form')
  const [previewTarget, setPreviewTarget] = useState<ResumeTarget>('dom')

  const throttledResume = useThrottledState(resume, 1500)

  const doc = useMemo(
    () => (
      <PdfResumeDocument>
        <DefaultTemplate resume={throttledResume} />
      </PdfResumeDocument>
    ),
    [throttledResume],
  )

  return (
    <Stack>
      <Toolbar>
        <SaveStatusBox isSaved={saved} />
        <PreviewTargetSwitch
          previewTarget={previewTarget}
          setPreviewTarget={setPreviewTarget}
        />
        <DownloadPdfButton document={doc} />
        <ActionsButton
          resume={resume}
          newResume={newResume}
          removeResume={removeResume}
        />
      </Toolbar>
      <Split
        className={
          smallScreenView === 'form'
            ? 'ResumeEditor-viewForm'
            : 'ResumeEditor-viewPreview'
        }
      >
        <FormContainer className="ResumeEditor-form">
          <ResumeForm
            resume={resume}
            setResume={setResume}
          />
          <ResumeAppFooter />
        </FormContainer>
        <PreviewContainer className="ResumeEditor-preview">
          <ResumePreview
            resume={resume}
            isSaved={props.saved}
            removeResume={removeResume}
            newResume={props.newResume}
            previewTarget={previewTarget}
            doc={doc}
          />
        </PreviewContainer>
        <ScrollFab
          className="ResumeEditor-fab"
          smallScreenView={smallScreenView}
          setSmallScreenView={setSmallScreenView}
        />
      </Split>
    </Stack>
  )
}

const AnimatedVisibilityIcon = animated(Visibility)
const AnimatedModeEditIcon = animated(ModeEdit)

const ScrollFab: FunctionComponent<
  {
    smallScreenView?: SmallScreenView
    setSmallScreenView?: Setter<SmallScreenView>
  } & FabProps
> = (props) => {
  const { smallScreenView, setSmallScreenView, ...fabProps } = props
  const hasScrolled = smallScreenView === 'form'
  const { transform, opacity } = useSpring({
    opacity: hasScrolled ? 1 : 0,
    transform: `perspective(600px) rotateX(${hasScrolled ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  })

  const handleClick = () =>
    setSmallScreenView?.((oldValue) =>
      oldValue === 'preview' ? 'form' : 'preview',
    )

  return (
    <Fab
      size="small"
      aria-label="scroll back to top"
      color="primary"
      onClick={handleClick}
      {...fabProps}
    >
      <AnimatedVisibilityIcon
        fontSize="inherit"
        style={{
          position: 'absolute',
          opacity: opacity.to((o) => 1 - o),
          transform,
        }}
      />
      <AnimatedModeEditIcon
        fontSize="inherit"
        style={{
          position: 'absolute',
          opacity,
          transform,
          rotateX: '180deg',
        }}
      />
    </Fab>
  )
}
