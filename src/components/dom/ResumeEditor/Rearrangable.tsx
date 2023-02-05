import { Setter } from '@/utils/Setter'
import { ButtonGroup, IconButton } from '@mui/material'
import { movedLeft } from '@/utils/movedLeft'
import {
  DeleteOutlined,
  MoveDownOutlined,
  MoveUpOutlined,
} from '@mui/icons-material'
import { movedRight } from '@/utils/movedRight'
import { without } from '@/utils/without'
import { ReactNode } from 'react'
import * as React from 'react'
import { HoverableMenu } from '@/components/dom/ResumeEditor/HoverableMenu'

export const Rearrangeable = <
  Key extends string,
  Child extends { uid: string },
  Parent extends Record<Key, Child[]>,
>(props: {
  setParent: Setter<Parent>
  parent: Parent
  propName: Key
  current: Child
  children: ReactNode
  style?: React.CSSProperties
}) => {
  const { setParent, parent, current, propName, children, ...unknownProps } =
    props
  const currentIndex = parent[propName].findIndex(
    (it) => it.uid === current.uid,
  )
  const lastIndex = parent[propName].length - 1
  return (
    <HoverableMenu
      menu={
        <ButtonGroup
          variant="text"
          sx={{
            color: 'text.secondary',
            backgroundColor: 'background.paper',
            // boxShadow: 1,
            // border: 1,
          }}
        >
          <IconButton
            color="inherit"
            size="small"
            disabled={currentIndex === 0}
            onClick={() =>
              setParent((parent) => ({
                ...parent,
                [propName]: movedLeft(
                  parent[propName],
                  (it) => it.uid === current.uid,
                ),
              }))
            }
          >
            <MoveUpOutlined fontSize="inherit" />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            disabled={currentIndex === lastIndex}
            onClick={() =>
              setParent((parent) => ({
                ...parent,
                [propName]: movedRight(
                  parent[propName],
                  (it) => it.uid === current.uid,
                ),
              }))
            }
          >
            <MoveDownOutlined fontSize="inherit" />
          </IconButton>
          <IconButton
            size="small"
            color="inherit"
          >
            <DeleteOutlined
              fontSize="inherit"
              onClick={() =>
                setParent((parent) => ({
                  ...parent,
                  [propName]: without(
                    parent[propName],
                    (it) => it.uid === current.uid,
                  ),
                }))
              }
            />
          </IconButton>
        </ButtonGroup>
      }
      {...unknownProps}
    >
      {children}
    </HoverableMenu>
  )
}
