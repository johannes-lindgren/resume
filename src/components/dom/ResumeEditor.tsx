import { FunctionComponent, ReactElement, useMemo, useState } from 'react'
import { PreviewContainer } from '@/components/dom/PreviewContainer'
import { Resume } from '@/model/resume'
import {
  AppBar,
  Box,
  ButtonBase,
  Fab,
  FabProps,
  Stack,
  styled,
  Toolbar,
  Zoom,
} from '@mui/material'
import { ResumeForm } from '@/components/dom/ResumeForm'
import { ResumePreview } from '@/components/dom/ResumePreview'
import { AppActions, useThrottledState } from '@/hooks/useThrottledState'
import { ResumeAppFooter } from '@/components/dom/ResumeAppFooter'
import { ModeEdit, Visibility } from '@mui/icons-material'
import { Setter } from '@/utils/Setter'
import { PreviewTargetSwitch } from '@/components/dom/PreviewTargetSwitch'
import { ActionsButton } from '@/components/dom/ActionsButton'
import { ResumeTarget } from '@/resume-view/ResumeTargetProvider'
import { PdfResumeDocument } from '@/resume-view/PdfResume'
import { DefaultTemplate } from '@/resume-view/templates/default/DefaultTemplate'
import { tangerine400 } from '@/fonts/tangerine'
import ReactPDF from '@react-pdf/renderer'
import Link from 'next/link'

const Split = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  overflow: 'hidden',
  flex: 1,
  '& > .ResumeEditor-form': {
    overflowY: 'auto',
    flex: 1,
  },
  '& > .ResumeEditor-preview': {
    flex: 1,
  },
  '&.ResumeEditor-viewPreview > .ResumeEditor-form': {
    display: 'none',
  },
  '&.ResumeEditor-viewForm > .ResumeEditor-preview': {
    display: 'none',
  },
  '& > .ResumeEditor-fab': {
    position: 'fixed',
    bottom: 0,
    right: 0,
    margin: theme.spacing(4),
  },
  [theme.breakpoints.up('md')]: {
    '& > .ResumeEditor-fab': {
      display: 'none',
    },
    '& > .ResumeEditor-form': {
      display: 'flex !important',
    },
    '& > .ResumeEditor-preview': {
      display: 'flex !important',
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

type EditorProps = {
  resume: Resume
  saved: boolean
} & Pick<AppActions, 'setResume' | 'removeResume' | 'newResume'>

export const ResumeEditor: FunctionComponent<EditorProps> = (props) => {
  const { resume, setResume } = props
  const [smallScreenView, setSmallScreenView] =
    useState<SmallScreenView>('form')
  const [previewTarget, setPreviewTarget] = useState<ResumeTarget>('dom')

  const throttledResume = useThrottledState(resume, 1500)

  const resumeDocument = useMemo(
    () => (
      <PdfResumeDocument>
        <DefaultTemplate resume={throttledResume} />
      </PdfResumeDocument>
    ),
    [throttledResume],
  )

  return (
    <Stack height="100vh">
      <EditorAppBar
        {...props}
        resumeDocument={resumeDocument}
        previewTarget={previewTarget}
        setPreviewTarget={setPreviewTarget}
      />
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
            previewTarget={previewTarget}
            doc={resumeDocument}
          />
        </PreviewContainer>
        <EditorFab
          className="ResumeEditor-fab"
          smallScreenView={smallScreenView}
          setSmallScreenView={setSmallScreenView}
        />
      </Split>
    </Stack>
  )
}

const EditorFab: FunctionComponent<
  {
    smallScreenView?: SmallScreenView
    setSmallScreenView?: Setter<SmallScreenView>
  } & FabProps
> = (props) => {
  const { smallScreenView, setSmallScreenView, ...fabProps } = props

  const handleClick = () =>
    setSmallScreenView?.((oldValue) =>
      oldValue === 'preview' ? 'form' : 'preview',
    )

  return (
    <>
      <Zoom
        in={smallScreenView === 'form'}
        unmountOnExit
      >
        <Fab
          size="small"
          aria-label="scroll back to top"
          color="primary"
          onClick={handleClick}
          {...fabProps}
        >
          <Visibility fontSize="inherit" />
        </Fab>
      </Zoom>
      <Zoom
        in={smallScreenView === 'preview'}
        unmountOnExit
      >
        <Fab
          size="small"
          aria-label="scroll back to top"
          color="primary"
          onClick={handleClick}
          {...fabProps}
        >
          <ModeEdit fontSize="inherit" />
        </Fab>
      </Zoom>
    </>
  )
}

export const EditorAppBar: FunctionComponent<
  EditorProps & {
    previewTarget: ResumeTarget
    setPreviewTarget: Setter<ResumeTarget>
    resumeDocument: ReactElement<ReactPDF.DocumentProps>
  }
> = (props) => {
  const {
    previewTarget,
    setPreviewTarget,
    resume,
    resumeDocument,
    newResume,
    removeResume,
  } = props
  return (
    <AppBar
      color="inherit"
      position="sticky"
    >
      <Toolbar sx={{ gap: 2 }}>
        <ButtonBase
          component={Link}
          href="/"
          sx={{
            typography: 'h1',
            ...tangerine400.style,
            transform: 'skew(0deg, -5deg)',
            textDecoration: 'none',
            color: 'secondary.main',
            whiteSpace: 'nowrap',
          }}
        >
          Splendid Resume
        </ButtonBase>
        <Box flex={1} />
        <PreviewTargetSwitch
          previewTarget={previewTarget}
          setPreviewTarget={setPreviewTarget}
        />
        <ActionsButton
          resumeDocument={resumeDocument}
          resume={resume}
          newResume={newResume}
          removeResume={removeResume}
        />
      </Toolbar>
    </AppBar>
  )
}
