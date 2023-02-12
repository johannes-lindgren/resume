import { createContext, FunctionComponent, ReactNode, useContext } from 'react'
import { defaultTheme, Theme } from '@/resume-view/Theme'

const themeContext = createContext<Theme>(defaultTheme)

export const ThemeProvider: FunctionComponent<{
  children?: ReactNode
  theme: Theme
}> = (props) => {
  return (
    <themeContext.Provider value={props.theme}>
      {props.children}
    </themeContext.Provider>
  )
}

export const useTheme = (): Theme => useContext(themeContext)
