import { Setter } from '@/utils/Setter'
import { Hoverable } from '@/components/dom/ResumeEditor/Hoverable'
import { IconButton, Stack } from '@mui/material'
import { movedDown } from '@/utils/movedDown'
import {
  DeleteOutlineRounded,
  ExpandLessRounded,
  ExpandMoreRounded,
} from '@mui/icons-material'
import { movedUp } from '@/utils/movedUp'
import { without } from '@/utils/without'
import { arraySetter } from '@/utils/arraySetter'
import { SkillCategoryForm } from '@/components/dom/ResumeEditor/ResumeForm'
import { ReactNode } from 'react'

export const Rearrangeable = <
  Key extends string,
  Parent extends { [k in Key]: Child[] },
  Child extends { uid: string },
>(props: {
  index: number
  setSection: Setter<Parent>
  parent: Parent
  propName: string
  skillCategory: Child
  children: ReactNode
}) => {
  const { index, setSection, parent, skillCategory, propName, children } = props
  return (
    <Hoverable
      left={
        <Stack>
          <IconButton
            color="inherit"
            size="small"
            disabled={index === 0}
            onClick={() =>
              setSection({
                ...parent,
                skillCategories: movedDown(
                  parent[propName],
                  (it) => it.uid === skillCategory.uid,
                ),
              })
            }
          >
            <ExpandLessRounded fontSize="inherit" />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            disabled={index === parent[propName].length - 1}
            onClick={() =>
              setSection({
                ...parent,
                [propName]: movedUp(
                  parent[propName],
                  (it) => it.uid === skillCategory.uid,
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
              setSection({
                ...parent,
                skillCategories: without(
                  parent[propName],
                  (it) => it.uid === skillCategory.uid,
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
