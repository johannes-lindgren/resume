import React, { FunctionComponent } from 'react'
import { defaultTheme } from '@/resume-view/Theme'
import { createStyles, Text, View } from '@/resume-view/primitives'

const styles = createStyles({
  view: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    width: '100vw',
  },
  text: {
    position: 'absolute',
    marginLeft: 32,
    bottom: 32,
    color: 'grey',
    ...defaultTheme.typography.caption,
  },
})

export const PageCount: FunctionComponent = () => (
  <View
    style={styles.view}
    fixed
  >
    <Text
      style={styles.text}
      render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
    />
  </View>
)
