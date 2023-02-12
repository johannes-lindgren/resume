import React, { FunctionComponent, ReactNode } from 'react'
import { View } from '@react-pdf/renderer'
import { defaultTheme } from '@/resume-view/Theme'
import { Style } from '@react-pdf/types'

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
          marginTop:
            index !== 0 ? defaultTheme.spacing(props.gap ?? 0) : undefined,
        }}
      >
        {child}
      </View>
    ))}
  </View>
)
