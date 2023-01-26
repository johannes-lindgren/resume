import { Dispatch, FunctionComponent, SetStateAction } from 'react'
import {
  DetailsSection,
  EmploymentHistorySection,
  Resume,
  ResumeSection,
  SkillSection,
} from '@/model/resume'
import { Box, Divider, Stack, Typography } from '@mui/material'
import { PropTextEditor } from '@/components/dom/ResumeEditor/PropTextEditor'
import { replaced } from '@/utils/replaced'

export type Setter<T> = (newValue: T) => void

export const ResumeForm: FunctionComponent<{
  resume: Resume
  setResume: Setter<Resume>
}> = (props) => (
  <Stack
    gap={5}
    padding={4}
  >
    <Stack gap={2}>
      <Typography variant="h2">Personal Details</Typography>
      <PropTextEditor
        label="Name"
        propName={'name'}
        value={props.resume}
        setValue={props.setResume}
      />
      <PropTextEditor
        label="Job Title"
        propName={'jobTitle'}
        value={props.resume}
        setValue={props.setResume}
      />
      <PropTextEditor
        label="Country"
        propName={'location'}
        value={props.resume}
        setValue={props.setResume}
      />
      <PropTextEditor
        label="Nationality"
        propName={'nationality'}
        value={props.resume}
        setValue={props.setResume}
      />
      <PropTextEditor
        label="Email Address"
        propName={'emailAddress'}
        value={props.resume}
        setValue={props.setResume}
      />
      <PropTextEditor
        label="Phone Number"
        propName={'phoneNumber'}
        value={props.resume}
        setValue={props.setResume}
      />
    </Stack>
    <Divider />
    <Stack gap={4}>
      {props.resume.sections.map((section) => (
        <SectionForm
          key={section.uid}
          section={section}
          setSection={(newSection) => {
            console.log(
              replaced(
                props.resume.sections,
                (it) => it.uid === newSection.uid,
                newSection,
              ),
            )
            props.setResume({
              ...props.resume,
              sections: replaced(
                props.resume.sections,
                (it) => it.uid === newSection.uid,
                newSection,
              ),
            })
          }}
        />
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
      label="Header"
      propName={'header'}
      value={props.section}
      setValue={props.setSection}
    />
    <PropTextEditor
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
}> = (props) => <Box>Details</Box>

const SkillSectionForm: FunctionComponent<{
  section: SkillSection
  setSection: Setter<ResumeSection>
}> = (props) => <Box>Details</Box>
