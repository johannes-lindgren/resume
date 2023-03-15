import React, { FunctionComponent } from 'react'
import { DetailsSection } from '@/model/resume'
import { defaultTheme } from '@/resume-view/Theme'
import { Stack } from '@/resume-view/base-components'
import { Style, Text } from '@/resume-view/primitives'

export const DetailsSectionView: FunctionComponent<{
  section: DetailsSection
  style?: Style | undefined
}> = (props) => {
  const {
    section: { header, description },
  } = props
  return (
    <Stack
      style={props.style}
      gap={3}
      wrap={false}
    >
      {header && (
        <Text style={{ ...defaultTheme.typography.header2 }}>{header}</Text>
      )}
      {description && <Text>{description}</Text>}
    </Stack>
  )
}
