import { FunctionComponent, MouseEventHandler, useState } from 'react'
import { Setter } from '@/utils/Setter'
import { Resume } from '@/model/resume'
import {
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material'
import {
  AddCircleOutlined,
  AssessmentOutlined,
  HistoryEduOutlined,
  SchoolOutlined,
  WorkHistoryOutlined,
} from '@mui/icons-material'
import { newSummarySection } from '@/model/defaults'
import { withSectionAfter, withSectionBefore } from '@/utils/withSectionBefore'

export const AddSectionButton: FunctionComponent<
  {
    setResume: Setter<Resume>
    refUid: string
  } & (
    | { insertBefore?: false; insertAfter: true }
    | { insertBefore: true; insertAfter?: false }
  )
> = (props) => {
  const { setResume, refUid, insertBefore } = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const withSectionInserted = insertBefore
    ? withSectionBefore
    : withSectionAfter

  const handleAddProfile = () => {
    setResume((resume) =>
      withSectionInserted(resume, refUid, newSummarySection()),
    )
    handleClose()
  }

  return (
    <Box>
      <IconButton
        size="small"
        sx={{ color: 'divider' }}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <AddCircleOutlined
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
        <MenuItem onClick={handleAddProfile}>
          <ListItemIcon>
            <HistoryEduOutlined />
          </ListItemIcon>
          <ListItemText>Summary</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <WorkHistoryOutlined />
          </ListItemIcon>
          <ListItemText>Employments</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <SchoolOutlined />
          </ListItemIcon>
          <ListItemText>Education</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AssessmentOutlined />
          </ListItemIcon>
          <ListItemText>Skills</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  )
}
