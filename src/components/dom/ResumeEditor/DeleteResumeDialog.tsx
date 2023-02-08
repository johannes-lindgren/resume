import { FunctionComponent } from 'react'
import { AllResumeActions } from '@/hooks/useThrottledState'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { DeleteOutlined } from '@mui/icons-material'

export const DeleteResumeDialog: FunctionComponent<
  { open: boolean; setOpen: (open: boolean) => void } & Pick<
    AllResumeActions,
    'removeResume'
  >
> = (props) => {
  const { removeResume, open, setOpen } = props

  return (
    <Dialog
      onClose={() => setOpen(false)}
      open={open}
    >
      <DialogTitle variant="subtitle1">Delete Resume?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you certain that you would like to delete this resume and start
          over?
        </DialogContentText>
        <DialogContentText>
          You can also save this resume to your file system.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ gap: 1 }}>
        <Button
          onClick={removeResume}
          color="error"
          // variant="contained"
          startIcon={<DeleteOutlined />}
        >
          Delete Forever
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
