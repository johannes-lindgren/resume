import { FunctionComponent } from 'react'
import { Employment, EmploymentHistorySection } from '@/model/resume'
import { Setter2, setter22setter } from '@/utils/Setter'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  InputBase,
  Stack,
  Typography,
} from '@mui/material'
import { PropTextEditor2 } from '@/components/dom/ResumeEditor/PropTextEditor'
import { Box } from '@mui/system'
import { replaced } from '@/utils/replaced'
import { AddButton } from '@/components/dom/ResumeEditor/AddButton'
import { Rearrangeable } from '@/components/dom/ResumeEditor/Rearrangable'
import { ExpandMore } from '@mui/icons-material'
import { arraySetter2 } from '@/utils/arraySetter'
import { newEmployment } from '@/model/defaults'
import { uid } from '@/utils/uid'

export const EmploymentHistorySectionForm: FunctionComponent<{
  section: EmploymentHistorySection
  setSection: Setter2<EmploymentHistorySection>
}> = (props) => (
  <Stack gap={4}>
    <PropTextEditor2
      placeholder="Employment History"
      propName={'header'}
      value={props.section}
      setValue={props.setSection}
      inputProps={{ sx: { typography: 'h2' } }}
    />
    {props.section.employments.map((employment) => (
      <Rearrangeable
        key={employment.uid}
        setParent={setter22setter(props.setSection)}
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
              setEmployment={arraySetter2(
                employment.uid,
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
        props.setSection((section) => ({
          ...section,
          employments: [...section.employments, newEmployment()],
        }))
      }
    >
      Add one more employment
    </AddButton>
  </Stack>
)
export const EmploymentForm: FunctionComponent<{
  employment: Employment
  setEmployment: Setter2<Employment>
}> = (props) => (
  <Stack gap={2}>
    <PropTextEditor2
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
      <PropTextEditor2
        label="at"
        placeholder="Employer"
        propName={'employer'}
        value={props.employment}
        setValue={props.setEmployment}
        variant="filled"
        fullWidth
      />
      <PropTextEditor2
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
      <PropTextEditor2
        label="from"
        placeholder="Start Date"
        propName={'startDate'}
        value={props.employment}
        setValue={props.setEmployment}
        variant="filled"
        fullWidth
      />
      <PropTextEditor2
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
              value={achievement.description}
              placeholder="The value I brought, and how I achieved it."
              onChange={({ target }) =>
                props.setEmployment((employment) => ({
                  ...employment,
                  achievements: replaced(
                    employment.achievements,
                    ({ uid }) => achievement.uid === uid,
                    {
                      uid: achievement.uid,
                      description: target.value,
                    },
                  ),
                }))
              }
              multiline
              fullWidth
            />
          </Box>
        ))}
        <AddButton
          onClick={() =>
            props.setEmployment((employment) => ({
              ...employment,
              achievements: [
                ...employment.achievements,
                {
                  uid: uid(),
                  description: '',
                },
              ],
            }))
          }
        >
          Add one more achievement
        </AddButton>
      </Stack>
    </Stack>
  </Stack>
)
