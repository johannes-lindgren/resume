import React, { FunctionComponent, ReactNode } from 'react'
import { defaultTheme } from '@/resume-view/Theme'
import { View } from '@/resume-view/primitives/View'
import { Style } from '@/resume-view/primitives/Styles'

export const Stack: FunctionComponent<{
  children: ReactNode
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  style?: Style
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
