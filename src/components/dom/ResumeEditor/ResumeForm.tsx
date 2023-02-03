import { FunctionComponent, memo, useCallback, useEffect } from 'react'
import { Resume, ResumeSection } from '@/model/resume'
import { Box, Divider, Stack } from '@mui/material'
import { arraySetter2 } from '@/utils/arraySetter'
import { Setter, Setter2, setter22setter } from '@/utils/Setter'
import { Rearrangeable } from '@/components/dom/ResumeEditor/Rearrangable'
import { PersonalDetailsForm } from '@/components/dom/ResumeEditor/PersonalDetailsForm'
import { EmploymentHistorySectionForm } from '@/components/dom/ResumeEditor/EmploymentHistorySectionForm'
import { SkillSectionForm } from '@/components/dom/ResumeEditor/SkillSectionForm'
import { DetailsSectionForm } from '@/components/dom/ResumeEditor/DetailsSectionForm'
import { AddSectionsPanel } from '@/components/dom/ResumeEditor/AddSectionsPanel'

export const ResumeForm: FunctionComponent<{
  resume: Resume
  setResume: Setter2<Resume>
}> = (props) => {
  const setResume = useCallback(setter22setter(props.setResume), [
    props.setResume,
  ])
  return (
    <Stack gap={4}>
      <PersonalDetailsForm
        resume={props.resume}
        setResume={setResume}
      />
      {props.resume.sections.map((section) => (
        <RearrangeableSectionForm
          key={section.uid}
          setResume={props.setResume}
          resume={props.resume}
          section={section}
        />
      ))}
      <Divider />
      <AddSectionsPanel
        resume={props.resume}
        setResume={setResume}
      />
    </Stack>
  )
}
export const RearrangeableSectionForm: FunctionComponent<{
  setResume: Setter2<Resume>
  resume: Resume
  section: ResumeSection
}> = (props) => {
  const { resume, setResume, section } = props
  // useEffect(() => {
  //   console.log('changed resume')
  // }, [resume])
  // useEffect(() => {
  //   console.log('changed setResume')
  // }, [setResume])
  // useEffect(() => {
  //   console.log('changed sections')
  // }, [section])
  const setSection2 = useCallback<Setter2<ResumeSection>>(
    arraySetter2(section.uid, setResume, 'sections'),
    [section.uid, setResume],
  )
  const setResume1 = useCallback<Setter<Resume>>(setter22setter(setResume), [
    setResume,
  ])
  return (
    <Box>
      <Divider />
      <Rearrangeable
        setParent={setResume1}
        parent={resume}
        propName="sections"
        current={section}
      >
        <SectionForm
          section={section}
          setSection={setSection2}
        />
      </Rearrangeable>
    </Box>
  )
}
const SectionForm: FunctionComponent<{
  section: ResumeSection
  setSection: Setter2<ResumeSection>
}> = memo((props) => {
  const { section, setSection } = props
  const setSection1 = useCallback<Setter<ResumeSection>>(
    setter22setter(setSection),
    [setSection],
  )
  switch (section.type) {
    case 'details':
      return (
        <DetailsSectionForm
          section={section}
          setSection={setSection1}
        />
      )
    case 'skills':
      return (
        <SkillSectionForm
          section={section}
          setSection={setSection1}
        />
      )
    case 'employmentHistory':
      return (
        <EmploymentHistorySectionForm
          section={section}
          setSection={setSection1}
        />
      )
  }
})
