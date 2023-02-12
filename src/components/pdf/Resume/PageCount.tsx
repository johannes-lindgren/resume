import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from '@react-pdf/renderer'
import { defaultTheme } from '@/resume-view/Theme'

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    width: '100vw',
  },
  text: {
    position: 'absolute',
    marginLeft: defaultTheme.spacing(4),
    bottom: defaultTheme.spacing(4),
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
