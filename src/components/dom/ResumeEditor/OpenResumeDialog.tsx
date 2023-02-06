import { FunctionComponent } from 'react'
import { AllResumeActions } from '@/hooks/useThrottledState'
import { Resume } from '@/model/resume'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { UploadRounded } from '@mui/icons-material'
import { OpenObjectInput } from '@/components/dom/OpenObjectInput'

export const OpenResumeDialog: FunctionComponent<
  { open: boolean; setOpen: (open: boolean) => void } & Pick<
    AllResumeActions,
    'newResume'
  >
> = (props) => {
  const { newResume, open, setOpen } = props

  const handleOpen = (openedResume: Resume) => {
    newResume(openedResume)
    setOpen(false)
  }

  return (
    <Dialog
      onClose={() => setOpen(false)}
      open={open}
    >
      <DialogTitle variant="subtitle1">Delete Resume?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Opening another resume from the file system will remove all unsaved
          progress in the editor. Are you sure that you would like to continue?
        </DialogContentText>
        <DialogContentText>
          You can also save this resume to your file system before you continue.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ gap: 1 }}>
        <Button
          component="label"
          color="warning"
          variant="contained"
          startIcon={<UploadRounded />}
        >
          Open a resume from the file system
          {/* Validate with typia */}
          <OpenObjectInput
            accept=".cv"
            onChange={(obj) => handleOpen(obj as Resume)}
          />
        </Button>
        <Button
          onClick={() => setOpen(false)}
          variant="contained"
          color="primary"
          autoFocus
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}
