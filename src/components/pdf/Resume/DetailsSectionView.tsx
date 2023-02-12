import React, { FunctionComponent } from 'react'
import { DetailsSection } from '@/model/resume'
import { Style } from '@react-pdf/types'
import { Stack } from '@/components/pdf/Stack'
import { Text } from '@react-pdf/renderer'
import { defaultTheme } from '@/resume-view/Theme'

export const DetailsSectionView: FunctionComponent<{
  section: DetailsSection
  style?: Style | Style[] | undefined
}> = (props) => (
  <Stack
    style={props.style}
    gap={3}
    wrap={false}
  >
    <Text style={{ ...defaultTheme.typography.header2 }}>
      {props.section.header}
    </Text>
    <Text>{props.section.description}</Text>
  </Stack>
)
