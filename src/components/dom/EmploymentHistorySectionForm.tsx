import { FunctionComponent, memo, ReactNode, useCallback } from 'react'
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
import { PropTextEditor } from '@/components/dom/PropTextEditor'
import { Box } from '@mui/system'
import { replaced } from '@/utils/replaced'
import { AddButton } from '@/components/dom/AddButton'
import { ExpandMore } from '@mui/icons-material'
import { arraySetter } from '@/utils/arraySetter'
import { newEmployment } from '@/model/defaults'
import { uid } from '@/utils/uid'
import { Rearrangeable } from '@/components/dom/Rearrangable'
import { Flipped, Flipper } from 'react-flip-toolkit'
import { TransitionGroup } from 'react-transition-group'
import { employmentHeaderText } from '@/resume-view/templates/default/EmploymentView/employmentHeaderText'

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
        <Collapse>
          <PropTextEditor
            placeholder="Employment History"
            propName="header"
            value={section}
            setValue={setSection}
            inputProps={{ sx: { typography: 'h2' } }}
          />
        </Collapse>
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
            <Typography>{employmentHeaderText(employment, 'en-US')}</Typography>
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
      required
      placeholder="Job Title"
      propName="jobTitle"
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
        propName="employer"
        value={props.employment}
        setValue={props.setEmployment}
        variant="filled"
        fullWidth
      />
      <PropTextEditor
        label="in"
        placeholder="Location"
        propName="location"
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
        propName="startDate"
        required
        value={props.employment}
        setValue={props.setEmployment}
        variant="filled"
        fullWidth
      />
      <PropTextEditor
        label="to"
        placeholder="End Date"
        propName="endDate"
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
      <Flipper
        flipKey={props.employment.achievements.map((it) => it.uid).join(',')}
      >
        <TransitionAchievmentsStack>
          {props.employment.achievements.map((achievement) => (
            <Collapse key={achievement.uid}>
              <Flipped flipId={achievement.uid}>
                <Rearrangeable
                  setParent={props.setEmployment}
                  parent={props.employment}
                  propName="achievements"
                  current={achievement}
                >
                  <Box component="li">
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
                </Rearrangeable>
              </Flipped>
            </Collapse>
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
        </TransitionAchievmentsStack>
      </Flipper>
    </Stack>
  </Stack>
))

const TransitionAchievmentsStack: FunctionComponent<{
  children?: ReactNode
}> = (props) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <TransitionGroup component={AchievmentsStack}>
    {props.children}
  </TransitionGroup>
)

const AchievmentsStack: FunctionComponent<{
  children?: ReactNode
}> = (props) => (
  <Stack
    component="ul"
    gap={1}
    {...props}
  />
)
