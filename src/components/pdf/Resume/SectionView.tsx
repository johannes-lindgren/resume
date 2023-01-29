import React, { FunctionComponent } from 'react'
import { DetailsSection, ResumeSection } from '@/model/resume'
import { StyleSheet, Text } from '@react-pdf/renderer'
import { theme } from '@/design/Theme'
import { Style } from '@react-pdf/types'
import { Stack } from '@/components/pdf/Stack'
import { SkillSectionView } from '@/components/pdf/Resume/SkillSectionView'
import { EmploymentHistorySectionView } from '@/components/pdf/Resume/EmploymentHistorySectionView'

const styles = StyleSheet.create({
  header: {
    ...theme.typography.header2,
  },
  description: {
    ...theme.typography.body,
  },
})

export const SectionView: FunctionComponent<{
  section: ResumeSection
  style?: Style | Style[] | undefined
}> = (props) => {
  const { section, ...p } = props
  switch (section.type) {
    case 'skills':
      return (
        <SkillSectionView
          section={section}
          {...p}
        />
      )
    case 'details':
      return (
        <DetailsSectionView
          section={section}
          {...p}
        />
      )
    case 'employmentHistory':
      return (
        <EmploymentHistorySectionView
          section={section}
          {...p}
        />
      )
  }
}

export const DetailsSectionView: FunctionComponent<{
  section: DetailsSection
  style?: Style | Style[] | undefined
}> = (props) => (
  <Stack
    style={props.style}
    gap={2}
    wrap={false}
  >
    <Text style={{ ...theme.typography.header2 }}>{props.section.header}</Text>
    <Text>{props.section.description}</Text>
  </Stack>
)
