import { FunctionComponent } from 'react'
import { Resume, ResumeSection } from '@/model/resume'
import { Divider, Stack } from '@mui/material'
import { arraySetter } from '@/utils/arraySetter'
import { Setter } from '@/utils/Setter'
import { Rearrangeable } from '@/components/dom/ResumeEditor/Rearrangable'
import { PersonalDetailsForm } from '@/components/dom/ResumeEditor/PersonalDetailsForm'
import { EmploymentHistorySectionForm } from '@/components/dom/ResumeEditor/EmploymentHistorySectionForm'
import { SkillSectionForm } from '@/components/dom/ResumeEditor/SkillSectionForm'
import { DetailsSectionForm } from '@/components/dom/ResumeEditor/DetailsSectionForm'
import { AddSectionsPanel } from '@/components/dom/ResumeEditor/AddSectionsPanel'

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
