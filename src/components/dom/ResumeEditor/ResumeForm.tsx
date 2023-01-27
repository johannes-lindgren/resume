import { FunctionComponent } from 'react'
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
  InputBase,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { PropTextEditor } from '@/components/dom/ResumeEditor/PropTextEditor'
import { arraySetter } from '@/utils/arraySetter'
import { Setter } from '@/utils/Setter'
import { Box } from '@mui/system'
import { AddOutlined, ExpandMore } from '@mui/icons-material'
import { replaced } from '@/utils/replaced'

export const ResumeForm: FunctionComponent<{
  resume: Resume
  setResume: Setter<Resume>
}> = (props) => (
  <Stack>
    <Stack gap={2}>
      <Stack>
        <PropTextEditor
          // variant="filled"
          // label="Name"
          propName={'name'}
          value={props.resume}
          setValue={props.setResume}
          inputProps={{ sx: { typography: 'h1' } }}
        />
        <PropTextEditor
          // variant="filled"
          // label="Job Title"
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
      propName={'header'}
      value={props.section}
      setValue={props.setSection}
      inputProps={{ sx: { typography: 'h2' } }}
    />
    {props.section.employments.map((employment) => (
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
              {employment.startDate ||
                (employment.endDate &&
                  `${employment.startDate} — ${employment.endDate}`)}
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
    ))}
    <Tooltip title="Add Employment">
      <Button
        startIcon={<AddOutlined />}
        onClick={() =>
          props.setSection({
            ...props.section,
            employments: [
              ...props.section.employments,
              {
                // TODO generate uid
                uid: Math.random().toString(10),
                jobTitle: '',
                employer: '',
                location: '',
                startDate: '',
                endDate: '',
                achievements: [],
              },
            ],
          })
        }
      />
    </Tooltip>
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
        <Tooltip title="Add Achievement">
          <Button
            startIcon={<AddOutlined />}
            onClick={({ target }) =>
              props.setEmployment({
                ...props.employment,
                achievements: [...props.employment.achievements, ''],
              })
            }
          ></Button>
        </Tooltip>
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
    <Tooltip title="Add Skill Category">
      <Button
        startIcon={<AddOutlined />}
        onClick={() =>
          props.setSection({
            ...props.section,
            skillCategories: [
              ...props.section.skillCategories,
              {
                // TODO generate
                header: '',
                uid: Math.random().toString(10),
                skills: [],
              },
            ],
          })
        }
      ></Button>
    </Tooltip>
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
      onClick={(e) => e.preventDefault()}
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
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          placeholder="Type & Press Enter"
          inputProps={{
            ...params.inputProps,
            sx: {
              ml: 1,
            },
          }}
        />
      )}
    />
  </Stack>
)
