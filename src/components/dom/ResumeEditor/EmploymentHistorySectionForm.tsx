import { FunctionComponent } from 'react'
import {
  Employment,
  EmploymentHistorySection,
  ResumeSection,
} from '@/model/resume'
import { Setter } from '@/utils/Setter'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  InputBase,
  Stack,
  Typography,
} from '@mui/material'
import { PropTextEditor } from '@/components/dom/ResumeEditor/PropTextEditor'
import { Box } from '@mui/system'
import { replaced } from '@/utils/replaced'
import { AddButton } from '@/components/dom/ResumeEditor/AddButton'
import { Rearrangeable } from '@/components/dom/ResumeEditor/Rearrangable'
import { ExpandMore } from '@mui/icons-material'
import { arraySetter } from '@/utils/arraySetter'
import { newEmployment } from '@/model/defaults'

export const EmploymentHistorySectionForm: FunctionComponent<{
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
    {props.section.employments.map((employment) => (
      <Rearrangeable
        key={employment.uid}
        setParent={props.setSection}
        parent={props.section}
        propName="employments"
        current={employment}
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
