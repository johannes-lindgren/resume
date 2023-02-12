import React, { FunctionComponent } from 'react'
import { EmploymentHistorySection } from '@/model/resume'
import { Style } from '@react-pdf/types'
import { Stack } from '@/components/pdf/Stack'
import { Text } from '@react-pdf/renderer'
import { defaultTheme } from '@/resume-view/Theme'
import { EmploymentView } from '@/components/pdf/Resume/EmploymentView'

export const EmploymentHistorySectionView: FunctionComponent<{
  section: EmploymentHistorySection
  style?: Style | Style[] | undefined
}> = (props) => (
  <Stack
    style={props.style}
    gap={3}
  >
    <Stack
      wrap={false}
      gap={3}
    >
      <Text style={{ ...defaultTheme.typography.header2 }}>
        {props.section.header}
      </Text>
      {props.section.employments.slice(0, 1).map((employment, index) => (
        <EmploymentView
          key={index}
          emloyment={employment}
        />
      ))}
    </Stack>
    {props.section.employments.slice(1).map((employment, index) => (
      <EmploymentView
        key={index}
        emloyment={employment}
      />
    ))}
  </Stack>
)
