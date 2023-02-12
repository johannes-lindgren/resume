import { Style } from '@react-pdf/types'

export type Theme = {
  spacing: (size: 0 | 1 | 2 | 3 | 4 | 5 | 6) => string
  radius: (size: 0 | 1 | 2 | 3) => string
  palette: Palette
  border: string
  typography: {
    header1: FontStyle
    header2: FontStyle
    header3: FontStyle
    body: FontStyle
    details: FontStyle
    caption: FontStyle
    link: Pick<Style, 'color' | 'textDecoration'>
  }
}

export type FontStyle = Pick<
  Style,
  'fontFamily' | 'color' | 'fontSize' | 'fontWeight' | 'textAlign'
>

export type Palette = {
  background: string
  primary: {
    main: string
    contrastText: string
  }
}

const exponentialSpacing = (size: number) =>
  `${Math.floor(Math.pow(4, (size + 1) / 2))}pt`

const bodySize = 12

const headerWeight = 400
const bodyWeight = 300
const headerFont = 'Times-Roman'
const bodyFont = 'Roboto'
// TODO move to palette
const fontColor = `#1b243f`
const fontColorSecondary = `#8d919f`
const borderColor = `#8d919f`
const linkColor = `#1E90FF`

export const defaultTheme: Theme = {
  spacing: exponentialSpacing,
  radius: exponentialSpacing,
  palette: {
    background: '#ffffff',
    primary: {
      main: `#1E90FF`,
      contrastText: `#ffffff`,
    },
  },
  border: `1px solid ${borderColor}`,
  typography: {
    header1: {
      fontSize: `${Math.round(1.75 * bodySize)}pt`,
      fontFamily: headerFont,
      fontWeight: headerWeight,
      color: fontColor,
    },
    header2: {
      fontSize: `${Math.round(1.25 * bodySize)}pt`,
      fontFamily: headerFont,
      fontWeight: headerWeight,
      color: fontColor,
    },
    header3: {
      fontSize: `${Math.round(1.0 * bodySize)}pt`,
      fontFamily: headerFont,
      fontWeight: headerWeight,
      color: fontColor,
    },
    body: {
      fontSize: `${bodySize}pt`,
      fontFamily: bodyFont,
      fontWeight: bodyWeight,
      color: fontColor,
      textAlign: 'justify',
    },
    details: {
      fontSize: `${bodySize}pt`,
      fontFamily: bodyFont,
      fontWeight: bodyWeight,
      color: fontColorSecondary,
    },
    caption: {
      fontSize: `${Math.round((5 / 6) * bodySize)}pt`,
      fontFamily: bodyFont,
      fontWeight: bodyWeight,
      color: fontColor,
    },
    link: {
      color: linkColor,
      textDecoration: 'none',
    },
  },
}
