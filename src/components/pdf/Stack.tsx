import React, { FunctionComponent, ReactNode } from 'react'
import { Document, StyleSheet, View, Text } from '@react-pdf/renderer'
import { theme } from '@/design/Theme'
import { Style } from '@react-pdf/types'

const styles = StyleSheet.create({
  child: {
    marginTop: '10pt',
  },
})

export const Stack: FunctionComponent<{
  children: ReactNode
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  style?: Style | Style[]
  wrap?: boolean
}> = (props) => (
  <View
    style={props.style}
    wrap={props.wrap}
  >
    {React.Children.map(props.children, (child, index) => (
      <View
        style={{
          marginTop: index !== 0 ? theme.spacing(props.gap ?? 0) : undefined,
        }}
      >
        {child}
      </View>
    ))}
  </View>
)
