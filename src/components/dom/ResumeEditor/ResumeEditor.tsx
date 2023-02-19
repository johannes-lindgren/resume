import { FunctionComponent, useMemo, useState } from 'react'
import { PreviewContainer } from '@/components/dom/PreviewContainer'
import { Resume } from '@/model/resume'
import {
  AppBar,
  Box,
  Fab,
  FabProps,
  Stack,
  styled,
  Toolbar,
  Typography,
  Zoom,
} from '@mui/material'
import { ResumeForm } from '@/components/dom/ResumeEditor/ResumeForm'
import { ResumePreview } from '@/components/dom/ResumeEditor/ResumePreview'
import { AllResumeActions, useThrottledState } from '@/hooks/useThrottledState'
import { ResumeAppFooter } from '@/components/dom/ResumeEditor/ResumeAppFooter'
import { ModeEdit, Visibility } from '@mui/icons-material'
import { Setter } from '@/utils/Setter'
import { SaveStatusBox } from '@/components/dom/ResumeEditor/SavedBox'
import { PreviewTargetSwitch } from '@/components/dom/ResumeEditor/PreviewTargetSwitch'
import { ActionsButton } from '@/components/dom/ResumeEditor/ActionsButton'
import { ResumeTarget } from '@/resume-view/ResumeTargetProvider'
import { DownloadPdfButton } from '@/components/dom/DownloadPdfButton'
import { PdfResumeDocument } from '@/resume-view/PdfResume'
import { DefaultTemplate } from '@/resume-view/templates/default/DefaultTemplate'
import { tangerine400 } from '@/fonts/tangerine'

const Split = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  overflow: 'hidden',
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
    <Stack height="100vh">
      <AppBar
        color="inherit"
        position="sticky"
      >
        <Toolbar sx={{ gap: 1 }}>
          <Typography
            variant="h1"
            noWrap
            component="div"
            sx={{
              ...tangerine400.style,
              transform: 'skew(0deg, -5deg)',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            Splendid Resume
          </Typography>
          <Box flex={1} />
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
      </AppBar>
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
