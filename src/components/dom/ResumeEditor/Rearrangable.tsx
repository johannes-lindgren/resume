import { Setter } from '@/utils/Setter'
import { Hoverable } from '@/components/dom/ResumeEditor/Hoverable'
import { IconButton, Stack } from '@mui/material'
import { movedLeft } from '@/utils/movedLeft'
import {
  DeleteOutlineRounded,
  ExpandLessRounded,
  ExpandMoreRounded,
} from '@mui/icons-material'
import { movedRight } from '@/utils/movedRight'
import { without } from '@/utils/without'
import { ReactNode } from 'react'

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
}) => {
  const { setParent, parent, current, propName, children } = props
  const currentIndex = parent[propName].findIndex(
    (it) => it.uid === current.uid,
  )
  const lastIndex = parent[propName].length - 1
  return (
    <Hoverable
      left={
        <Stack>
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
            <ExpandLessRounded fontSize="inherit" />
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
            <ExpandMoreRounded fontSize="inherit" />
          </IconButton>
        </Stack>
      }
      right={
        <IconButton
          size="small"
          color="inherit"
        >
          <DeleteOutlineRounded
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
      }
    >
      {children}
    </Hoverable>
  )
}
