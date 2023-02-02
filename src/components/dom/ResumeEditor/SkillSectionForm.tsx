import { FunctionComponent } from 'react'
import { SkillCategory, SkillSection } from '@/model/resume'
import { Setter } from '@/utils/Setter'
import { Autocomplete, Chip, Stack, TextField } from '@mui/material'
import { PropTextEditor } from '@/components/dom/ResumeEditor/PropTextEditor'
import { Rearrangeable } from '@/components/dom/ResumeEditor/Rearrangable'
import { arraySetter } from '@/utils/arraySetter'
import { AddButton } from '@/components/dom/ResumeEditor/AddButton'
import { newSkillCategory } from '@/model/defaults'

export const SkillSectionForm: FunctionComponent<{
  section: SkillSection
  setSection: Setter<SkillSection>
}> = (props) => (
  <Stack gap={2}>
    <PropTextEditor
      propName={'header'}
      value={props.section}
      setValue={props.setSection}
      inputProps={{ sx: { typography: 'h2' } }}
      placeholder="Skills"
    />
    {props.section.skillCategories.map((skillCategory) => (
      <Rearrangeable
        key={skillCategory.uid}
        setParent={props.setSection}
        parent={props.section}
        propName="skillCategories"
        current={skillCategory}
      >
        <SkillCategoryForm
          skillCategory={skillCategory}
          setSkillCategory={arraySetter(
            props.section,
            props.setSection,
            'skillCategories',
          )}
        />
      </Rearrangeable>
    ))}
    <AddButton
      onClick={() =>
        props.setSection({
          ...props.section,
          skillCategories: [
            ...props.section.skillCategories,
            newSkillCategory(),
          ],
        })
      }
    >
      Add one more skill
    </AddButton>
  </Stack>
)
export const SkillCategoryForm: FunctionComponent<{
  skillCategory: SkillCategory
  setSkillCategory: Setter<SkillCategory>
}> = (props) => (
  <Stack>
    <PropTextEditor
      placeholder="Skill Category"
      propName={'header'}
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
        props.setSkillCategory({
          ...props.skillCategory,
          skills: newValue,
        })
      }
      freeSolo
      renderTags={(value: readonly string[], getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="filled"
            color="default"
            label={option}
            {...getTagProps({ index })}
            key={index}
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
