import { FunctionComponent, MouseEventHandler, useState } from 'react'
import { Resume } from '@/model/resume'
import { AllResumeActions } from '@/hooks/useThrottledState'
import { useSaveObject } from '@/components/dom/DownloadResumeButton'
import {
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material'
import {
  DeleteOutlineRounded,
  DownloadRounded,
  MoreVertOutlined,
  UploadRounded,
} from '@mui/icons-material'
import { DeleteResumeDialog } from '@/components/dom/ResumeEditor/DeleteResumeDialog'
import { OpenResumeDialog } from '@/components/dom/ResumeEditor/OpenResumeDialog'

export const ActionsButton: FunctionComponent<
  { resume: Resume } & Pick<AllResumeActions, 'removeResume' | 'newResume'>
> = (props) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isOpenDialogOpen, setOpenDialogOpen] = useState(false)
  const { resume, removeResume, newResume } = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const download = useSaveObject(resume, `${props.resume.name}'s resume.cv`)

  const handleClickSave = () => {
    download()
    handleClose()
  }
  const handleClickOpen = () => {
    setOpenDialogOpen(true)
    handleClose()
  }
  const handleClickRemove = () => {
    setDeleteDialogOpen(true)
    handleClose()
  }

  // const handleAddProfile = () => {
  //   setResume((resume) =>
  //     withSectionInserted(resume, refUid, newSummarySection()),
  //   )
  //   handleClose()
  // }

  return (
    <Box>
      <IconButton
        sx={{ color: 'divider' }}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertOutlined
          fontSize="inherit"
          color="inherit"
        />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClickSave}>
          <ListItemIcon>
            <DownloadRounded />
          </ListItemIcon>
          <ListItemText>Save as...</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClickOpen}>
          <ListItemIcon>
            <UploadRounded />
          </ListItemIcon>
          <ListItemText>Open...</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClickRemove}>
          <ListItemIcon>
            <DeleteOutlineRounded />
          </ListItemIcon>
          <ListItemText>Remove Resume</ListItemText>
        </MenuItem>
      </Menu>
      <OpenResumeDialog
        open={isOpenDialogOpen}
        setOpen={setOpenDialogOpen}
        newResume={newResume}
      />
      <DeleteResumeDialog
        open={isDeleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        removeResume={removeResume}
      />
    </Box>
  )
}
