import React, { FunctionComponent } from 'react'
import { EmploymentHistorySection } from '@/model/resume'
import { Style, Text } from '@/resume-view/primitives'
import { Stack } from '@/resume-view/base-components'
import { defaultTheme } from '@/resume-view/Theme'
import { EmploymentView } from '@/resume-view/templates/default/EmploymentView/EmploymentView'

export const EmploymentHistorySectionView: FunctionComponent<{
  section: EmploymentHistorySection
  style?: Style | undefined
}> = (props) => (
  <Stack
    style={props.style}
    gap={3}
  >
    <Stack
      wrap={false}
      gap={3}
    >
      <Text style={defaultTheme.typography.header2}>
        {props.section.header}
      </Text>
      {props.section.employments.slice(0, 1).map((employment, index) => (
        <EmploymentView
          key={index}
          employment={employment}
        />
      ))}
    </Stack>
    {props.section.employments.slice(1).map((employment, index) => (
      <EmploymentView
        key={index}
        employment={employment}
      />
    ))}
  </Stack>
)
