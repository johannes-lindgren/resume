import { FunctionComponent, memo, useCallback } from 'react'
import { Employment, EmploymentHistorySection } from '@/model/resume'
import { Setter } from '@/utils/Setter'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  BoxProps,
  Collapse,
  InputBase,
  Stack,
  Typography,
} from '@mui/material'
import { PropTextEditor } from '@/components/dom/ResumeEditor/PropTextEditor'
import { Box } from '@mui/system'
import { replaced } from '@/utils/replaced'
import { AddButton } from '@/components/dom/ResumeEditor/AddButton'
import { ExpandMore } from '@mui/icons-material'
import { arraySetter } from '@/utils/arraySetter'
import { newEmployment } from '@/model/defaults'
import { uid } from '@/utils/uid'
import { Rearrangeable } from '@/components/dom/ResumeEditor/Rearrangable'
import { Flipped, Flipper } from 'react-flip-toolkit'
import { TransitionGroup } from 'react-transition-group'

export const EmploymentHistorySectionForm: FunctionComponent<{
  section: EmploymentHistorySection
  setSection: Setter<EmploymentHistorySection>
}> = (props) => {
  const { section, setSection } = props
  return (
    <Flipper flipKey={props.section.employments.map((it) => it.uid).join(',')}>
      <Stack
        gap={4}
        component={TransitionGroup}
        sx={{ bgColor: 'background.paper' }}
      >
        <PropTextEditor
          placeholder="Employment History"
          propName={'header'}
          value={section}
          setValue={setSection}
          inputProps={{ sx: { typography: 'h2' } }}
        />
        {props.section.employments.map((employment) => (
          <Collapse key={employment.uid}>
            <Flipped flipId={employment.uid}>
              <RearrangeableEmploymentForm
                key={employment.uid}
                employment={employment}
                section={section}
                setSection={setSection}
              />
            </Flipped>
          </Collapse>
        ))}
        <AddButton
          onClick={() =>
            setSection((section) => ({
              ...section,
              employments: [...section.employments, newEmployment()],
            }))
          }
        >
          Add one more employment
        </AddButton>
      </Stack>
    </Flipper>
  )
}
const RearrangeableEmploymentForm: FunctionComponent<
  {
    section: EmploymentHistorySection
    setSection: Setter<EmploymentHistorySection>
    employment: Employment
  } & BoxProps
> = (props) => {
  const { employment, section, setSection, ...boxProps } = props
  const setEmployment = useCallback<Setter<Employment>>(
    arraySetter(employment.uid, setSection, 'employments'),
    [employment.uid, setSection],
  )
  return (
    <Rearrangeable
      setParent={setSection}
      parent={section}
      propName="employments"
      current={employment}
      {...boxProps}
    >
      <Accordion
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
            setEmployment={setEmployment}
          />
        </AccordionDetails>
      </Accordion>
    </Rearrangeable>
  )
}
export const EmploymentForm: FunctionComponent<{
  employment: Employment
  setEmployment: Setter<Employment>
}> = memo((props) => (
  <Stack
    gap={2}
    sx={{ bgColor: 'background.paper' }}
  >
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
))
