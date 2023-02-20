import React, { FunctionComponent } from 'react'
import { Resume } from '@/model/resume'
import { Stack } from '@/resume-view/base-components'
import { Header } from '@/resume-view/templates/default/Header'
import { defaultTheme } from '@/resume-view/Theme'
import { createStyles, View } from '@/resume-view/primitives'
import { SectionView } from '@/resume-view/templates/default/SectionView'
import { Font } from '@react-pdf/renderer'

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: `/fonts/Roboto-Light.ttf`,
      fontWeight: 300,
    },
    {
      src: `/fonts/Roboto-Regular.ttf`,
      fontWeight: 400,
    },
    {
      src: `/fonts/Roboto-Medium.ttf`,
      fontWeight: 500,
    },
    {
      src: `/fonts/Roboto-Bold.ttf`,
      fontWeight: 700,
    },
  ],
})
Font.registerHyphenationCallback((w) => [w])

const styles = createStyles({
  page: {
    flexDirection: 'column',
    backgroundColor: defaultTheme.palette.background,
    paddingTop: '7%',
    paddingBottom: '7%',
    paddingLeft: '15%',
    paddingRight: '15%',
    ...defaultTheme.typography.body,
  },
})

export const DefaultTemplate: FunctionComponent<{
  resume: Resume
}> = (props) => (
  <View style={styles.page}>
    <Stack gap={4}>
      <Header resume={props.resume} />
      {props.resume.sections.map((section, index) => (
        <SectionView
          key={index}
          section={section}
        />
      ))}
    </Stack>
  </View>
)
