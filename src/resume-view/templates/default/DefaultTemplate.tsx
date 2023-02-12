import React, { FunctionComponent } from 'react'
import { Resume } from '@/model/resume'
import { Stack } from '@/resume-view/base-components/Stack'
import { Header } from '@/resume-view/templates/default/Header'
import { defaultTheme } from '@/resume-view/Theme'
import { createStyles } from '@/resume-view/primitives/Styles'
import { View } from '@/resume-view/primitives/View'
import { useTheme } from '@/resume-view/ResumeThemeProvider'

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
}> = (props) => {
  const theme = useTheme()
  console.log(theme)
  return (
    <View style={styles.page}>
      <Stack gap={4}>
        <Header resume={props.resume} />
      </Stack>
    </View>
  )
}
