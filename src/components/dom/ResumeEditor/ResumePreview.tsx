import {
  FunctionComponent,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Resume } from '@/model/resume'
import { Setter } from '@/utils/Setter'
import { useThrottledState } from '@/hooks/useThrottledState'
import { ResumeView } from '@/components/pdf/Resume'
import { SaveStatusBox } from '@/components/dom/ResumeEditor/SavedBox'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
} from '@mui/material'
import { DeleteForeverRounded, DeleteOutlineRounded } from '@mui/icons-material'
import { UploadResumeButton } from '@/components/dom/UploadResumeButton'
import { DownloadResumeButton } from '@/components/dom/DownloadResumeButton'
import dynamic from 'next/dynamic'

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

const PdfRoot = styled(PdfDocument)(({ theme }) => ({
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
  gap: theme.spacing(1),
}))

export const ResumePreview: FunctionComponent<{
  resume: Resume
  setResume: Setter<Resume>
  isSaved: boolean
  removeResume: () => void
}> = (props) => {
  const { resume } = props
  const throttledResume = useThrottledState(resume, 1500)

  const doc = useMemo(
    () => <ResumeView resume={throttledResume} />,
    [throttledResume],
  )

  return (
    <PreviewLayout
      header={
        <PreviewToolbar justifyContent="left">
          <SaveStatusBox isSaved={props.isSaved} />
          <Box flex={1} />
          <DeleteButton
            removeResume={props.removeResume}
            resume={resume}
          />
          <UploadResumeButton
            color="inherit"
            onChange={props.setResume}
          />
          <DownloadResumeButton
            color="inherit"
            resume={resume}
            suggestedName={`${resume.name}'s resumé`}
          />
        </PreviewToolbar>
      }
      footer={
        <PreviewToolbar justifyContent="right">
          <DownloadPdfButton document={doc} />
        </PreviewToolbar>
      }
    >
      <PdfRoot showToolbar={false}>{doc}</PdfRoot>
    </PreviewLayout>
  )
}

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
    width: 0,
    height: 0,
  })
  useLayoutEffect(() => {
    if (!ref.current) {
      return
    }
    const element = ref.current
    const handleResize = () => {
      const { clientWidth, clientHeight } = element
      console.log(clientWidth, clientHeight)
      const aspectRatio = 1.4142135624
      const aspectRatioInv = 0.7071067812
      const v1: Dimension = {
        width: clientWidth,
        height: clientWidth * aspectRatio,
      }
      const v2: Dimension = {
        width: clientHeight * aspectRatioInv,
        height: clientHeight,
      }
      console.log('v1', v1)
      console.log('v2', v2)
      setDim(v1.height > clientHeight ? v2 : v1)
    }
    window.addEventListener('resize', handleResize)
    const observer = new MutationObserver(handleResize)
    observer.observe(window.document, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true,
    })
    return () => {
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
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
        }}
      >
        <Box
          width={dim.width}
          height={dim.height}
        >
          {props.children}
        </Box>
      </Box>
      <Box width={dim.width}>{props.footer}</Box>
    </Box>
  )
}

const DeleteButton: FunctionComponent<{
  removeResume: () => void
  resume: Resume
}> = (props) => {
  const [open, setOpen] = useState(false)

  const handleClose = useCallback(() => setOpen(false), [])
  const handleOpen = useCallback(() => setOpen(true), [])

  return (
    <>
      <Dialog
        onClose={handleClose}
        open={open}
      >
        <DialogTitle>Delete Resume?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you certain that you would like to delete this resume and start
            over?
          </DialogContentText>
          <DialogContentText>
            You can also save this resume to your file system.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={props.removeResume}
            color="error"
            autoFocus
            startIcon={<DeleteForeverRounded />}
          >
            Delete Forever
          </Button>
          <DownloadResumeButton
            color="secondary"
            resume={props.resume}
            suggestedName={`${props.resume.name}'s resume`}
          />
          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        startIcon={<DeleteOutlineRounded />}
        onClick={handleOpen}
        size="small"
        color="inherit"
      >
        Delete resume
      </Button>
    </>
  )
}
