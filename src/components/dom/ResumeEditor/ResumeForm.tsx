import { FunctionComponent, ReactNode } from 'react'
import {
  DetailsSection,
  Employment,
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
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { PropTextEditor } from '@/components/dom/ResumeEditor/PropTextEditor'
import { arraySetter } from '@/utils/arraySetter'
import { Setter } from '@/utils/Setter'
import { Box } from '@mui/system'
import {
  AddOutlined,
  Assessment,
  BusinessCenterOutlined,
  ExpandMore,
  HistoryEduRounded,
  SchoolOutlined,
  SchoolRounded,
  Work,
  WorkHistory,
  WorkOutlineRounded,
} from '@mui/icons-material'
import { replaced } from '@/utils/replaced'
import { Rearrangeable } from '@/components/dom/ResumeEditor/Rearrangable'
import Grid2 from '@mui/material/Unstable_Grid2'
import { uid } from '@/utils/uid'
import {
  newEducationHistorySection,
  newEmployment,
  newSkillCategory,
  newSkillsSection,
  newSummarySection,
} from '@/model/defaults'

export const ResumeForm: FunctionComponent<{
  resume: Resume
  setResume: Setter<Resume>
}> = (props) => (
  <Stack gap={4}>
    <PersonalDetailsForm
      resume={props.resume}
      setResume={props.setResume}
    />
    {props.resume.sections.map((section, index) => (
      <>
        <Divider />
        <Rearrangeable
          key={section.uid}
          setParent={props.setResume}
          parent={props.resume}
          propName="sections"
          current={section}
          currentIndex={index}
        >
          <SectionForm
            section={section}
            setSection={arraySetter(props.resume, props.setResume, 'sections')}
          />
        </Rearrangeable>
      </>
    ))}
    <Divider />
    <AddSectionsPanel
      resume={props.resume}
      setResume={props.setResume}
    />
  </Stack>
)

const PersonalDetailsForm: FunctionComponent<{
  resume: Resume
  setResume: Setter<Resume>
}> = (props) => (
  <Stack gap={2}>
    <Stack>
      <PropTextEditor
        // label="Name"
        placeholder="Full name"
        propName={'name'}
        value={props.resume}
        setValue={props.setResume}
        inputProps={{ sx: { typography: 'h1' } }}
      />
      <PropTextEditor
        // label="Job Title"
        placeholder="Job title"
        propName={'jobTitle'}
        value={props.resume}
        setValue={props.setResume}
        inputProps={{ sx: { typography: 'subtitle1' } }}
      />
    </Stack>
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
)

const AddSectionsPanel: FunctionComponent<{
  resume: Resume
  setResume: Setter<Resume>
}> = (props) => (
  <Grid
    container
    spacing={2}
    columns={2}
  >
    <Grid
      item
      xs={1}
    >
      <Button
        startIcon={<WorkHistory />}
        onClick={() =>
          props.setResume({
            ...props.resume,
            sections: [...props.resume.sections, newEducationHistorySection()],
          })
        }
      >
        Add Employments
      </Button>
    </Grid>
    <Grid
      item
      xs={1}
    >
      <Button
        startIcon={<SchoolOutlined />}
        onClick={() =>
          props.setResume({
            ...props.resume,
            sections: [...props.resume.sections, newEducationHistorySection()],
          })
        }
      >
        Add Educations
      </Button>
    </Grid>
    <Grid
      item
      xs={1}
    >
      <Button
        startIcon={<Assessment />}
        onClick={() =>
          props.setResume({
            ...props.resume,
            sections: [...props.resume.sections, newSkillsSection()],
          })
        }
      >
        Add Skills
      </Button>
    </Grid>
    <Grid
      item
      xs={1}
    >
      <Button
        startIcon={<HistoryEduRounded />}
        onClick={() =>
          props.setResume({
            ...props.resume,
            sections: [...props.resume.sections, newSummarySection()],
          })
        }
      >
        Add Summary
      </Button>
    </Grid>
  </Grid>
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
      placeholder="Profile"
      value={props.section}
      setValue={props.setSection}
      inputProps={{ sx: { typography: 'h2' } }}
    />
    <PropTextEditor
      multiline
      placeholder="A brief description of my profile..."
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
  <Stack gap={4}>
    <PropTextEditor
      placeholder="Employment History"
      propName={'header'}
      value={props.section}
      setValue={props.setSection}
      inputProps={{ sx: { typography: 'h2' } }}
    />
    {props.section.employments.map((employment, index) => (
      <Rearrangeable
        key={employment.uid}
        setParent={props.setSection}
        parent={props.section}
        propName="employments"
        current={employment}
        currentIndex={index}
      >
        <Accordion
          key={employment.uid}
          variant="outlined"
          disableGutters
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Stack>
              <Typography>{employment.jobTitle}&nbsp;</Typography>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary' }}
              >
                {(employment.startDate || employment.endDate) &&
                  `${employment.startDate} — ${employment.endDate}`}
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <EmploymentForm
              employment={employment}
              setEmployment={arraySetter(
                props.section,
                props.setSection,
                'employments',
              )}
            />
          </AccordionDetails>
        </Accordion>
      </Rearrangeable>
    ))}
    <AddButton
      onClick={() =>
        props.setSection({
          ...props.section,
          employments: [...props.section.employments, newEmployment()],
        })
      }
    >
      Add one more employment
    </AddButton>
  </Stack>
)
export const EmploymentForm: FunctionComponent<{
  employment: Employment
  setEmployment: Setter<Employment>
}> = (props) => (
  <Stack gap={2}>
    <PropTextEditor
      label="Worked as"
      placeholder="Job Title"
      propName={'jobTitle'}
      value={props.employment}
      setValue={props.setEmployment}
      inputProps={{ sx: { typography: 'subtitle1' } }}
      variant="filled"
    />
    <Box
      display="flex"
      gap={2}
    >
      <PropTextEditor
        label="at"
        placeholder="Employer"
        propName={'employer'}
        value={props.employment}
        setValue={props.setEmployment}
        variant="filled"
        fullWidth
      />
      <PropTextEditor
        label="in"
        placeholder="Location"
        propName={'location'}
        value={props.employment}
        setValue={props.setEmployment}
        variant="filled"
        fullWidth
      />
    </Box>
    <Box
      display="flex"
      gap={2}
    >
      <PropTextEditor
        label="from"
        placeholder="Start Date"
        propName={'startDate'}
        value={props.employment}
        setValue={props.setEmployment}
        variant="filled"
        fullWidth
      />
      <PropTextEditor
        label="to"
        placeholder="End Date"
        propName={'endDate'}
        value={props.employment}
        setValue={props.setEmployment}
        variant="filled"
        fullWidth
      />
    </Box>
    <Stack>
      <Typography
        variant="caption"
        sx={{ color: 'text.secondary' }}
      >
        Achievements
      </Typography>
      <Stack
        component="ul"
        gap={1}
      >
        {props.employment.achievements.map((achievement, index) => (
          <Box
            component="li"
            key={index}
          >
            <InputBase
              value={achievement}
              placeholder="The value I brought, and how I achieved it."
              onChange={({ target }) =>
                props.setEmployment({
                  ...props.employment,
                  achievements: replaced(
                    props.employment.achievements,
                    (_, i) => i === index,
                    target.value,
                  ),
                })
              }
              multiline
              fullWidth
            />
          </Box>
        ))}
        <AddButton
          onClick={() =>
            props.setEmployment({
              ...props.employment,
              achievements: [...props.employment.achievements, ''],
            })
          }
        >
          Add one more achievement
        </AddButton>
      </Stack>
    </Stack>
  </Stack>
)

const SkillSectionForm: FunctionComponent<{
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
    {props.section.skillCategories.map((skillCategory, index) => (
      <Rearrangeable
        key={skillCategory.uid}
        setParent={props.setSection}
        parent={props.section}
        propName="skillCategories"
        current={skillCategory}
        currentIndex={index}
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

const AddButton: FunctionComponent<{
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
