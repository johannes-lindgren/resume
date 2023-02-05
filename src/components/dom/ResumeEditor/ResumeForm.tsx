import { FunctionComponent, memo, useCallback } from 'react'
import {
  DetailsSection,
  EmploymentHistorySection,
  Resume,
  ResumeSection,
  SkillSection,
} from '@/model/resume'
import { Box, BoxProps, Collapse, Divider, Stack } from '@mui/material'
import { arraySetter } from '@/utils/arraySetter'
import { Setter } from '@/utils/Setter'
import { PersonalDetailsForm } from '@/components/dom/ResumeEditor/PersonalDetailsForm'
import { EmploymentHistorySectionForm } from '@/components/dom/ResumeEditor/EmploymentHistorySectionForm'
import { SkillSectionForm } from '@/components/dom/ResumeEditor/SkillSectionForm'
import { DetailsSectionForm } from '@/components/dom/ResumeEditor/DetailsSectionForm'
import { AddSectionsPanel } from '@/components/dom/ResumeEditor/AddSectionsPanel'
import * as React from 'react'
import { Flipped, Flipper } from 'react-flip-toolkit'
import { Rearrangeable } from '@/components/dom/ResumeEditor/Rearrangable'
import { TransitionGroup } from 'react-transition-group'

export const ResumeForm: FunctionComponent<{
  resume: Resume
  setResume: Setter<Resume>
}> = (props) => (
  <Flipper flipKey={props.resume.sections.map((it) => it.uid).join(',')}>
    <Stack
      gap={6}
      component={TransitionGroup}
      sx={{ bgColor: 'background.paper' }}
    >
      <Flipped flipId="personalDetails">
        <PersonalDetailsForm
          resume={props.resume}
          setResume={props.setResume}
        />
      </Flipped>
      {props.resume.sections.map((section) => (
        <Collapse key={section.uid}>
          <Flipped flipId={section.uid}>
            <RearrangeableSectionForm
              setResume={props.setResume}
              resume={props.resume}
              section={section}
            />
          </Flipped>
        </Collapse>
      ))}
      <Divider />
      {/*<AddSectionButton*/}
      {/*  setResume={props.setResume}*/}
      {/*  refUid={''}*/}
      {/*  insertAfter*/}
      {/*/>*/}
      {/*</Divider>*/}
      {/*<Flipped*/}
      {/*  key="addPanel"*/}
      {/*  flipId="addPanel"*/}
      {/*>*/}
      <AddSectionsPanel setResume={props.setResume} />
      {/*</Flipped>*/}
    </Stack>
  </Flipper>
)

export const RearrangeableSectionForm: FunctionComponent<
  {
    resume: Resume
    setResume: Setter<Resume>
    section: ResumeSection
    style?: React.CSSProperties
  } & BoxProps
> = (props) => {
  const { resume, setResume, section, ...boxProps } = props
  const setSection = useCallback<Setter<ResumeSection>>(
    arraySetter(section.uid, setResume, 'sections'),
    [section.uid, setResume],
  )
  return (
    <Rearrangeable
      setParent={setResume}
      parent={resume}
      propName="sections"
      current={section}
      {...boxProps}
    >
      <Box mb={2}>
        <Divider />
      </Box>
      <SectionForm
        section={section}
        setSection={setSection}
      />
    </Rearrangeable>
  )
}

const SectionForm: FunctionComponent<{
  section: ResumeSection
  setSection: Setter<ResumeSection>
}> = memo((props) => {
  const { section, setSection } = props
  switch (section.type) {
    case 'details':
      return (
        <DetailsSectionForm
          section={section}
          setSection={setSection as Setter<DetailsSection>}
        />
      )
    case 'skills':
      return (
        <SkillSectionForm
          section={section}
          setSection={setSection as Setter<SkillSection>}
        />
      )
    case 'employmentHistory':
      return (
        <EmploymentHistorySectionForm
          section={section}
          setSection={setSection as Setter<EmploymentHistorySection>}
        />
      )
  }
})
