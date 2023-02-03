import { FunctionComponent } from 'react'
import { SkillCategory, SkillSection } from '@/model/resume'
import { Setter2, setter22setter } from '@/utils/Setter'
import { Autocomplete, Chip, Stack, TextField } from '@mui/material'
import { PropTextEditor2 } from '@/components/dom/ResumeEditor/PropTextEditor'
import { Rearrangeable } from '@/components/dom/ResumeEditor/Rearrangable'
import { arraySetter2 } from '@/utils/arraySetter'
import { AddButton } from '@/components/dom/ResumeEditor/AddButton'
import { newSkillCategory } from '@/model/defaults'

export const SkillSectionForm: FunctionComponent<{
  section: SkillSection
  setSection: Setter2<SkillSection>
}> = (props) => (
  <Stack gap={2}>
    <PropTextEditor2
      propName={'header'}
      value={props.section}
      setValue={props.setSection}
      inputProps={{ sx: { typography: 'h2' } }}
      placeholder="Skills"
    />
    {props.section.skillCategories.map((skillCategory) => (
      <Rearrangeable
        key={skillCategory.uid}
        setParent={setter22setter(props.setSection)}
        parent={props.section}
        propName="skillCategories"
        current={skillCategory}
      >
        <SkillCategoryForm
          skillCategory={skillCategory}
          setSkillCategory={arraySetter2(
            props.section.uid,
            props.setSection,
            'skillCategories',
          )}
        />
      </Rearrangeable>
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
)
export const SkillCategoryForm: FunctionComponent<{
  skillCategory: SkillCategory
  setSkillCategory: Setter2<SkillCategory>
}> = (props) => (
  <Stack>
    <PropTextEditor2
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
        props.setSkillCategory((skillCategory) => ({
          ...skillCategory,
          skills: newValue,
        }))
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
