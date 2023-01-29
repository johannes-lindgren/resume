import React, { FunctionComponent } from 'react'
import { ResumeSection } from '@/model/resume'
import { Style } from '@react-pdf/types'
import { SkillSectionView } from '@/components/pdf/Resume/SkillSectionView'
import { EmploymentHistorySectionView } from '@/components/pdf/Resume/EmploymentHistorySectionView'
import { DetailsSectionView } from '@/components/pdf/Resume/DetailsSectionView'

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
