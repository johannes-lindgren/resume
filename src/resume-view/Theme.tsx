import { Style } from '@react-pdf/types'
import { Font } from '@react-pdf/renderer'

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
  Math.floor(Math.pow(4, (size + 1) / 2))

const bodySize = 10

const headerWeight = 400
const bodyWeight = 300
const headerFont = 'Times-Roman'
const bodyFont = 'Roboto'
// TODO move to palette
const fontColor = `#1b243f`
const fontColorSecondary = `#8d919f`
const borderColor = `#8d919f`
const linkColor = `#1E90FF`

const fontSize = (scalar = 1) => `${scalar * bodySize}u`

const unit = (u: number) => `${u}u`

export const defaultTheme: Theme = {
  spacing: (s) => unit(exponentialSpacing(s)),
  radius: (s) => unit(exponentialSpacing(s)),
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
      fontSize: fontSize(1.75),
      fontFamily: headerFont,
      fontWeight: headerWeight,
      color: fontColor,
    },
    header2: {
      fontSize: fontSize(1.25),
      fontFamily: headerFont,
      fontWeight: headerWeight,
      color: fontColor,
    },
    header3: {
      fontSize: fontSize(1.0),
      fontFamily: headerFont,
      fontWeight: headerWeight,
      color: fontColor,
    },
    body: {
      fontSize: fontSize(),
      fontFamily: bodyFont,
      fontWeight: bodyWeight,
      color: fontColor,
      textAlign: 'justify',
    },
    details: {
      fontSize: fontSize(),
      fontFamily: bodyFont,
      fontWeight: bodyWeight,
      color: fontColorSecondary,
    },
    caption: {
      fontSize: fontSize(5 / 6),
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
