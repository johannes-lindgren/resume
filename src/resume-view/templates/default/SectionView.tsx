import React, { FunctionComponent } from 'react'
import { ResumeSection } from '@/model/resume'
import { Style } from '@/resume-view/primitives'
import { SkillSectionView } from '@/resume-view/templates/default/SkillSectionView'
import { EmploymentHistorySectionView } from '@/resume-view/templates/default/EmploymentHistorySectionView'
import { DetailsSectionView } from '@/resume-view/templates/default/DetailsSectionView'

export const SectionView: FunctionComponent<{
  section: ResumeSection
  style?: Style | undefined
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
