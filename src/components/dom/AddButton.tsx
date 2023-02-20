import { FunctionComponent, ReactNode } from 'react'
import { Button } from '@mui/material'
import { AddOutlined } from '@mui/icons-material'

export const AddButton: FunctionComponent<{
  children: ReactNode
  onClick: () => void
}> = (props) => (
  <Button
    sx={{ alignSelf: 'flex-start' }}
    startIcon={<AddOutlined />}
    onClick={props.onClick}
  >
    {props.children}
  </Button>
)
