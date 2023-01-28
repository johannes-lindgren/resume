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
import { arraySetter } from '@/utils/arraySetter'
import { SkillCategoryForm } from '@/components/dom/ResumeEditor/ResumeForm'
import { ReactNode } from 'react'

export const Rearrangeable = <
  Key extends string,
  Parent extends { [k in Key]: Child[] },
  Child extends { uid: string },
>(props: {
  currentIndex: number
  setParent: Setter<Parent>
  parent: Parent
  propName: string
  current: Child
  children: ReactNode
}) => {
  const { currentIndex, setParent, parent, current, propName, children } = props
  return (
    <Hoverable
      left={
        <Stack>
          <IconButton
            color="inherit"
            size="small"
            disabled={currentIndex === 0}
            onClick={() =>
              setParent({
                ...parent,
                [propName]: movedLeft(
                  parent[propName],
                  (it) => it.uid === current.uid,
                ),
              })
            }
          >
            <ExpandLessRounded fontSize="inherit" />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            disabled={currentIndex === parent[propName].length - 1}
            onClick={() =>
              setParent({
                ...parent,
                [propName]: movedRight(
                  parent[propName],
                  (it) => it.uid === current.uid,
                ),
              })
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
              setParent({
                ...parent,
                [propName]: without(
                  parent[propName],
                  (it) => it.uid === current.uid,
                ),
              })
            }
          />
        </IconButton>
      }
    >
      {children}
    </Hoverable>
  )
}
