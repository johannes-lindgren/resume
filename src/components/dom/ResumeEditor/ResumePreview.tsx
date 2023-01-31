import { FunctionComponent, useCallback, useMemo, useState } from 'react'
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
  borderRadius: theme.shape.borderRadius * 2,
}))

const PreviewToolbar = styled(Box)(({ theme }) => ({
  display: 'flex',
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
    <>
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
      <PdfRoot showToolbar={false}>{doc}</PdfRoot>
      <PreviewToolbar justifyContent="right">
        <DownloadPdfButton document={doc} />
      </PreviewToolbar>
    </>
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
