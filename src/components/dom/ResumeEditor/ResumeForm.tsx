import { FunctionComponent } from 'react'
import {
  DetailsSection,
  EmploymentHistorySection,
  Resume,
  ResumeSection,
  SkillCategory,
  SkillSection,
} from '@/model/resume'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Chip,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { PropTextEditor } from '@/components/dom/ResumeEditor/PropTextEditor'
import { arraySetter } from '@/utils/arraySetter'
import { Setter } from '@/utils/Setter'
import { ExpandMore } from '@mui/icons-material'

export const ResumeForm: FunctionComponent<{
  resume: Resume
  setResume: Setter<Resume>
}> = (props) => (
  <Stack
    gap={5}
    padding={4}
  >
    <Typography variant="h1">Resume</Typography>
    <Stack gap={2}>
      <Typography variant="h2">Personal Details</Typography>
      <PropTextEditor
        variant="filled"
        label="Name"
        propName={'name'}
        value={props.resume}
        setValue={props.setResume}
      />
      <PropTextEditor
        variant="filled"
        label="Job Title"
        propName={'jobTitle'}
        value={props.resume}
        setValue={props.setResume}
      />
      <PropTextEditor
        variant="filled"
        label="Country"
        propName={'location'}
        value={props.resume}
        setValue={props.setResume}
      />
      <PropTextEditor
        variant="filled"
        label="Nationality"
        propName={'nationality'}
        value={props.resume}
        setValue={props.setResume}
      />
      <PropTextEditor
        variant="filled"
        label="Email Address"
        propName={'emailAddress'}
        value={props.resume}
        setValue={props.setResume}
      />
      <PropTextEditor
        variant="filled"
        label="Phone Number"
        propName={'phoneNumber'}
        value={props.resume}
        setValue={props.setResume}
      />
    </Stack>
    <Stack gap={4}>
      {props.resume.sections.map((section) => (
        <>
          <Divider />
          <SectionForm
            key={section.uid}
            section={section}
            setSection={arraySetter(props.resume, props.setResume, 'sections')}
          />
        </>
      ))}
    </Stack>
  </Stack>
)

const SectionForm: FunctionComponent<{
  section: ResumeSection
  setSection: Setter<ResumeSection>
}> = (props) => {
  switch (props.section.type) {
    case 'details':
      return (
        <DetailsSectionForm
          section={props.section}
          setSection={props.setSection}
        />
      )
    case 'skills':
      return (
        <SkillSectionForm
          section={props.section}
          setSection={props.setSection}
        />
      )
    case 'employmentHistory':
      return (
        <EmploymentHistorySectionForm
          section={props.section}
          setSection={props.setSection}
        />
      )
  }
}

const DetailsSectionForm: FunctionComponent<{
  section: DetailsSection
  setSection: Setter<ResumeSection>
}> = (props) => (
  <Stack gap={2}>
    <PropTextEditor
      propName={'header'}
      value={props.section}
      setValue={props.setSection}
      inputProps={{ sx: { typography: 'h2' } }}
    />
    <PropTextEditor
      multiline
      label="Description"
      propName={'description'}
      value={props.section}
      setValue={props.setSection}
    />
  </Stack>
)

const EmploymentHistorySectionForm: FunctionComponent<{
  section: EmploymentHistorySection
  setSection: Setter<ResumeSection>
}> = (props) => (
  <Stack gap={2}>
    <PropTextEditor
      propName={'header'}
      value={props.section}
      setValue={props.setSection}
      inputProps={{ sx: { typography: 'h2' } }}
    />
  </Stack>
)

const SkillSectionForm: FunctionComponent<{
  section: SkillSection
  setSection: Setter<ResumeSection>
}> = (props) => (
  <Stack gap={2}>
    <PropTextEditor
      propName={'header'}
      value={props.section}
      setValue={props.setSection}
      inputProps={{ sx: { typography: 'h2' } }}
    />
    {props.section.skillCategories.map((skillCategory) => (
      <SkillCategoryForm
        key={skillCategory.uid}
        skillCategory={skillCategory}
        setSkillCategory={arraySetter(
          props.section,
          props.setSection,
          'skillCategories',
        )}
      />
    ))}
  </Stack>
)

export const SkillCategoryForm: FunctionComponent<{
  skillCategory: SkillCategory
  setSkillCategory: Setter<SkillCategory>
}> = (props) => (
  <Accordion
    variant="outlined"
    sx={{ borderRadius: 2, overflow: 'hidden' }}
  >
    <AccordionSummary expandIcon={<ExpandMore />}>
      <PropTextEditor
        propName={'header'}
        value={props.skillCategory}
        setValue={props.setSkillCategory}
        onClick={(e) => e.preventDefault()}
      />
    </AccordionSummary>
    <AccordionDetails>
      <Stack gap={2}>
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
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Skills"
              placeholder="Your skill"
            />
          )}
        />
      </Stack>
    </AccordionDetails>
  </Accordion>
)
