import { FunctionComponent } from 'react'
import { Skill, SkillCategory, SkillSection } from '@/model/resume'
import { Setter } from '@/utils/Setter'
import {
  Autocomplete,
  Chip,
  Collapse,
  Paper,
  Stack,
  TextField,
} from '@mui/material'
import { PropTextEditor } from '@/components/dom/ResumeEditor/PropTextEditor'
import { arraySetter } from '@/utils/arraySetter'
import { AddButton } from '@/components/dom/ResumeEditor/AddButton'
import { newSkillCategory } from '@/model/defaults'
import { uid } from '@/utils/uid'
import { Flipped, Flipper } from 'react-flip-toolkit'
import { Rearrangeable } from '@/components/dom/ResumeEditor/Rearrangable'
import { TransitionGroup } from 'react-transition-group'

export const SkillSectionForm: FunctionComponent<{
  section: SkillSection
  setSection: Setter<SkillSection>
}> = (props) => (
  <Flipper
    flipKey={props.section.skillCategories.map((it) => it.uid).join(',')}
  >
    <Stack
      component={TransitionGroup}
      gap={2}
      sx={{ bgColor: 'background.paper' }}
    >
      <PropTextEditor
        propName="header"
        value={props.section}
        setValue={props.setSection}
        inputProps={{ sx: { typography: 'h2' } }}
        placeholder="Skills"
      />
      {props.section.skillCategories.map((skillCategory) => (
        <Collapse key={skillCategory.uid}>
          <Flipped flipId={skillCategory.uid}>
            <Rearrangeable
              setParent={props.setSection}
              parent={props.section}
              propName="skillCategories"
              current={skillCategory}
            >
              <Paper
                variant="outlined"
                sx={{ p: 2 }}
              >
                <SkillCategoryForm
                  skillCategory={skillCategory}
                  setSkillCategory={arraySetter(
                    skillCategory.uid,
                    props.setSection,
                    'skillCategories',
                  )}
                />
              </Paper>
            </Rearrangeable>
          </Flipped>
        </Collapse>
      ))}
      <AddButton
        onClick={() =>
          props.setSection((section) => ({
            ...section,
            skillCategories: [...section.skillCategories, newSkillCategory()],
          }))
        }
      >
        Add one more skill
      </AddButton>
    </Stack>
  </Flipper>
)
export const SkillCategoryForm: FunctionComponent<{
  skillCategory: SkillCategory
  setSkillCategory: Setter<SkillCategory>
}> = (props) => (
  <Stack>
    <PropTextEditor
      placeholder="Skill Category"
      propName="header"
      value={props.skillCategory}
      setValue={props.setSkillCategory}
      inputProps={{ sx: { typography: 'subtitle1' } }}
    />
    <Autocomplete
      multiple
      options={[]}
      defaultValue={[]}
      value={props.skillCategory.skills}
      onChange={(e, newValue) =>
        props.setSkillCategory((skillCategory) => ({
          ...skillCategory,
          skills: newValue.map((v) =>
            typeof v === 'string' ? { uid: uid(), label: v } : v,
          ),
        }))
      }
      freeSolo
      renderTags={(value: Skill[], getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="filled"
            color="default"
            label={option.label}
            {...getTagProps({ index })}
            key={option.uid}
            sx={{
              mr: (theme) =>
                `${theme.spacing(
                  index === props.skillCategory.skills.length - 1 ? 1 : 0,
                )} !important`,
            }}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          placeholder="Type a skill & Press Enter"
          inputProps={{
            ...params.inputProps,
          }}
        />
      )}
    />
  </Stack>
)
